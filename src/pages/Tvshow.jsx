import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import styles from './TvShow.module.css'

import { BiCollection, BiCalendar } from 'react-icons/bi'
import { BsFillFileEarmarkTextFill } from "react-icons/bs"


const serieUrl = import.meta.env.VITE_TV_SHOW
const apiKey = import.meta.env.VITE_API_KEY
const imgUrl = import.meta.env.VITE_IMG

const Tvshow = () => {

    const { id } = useParams()
    const [serie, setSerie] = useState([])
    const getSeries = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        setSerie(data)
    }

    useEffect(() => {
        const serieURL = `${serieUrl}${id}?language=pt-br&${apiKey}`

        getSeries(serieURL)
    }, [id])

    if(!serie){
        return null
    }

    const styletop = {
        backgroundImage: `url(${imgUrl}${serie.backdrop_path})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    }

  return (
    <div>
        {serie.success != false && <div style={styletop} className={styles.container}>
            <div className={styles.card_serie}>
                <Link to={"/"} className={styles.btn}>Inicio</Link>
            </div>
        </div>}
        {serie.success != false && <div className={styles.serie_container}>
            <div className={styles.info}>
                <div className={styles.image}>
                    <img src={`${imgUrl}${serie.poster_path}`} alt='' />
                </div>
                <div className={styles.names}>
                    <h2>{serie.name}</h2>
                    <h5>{serie.tagline}</h5>
                </div>
            </div>

            <div className={styles.fast_info}>
                <div>
                    <BiCollection />
                    <p>{serie.number_of_seasons} Temporadas</p>
                </div>
                <div>
                    <BiCalendar/>
                    <p>Estreiou {serie.first_air_date}</p>
                </div>
            </div>

            {serie.overview != '' && <div className={styles.description}>
                <h3><BsFillFileEarmarkTextFill/> Descrição</h3>

                <p>{serie.overview}</p>
            </div>}

            {serie.homepage != "" && <div>
                <Link to={serie.homepage} className={styles.btn2} target='_blank'><div>
                    <h4>Site Oficial</h4>
                    {serie.networks && serie.networks.map((ser) => <div key={ser.id}>
                        <p>{ser.name}</p>
                        <img src={imgUrl + ser.logo_path} alt="" />
                    </div>)}   
                </div></Link>    
            </div>}

            <div className={styles.aditional_info}>
                <div className={styles.fast}>
                    <div>
                    	<p>temporadas:</p>
                        <span>{serie.number_of_seasons}</span>
                    </div>
                    <div>
                        <p>episodios:</p>
                        <span>{serie.number_of_episodes}</span>
                    </div>
                </div>
                
                <p>Produzido por:</p>
                <div className={styles.comp_container}>
                {serie.production_companies && serie.production_companies.map((company) => 
                    <div key={company.id} className={styles.company}>
                        <img src={imgUrl + company.logo_path} alt="" />
                        <p>{company.name}</p>
                    </div>
                )}
                </div>
            </div>

        </div>}
        {serie.success === false && <div className='error'>
            <h2>404 - Pagina não encontrada</h2>  
            <p>a pagina que você procura não existe ou pode ter sido removida</p>

            <Link to={"/"}>Inicio</Link>  
        </div>}
    </div>
  )
}

export default Tvshow