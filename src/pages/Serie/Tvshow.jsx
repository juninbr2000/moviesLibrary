import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import styles from './TvShow.module.css'

import { BiCollection, BiMovie } from 'react-icons/bi'
import { FaRegStar } from 'react-icons/fa'
import { CiCalendar, CiCircleCheck } from 'react-icons/ci'
import { BsCollection } from 'react-icons/bs'


const serieUrl = import.meta.env.VITE_TV_SHOW
const apiKey = import.meta.env.VITE_API_KEY
const imageUrl = import.meta.env.VITE_IMG

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
        
        setTemporadas(data.seasons)
        console.log(temporada)
        setLoading(false)
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


  return (
    <>
        {serie ? (
            <div className={styles.container} style={{backgroundImage: `linear-gradient(0deg, #0e1e34 0%, #0f0f0f00 35%), url(${imageUrl}/original/${serie.poster_path})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className={styles.header}>
                    <div className={styles.movieDetails}>
                        <img src={`${imageUrl}/original/${serie.poster_path}`} alt="" />
                        <div className={styles.info}>
                            <h2>{serie.name}</h2>
                            <p>{serie.tagline}</p>

                            <div className={styles.fastInfo}>
                                {serie.vote_average && <p><FaRegStar/> {serie.vote_average.toFixed(1)}/ 10</p>}
                                <p><BiCollection /> {serie.number_of_seasons} Temporadas</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.overview}>
                        <h3>Sinopse:</h3>
                        <p>{serie.overview}</p>
                    </div>

                    {serie.last_episode_to_air && <div className={styles.lastEp}>
                        <h3>EP mais recente</h3>
                        <div style={{backgroundImage: `linear-gradient(90deg,  #0e1e34 20%, #0f0f0f00 50%), url(${imageUrl}/original/${serie.last_episode_to_air.still_path})`}} className={styles.lastEPContainer}>
                            <h4>{serie.last_episode_to_air.name}</h4>
                            <div>
                                <p><strong>Temporada:</strong> {serie.last_episode_to_air.season_number}</p>
                                <p><strong>Episódio:</strong> {serie.last_episode_to_air.episode_number}</p>
                            </div>
                            <p className={styles.view}>{serie.last_episode_to_air.overview}</p>
                            <p> disponivel em: {" "}
                                {new Date(serie.last_episode_to_air.air_date).toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                })}
                            </p>
                        </div>
                    </div>}

                    <div className={styles.adictionalInfo}>
                        <div className={styles.card}>
                            <CiCalendar />
                            <p>
                                Lançamento:{" "}
                            </p>
                            <span>
                                {new Date(serie.first_air_date).toLocaleDateString("pt-BR", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                })}
                            </span>
                                    
                        </div>
                    
                        <div className={styles.card}>
                            <CiCircleCheck />
                            <p>status: </p><span>{serie.status}</span>
                        </div>

                        <div className={styles.card}>
                            <BsCollection />
                            <p>Temporadas</p>
                            <span>{serie.number_of_seasons}</span>
                        </div>
                        <div className={styles.card}>
                            <BiMovie />
                            <p>Episodios</p>
                            <span>{serie.number_of_episodes}</span>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div>

            </div>
        )}
    </>
  )
}

export default Tvshow