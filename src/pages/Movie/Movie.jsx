import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { FaRegClock, FaRegStar} from "react-icons/fa"
import { IoTrendingUp } from "react-icons/io5";
import { CiCalendar, CiCircleCheck } from "react-icons/ci"
import { LiaMoneyBillWaveSolid } from "react-icons/lia"
import { VscGraph } from "react-icons/vsc"

import { Link } from "react-router-dom"

import styles from "./Movie.module.css"
import MovieCard from "../../components/MovieCard"
import CollectionCArd from "../../components/CollectionCArd"

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const imageUrl = import.meta.env.VITE_IMG

const Movie = () => {
  
  const {id} = useParams()
  const [movie, setMovie] = useState(null)
  const [hour, setHour] = useState(0)
  const [mins, setMins] = useState(0)
  const [trailers, setTrailers] = useState(null)
  const [loading, setLoading] = useState(false)

  console.log(movie)

  const time = (movie) => {
    if(movie.runtime > 180){
      setHour(3)
      setMins( movie.runtime - 180 )
    } else if(movie.runtime > 120){
      setHour(2)
      setMins(movie.runtime - 120)
    } else if( movie.runtime > 59){
      setHour(1)
      setMins(movie.runtime - 60)
    } else(
      setMins(movie.runtime)
    )
  }

  const getMovie = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    
    setMovie(data)
    time(data)
    setLoading(false)
  }
  
  const [similars, setSimilars] = useState([])
  const getSimilarMovies = async (url) => {
    const res = await fetch(url)
    const dataS = await res.json()

    setSimilars(dataS.results)
  }

  const [recomend, setRecomend] = useState ([])

  const getTrailers = async (url) => {
    const res = await fetch(url)
    const videos = await res.json()

    setTrailers(videos)
  }

  const getRecomendMovies = async (url) => {
    const res = await fetch(url)
    const data2 = await res.json()

    setRecomend(data2.results)
  }
  
  useEffect(()=>{
    setLoading(true)
    const movieUrl = `${moviesURL}${id}?language=pt-br&${apiKey}`

    const moviesTrailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?language=pt-br&${apiKey}`
    getTrailers(moviesTrailerUrl)

    getMovie(movieUrl)

    const similarUrl = `${moviesURL}${id}/similar?language=pt-br&${apiKey}`

    getSimilarMovies(similarUrl)

    const recomendedUrl = `${moviesURL}${id}/recommendations?language=pt-br&${apiKey}`
    
    getRecomendMovies(recomendedUrl)

  },[id])

  if(loading){
    return <p>carregando...</p>
  }

  if(!movie) return null

  return (
    <>
      {movie ? (
        <div className={styles.container} style={{backgroundImage: `linear-gradient(0deg, #0e1e34 0%, #0f0f0f00 35%), url(${imageUrl}/original/${movie.poster_path})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <div className={styles.header}>
            <div className={styles.movieDetails}>
              <img src={`${imageUrl}/original/${movie.poster_path}`} alt="" />
              <div className={styles.info}>
                <h2>{movie.title}</h2>
                <p>{movie.tagline}</p>
                <div className={styles.fastInfos}>

                  <div>
                    <FaRegClock />
                    <span>{hour}h : {mins}m</span>
                  </div>

                  <div>
                    <FaRegStar />
                    <span>{movie.vote_average.toFixed(1)} / 10</span>
                  </div>

                  <div>
                    <IoTrendingUp />
                    <span>{movie.popularity.toFixed(1)}</span>
                  </div>

                </div>
              </div>
            </div>

            <div className={styles.overview}>
              <h3>Sinopse</h3>
              <p>{movie.overview}</p>
            </div>

            
            <img src={`${imageUrl}/original/${movie.backdrop_path}`} className={styles.post} alt="" />
            

            <div className={styles.adictionalInfo}>
              <div className={styles.card}>
                <CiCalendar />
                <p>
                  Lançamento:{" "}
                  </p>
                  <span>
                    {new Date(movie.release_date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    })}
                  </span>
                
              </div>

              <div className={styles.card}>
                <CiCircleCheck />
                <p>status: </p><span>{movie.status}</span>
              </div>

              <div className={styles.card}>
                <LiaMoneyBillWaveSolid />
                <p>Orçamento:</p> <span>{movie.budget > 0 ? 
                  movie.budget.toLocaleString('pt-BR', 
                    {style: 'currency', currency: 'USD'}
                  ): 
                  'Não informado' 
                }</span>
              </div>

              <div className={styles.card}>
                <VscGraph />
                <p>Receita:</p> 
                <span>
                  {movie.revenue > 0 ? 
                    movie.revenue.toLocaleString('pt-BR', 
                      {style: 'currency', currency: 'USD'}
                    ): 
                    'Não informado'
                  }
                </span>
              </div>
            </div>

            {movie.belongs_to_collection && (
              <div className={styles.collection}>
                <h3>Parte da coleção:</h3>
                <CollectionCArd collection={movie.belongs_to_collection} />
              </div>
            )}
            
            {recomend.length > 0 && (
              <div className={styles.similarMovies}>
                <h3>Filmes Recomendados</h3>
                <div className={styles.similarMoviesContainer}>
                  {recomend.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>

        </div>
      )}
    </>
  )
}

export default Movie