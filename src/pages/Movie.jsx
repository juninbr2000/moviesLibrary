import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {BsGraphUp, BsHourglassSplit, BsWallet2, BsFillFileEarmarkTextFill, BsCalendar2, BsCollection} from "react-icons/bs"
import {FaStar ,FaArrowCircleLeft} from "react-icons/fa"

import { Link } from "react-router-dom"

import styles from "./Movie.module.css"
import MovieCard from "../components/MovieCard"
import CollectionCArd from "../components/CollectionCArd"

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const imageUrl = import.meta.env.VITE_IMG

const Movie = () => {
  
  const {id} = useParams()
  const [movie, setMovie] = useState(null)

  const getMovie = async (url) => {
    const res = await fetch(url)
    const data = await res.json()
    
    setMovie(data)
    console.log(data)
  }
  
  const [similars, setSimilars] = useState([])
  const getSimilarMovies = async (url) => {
    const res = await fetch(url)
    const dataS = await res.json()

    setSimilars(dataS.results)
  }

  const [recomend, setRecomend] = useState ([])
  const getRecomendMovies = async (url) => {
    const res = await fetch(url)
    const data2 = await res.json()

    setRecomend(data2.results)
    console.log(data2.results)
  }
  
  useEffect(()=>{
    const movieUrl = `${moviesURL}${id}?language=pt-br&${apiKey}`

    getMovie(movieUrl)

    const similarUrl = `${moviesURL}${id}/similar?language=pt-br&${apiKey}`

    getSimilarMovies(similarUrl)

    const recomendedUrl = `${moviesURL}${id}/recommendations?language=ptbr&${apiKey}`
    
    getRecomendMovies(recomendedUrl)
  },[id])

  if(!movie) return null

  const styleBackground = {
    background: `url(${imageUrl}${movie.backdrop_path})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }

  return (
    <div>
    {movie && (
        <div style={styleBackground}>
          <div className={styles.cardmovie}>
            <Link to={"/"} className={styles.btn}><FaArrowCircleLeft/> Inicio</Link>
          </div>    
        </div>
      )}
      {movie && (
        <div className={styles.container}>
          <div className={styles.movie}>
            <div className={styles.image}>
              <img src={imageUrl+movie.poster_path} alt={movie.title} />
            </div>
            <div className={styles.title}>
              <h2>{movie.title}</h2>
              <h5>{movie.tagline}</h5>
            </div>
          </div>
          
          <div className={styles.fast_info}>
            <div>
              <BsCalendar2/>
              <p>{movie.release_date.substring(0, 4)}</p>
            </div>
            <div>
              <BsHourglassSplit />
              <p>{movie.runtime}min</p>
            </div>
            <div>
              <FaStar />
              <p>{parseInt(movie.vote_average)}</p>
            </div>
          </div>

          <div className={styles.info}>
            <div>
              <h5><BsFillFileEarmarkTextFill /> Descrição</h5>
              <p>{movie.overview}</p>
            </div>

            <div className={styles.costs}>
              <div>
                <h5><BsWallet2/> Custo</h5>
                <p>USD {new Intl.NumberFormat().format(movie.budget)}</p>
              </div>
              <div>
                <h5><BsGraphUp/> Ganho</h5>
                <p>USD {new Intl.NumberFormat().format(movie.revenue)}</p>
              </div>
            </div>
            
            <div className={styles.company_container}>
            {movie.production_companies && movie.production_companies.map((company) => <div key={company.id} className={styles.company}>
              <img src={imageUrl + company.logo_path} alt={company.name} />
              <p>{company.name}</p>
            </div>)}
            </div>

            {movie.belongs_to_collection != null && (
              <div className={styles.collection}>
                <h5><BsCollection/> {movie.belongs_to_collection.name}</h5>
                <CollectionCArd key={movie.belongs_to_collection.id} collection={movie.belongs_to_collection}/>
              </div>
            )}
          </div>
        </div>
      )}

      {recomend.length > 0 && <h3 className={styles.title2}>Recomendados</h3>}
      <div className={styles.movie_container}>
        {recomend.length > 0 && recomend.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
      </div>
      <h3 className={styles.title2}>Talvez você goste</h3>
      <div className={styles.movie_container}>
        {similars.length > 0 && similars.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
      </div>
    </div>
  )
}

export default Movie