import { useState, useEffect } from 'react'
import React from 'react'
import styles from "./Home.module.css"
import MovieCard from '../components/MovieCard'
import NowPlaying from '../components/NowPlaying'
import { SerieCard } from '../components/SerieCard'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const tvShow = import.meta.env.VITE_TV_SHOW

const Home = () => {
    const getRandom = Math.floor(Math.random() * 20)

    const [comingSoon, setComingSoon] = useState([])
    const getComingSoon = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        setComingSoon(data.results)
    }

    const [popular, setPopular] = useState([])
    const getPopularMovies = async (url) => {
        const res = await fetch(url)
        const data2 = await res.json()

        setPopular(data2.results)
        console.log(data2.results)
    }

    const [topMovies, setTopMovies] = useState([])
    const getTopRatedMovies = async (url) => {
        const res = await fetch(url)
        const data= await res.json()

        setTopMovies(data.results)
    } 

    const [series, setSeries] = useState([])
    const getSeries = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        setSeries(data.results)
    }

    useEffect(() => {
        const popularUrl = `${moviesURL}popular?include_adult=false&language=pt-br&${apiKey}`

        getPopularMovies(popularUrl)

        const topRatedUrl = `${moviesURL}top_rated?include_adult=false&language=pt-br&${apiKey}`

        getTopRatedMovies(topRatedUrl)

        const comingSoonUrl = `${moviesURL}upcoming?include_adult=false&language=pt-br&${apiKey}`

        getComingSoon(comingSoonUrl)

        const seriesUrl = `${tvShow}top_rated?language=pt-br&${apiKey}`

        getSeries(seriesUrl)

    }, [])

    

  return (
    <div className={styles.container}>

        {popular.length > 0 && <NowPlaying key={popular[getRandom].id} destaque={popular[getRandom]}/>}

        <h2 className={styles.title}>Populares</h2>
        
        <div className={styles.movies_container}>
            {popular.length === 0 && <svg className={styles.loading} viewBox='25 25 50 50'>
               <circle r="20" cy="50" cx="50"></circle>
            </svg>}
            {popular.length > 0 && popular.map((movie) => <MovieCard key={movie.id} movie={movie} />)}

        </div>

        <h2 className={styles.title}>Mais avaliados</h2>

        <div className={styles.movies_container}>
            {topMovies.length === 0 && <svg className={styles.loading} viewBox='25 25 50 50'>
    	          <circle r="20" cy="50" cx="50"></circle>
                </svg>}
            {topMovies.length > 0 && topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>

        <h2 className={styles.title}>Lançamentos</h2>

        <div className={styles.movies_container}>
            {comingSoon.length === 0 && <svg className={styles.loading} viewBox='25 25 50 50'>
                <circle r="20" cy="50" cx="50"></circle>
            </svg>}
            {comingSoon.length > 0 && comingSoon.map((movie) => <MovieCard key={movie.id} movie={movie} />)}

        </div>

        <h2 className={styles.title}>Principais series</h2>

        <div className={styles.movies_container}>
            {series.length === 0 && <svg className={styles.loading} viewBox='25 25 50 50'>
                <circle r="20" cy="50" cx="50"></circle>
                </svg>}
            {series.length > 0 && series.map((serie) => <SerieCard key={serie.id} serie={serie} />)}
        </div>


        
    </div>
  )
}

export default Home