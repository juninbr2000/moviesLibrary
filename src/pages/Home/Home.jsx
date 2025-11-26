import { useState, useEffect } from 'react'
import styles from "./Home.module.css"
import MovieCard from '../../components/MovieCard'
import NowPlaying from '../../components/NowPlaying'
import { SerieCard } from '../../components/SerieCard'

const moviesURL = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY
const tvShow = import.meta.env.VITE_TV_SHOW

const Home = () => {    
    const [comingSoon, setComingSoon] = useState([])
    const [popular, setPopular] = useState([])
    const [topMovies, setTopMovies] = useState([])
    const [series, setSeries] = useState([])

    const getData = async (url, type) => {
        const res = await fetch(url)
        const data = await res.json()

        switch (type) {
            case "comingSoon":
                setComingSoon(data.results)
                break
            case "popular":
                setPopular(data.results)
                break
            case "top":
                setTopMovies(data.results)
                break
            case "series":
                setSeries(data.results)
                break
            default:
                console.warn("Tipo desconhecido:", type)
        }
    }

    useEffect(() => {
        getData(`${moviesURL}upcoming?include_adult=false&language=pt-br&${apiKey}`, "comingSoon")
        getData(`${moviesURL}popular?include_adult=false&language=pt-br&${apiKey}`, "popular")
        getData(`${moviesURL}top_rated?include_adult=false&language=pt-br&${apiKey}`, "top")
        getData(`${tvShow}popular?include_adult=false&language=pt-br&${apiKey}`, "series")
    }, [])

  return (
    <div className={styles.container}>

        {popular.length > 0 && (
            <section className={styles.sections}>
                <h2>Filmes Populares</h2>
                <div className={styles.movies}>
                    {popular.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        )}

        {topMovies.length > 0 && (
            <section className={styles.sections}>
                <h2>Os mais Avaliados</h2>
                <div className={styles.movies}>
                    {topMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        )}

        {comingSoon.length > 0 && (
            <section className={styles.sections}>
                <h2>Lançamentos</h2>
                <div className={styles.movies}>
                    {comingSoon.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        )}

    </div>
  )
}

export default Home