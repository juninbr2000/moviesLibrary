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
    const [serie, setSerie] = useState({})
    const [loading, setLoading] = useState(false)
    const [temporada, setTemporadas] = useState({})
    
    const getSeries = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        setSerie(data)
        console.log(data)
        
        setLoading(false)
        setTemporadas(data.seasons)
        console.log(temporada)
    }

    useEffect(() => {
        setLoading(true)
        const serieURL = `${serieUrl}${id}?language=pt-br&${apiKey}`

        getSeries(serieURL)
    }, [id])

    if(loading){
        return <div>
            <p>carregando...</p>
        </div>
    }

    const styletop = {
        backgroundImage: `url(${imgUrl}original/${serie.backdrop_path})`,
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
                    <img src={`${imgUrl}w500/${serie.poster_path}`} alt='' />
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
                    {serie.first_air_date !== "" ? (<p>Estreiou {serie.first_air_date}</p>) : (serie.in_production === true && <p>status: em produção</p>)}
                </div>
            </div>

            {serie.overview != '' && <div className={styles.description}>
                <h3><BsFillFileEarmarkTextFill/> Descrição</h3>

                <p>{serie.overview}</p>
            </div>}
            
            {temporada.length > 0 && temporada.map((temp) => {
                return(
                <div key={temp.id} className={styles.season_card}>
                    <img src={imgUrl+ 'w500/' + temp.poster_path} alt="" />
                    <div className={styles.season_info}>
                        <h3>{temp.name}</h3>
                        <p>{temp.overview}</p>
                        <p><span>numero de eps:</span> {temp.episode_count}</p>
                    </div>
                </div>
            )})}

            {serie.homepage != "" && <div>
                <Link to={serie.homepage} className={styles.btn2} target='_blank'><div>
                    <h4>Site Oficial</h4>
                    {serie.networks && serie.networks.map((ser) => <div key={ser.id}>
                        <p>{ser.name}</p>
                        <img src={imgUrl + 'w500/' + ser.logo_path} alt="" />
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
                        <img src={imgUrl + 'w500/' + company.logo_path} alt="" />
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