import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import MovieCard from "../components/MovieCard"

const searchUrl = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY
const collectionSearch = import.meta.env.VITE_COLLECTION_SEARCH
const seriesUrl = import.meta.env.VITE_TV_SHOW_SEARCH

import styles from "./Search.module.css"
import CollectionCArd from "../components/CollectionCArd"
import { SerieCard } from "../components/SerieCard"

const Search = () => {

  const [searchedParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [collection, setCollection] = useState([])
  const query = searchedParams.get("q")

  const getSearchedMovies = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    setMovies(data.results)
  }
  
  const getCollection = async (url) => {
    const res = await fetch(url)
    const data3 = await res.json()

    setCollection(data3.results)
  }

  const getSeries = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    setSeries(data.results)
  }

  useEffect(()=>{
    const searchedWithQueryUrl = `${searchUrl}?include_adult=false&language=pt-br&${apiKey}&query=${query}`

    getSearchedMovies(searchedWithQueryUrl)

    const collectionUrl = `${collectionSearch}?query=${query}&include_adult=false&language=pt-br&${apiKey}`

    getCollection(collectionUrl)

    const tvUrl = `${seriesUrl}?query=${query}&language=pt-br&${apiKey}`

    getSeries(tvUrl)
  },[query])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Resultados para: {query}</h2>
      <div className={styles.collection_container}>
      {collection.length > 0 && collection.map((collect) =>
          <CollectionCArd key={collect.id} collection={collect} />
        )}
      </div>
      <h4 className={styles.title}>filmes</h4>
      <div className={styles.movie_container}>
      {movies.length === 0 && <svg className={styles.loading} viewBox='25 25 50 50'>
               <circle r="20" cy="50" cx="50"></circle>
          </svg>}
        {movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
      <h4 className={styles.title}>Series</h4>
      <div className={styles.movie_container}>
      {series.length === 0 && <svg className={styles.loading} viewBox='25 25 50 50'>
               <circle r="20" cy="50" cx="50"></circle>
          </svg>}
        {series.length > 0 && series.map((serie) => <SerieCard key={serie.id} serie={serie} />)}
      </div>
    </div>
  )
}

export default Search