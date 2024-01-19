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
  const [activeCategory, setActiveCategory] = useState("movies")
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
    console.log(data3.results)
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

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Resultados para: {query}</h2>
      {collection.length > 0 && <div>
        <h3>Coleções</h3>
        <div className={styles.collection_container}>
          {collection && collection.map((collect) => <CollectionCArd key={collect.id} collection={collect} />)}
        </div>
      </div>}
      <div className={styles.categoryButtons}>
        <button
          onClick={() => handleCategoryChange("movies")}
          className={activeCategory === "movies" ? styles.active : ""}
        >
          Filmes
        </button>
        <button
          onClick={() => handleCategoryChange("series")}
          className={activeCategory === "series" ? styles.active : ""}
        >
          Séries
        </button>
      </div>
      {movies.length === 0 && activeCategory === "movies" && (
        <div className={styles.error}>
          <h4>Nenhuma filme encontrado</h4>
          <p>Tente clicar no botão series ou verifique se sua pesquisa esta correta...</p>
        </div>
      )}
      {movies.length > 0 && activeCategory === "movies" && (
        <div>
          <h4>Filmes</h4>
          <div className={styles.resultsContainer}>
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
      {series.length === 0 && activeCategory === "series" && (
        <div className={styles.error}>
          <h4>Nenhuma serie encontrada</h4>
          <p>Tente clicar no botão filmes ou verifique se sua pesquisa esta correta...</p>
        </div>
      )}
      {series.length > 0 && activeCategory === "series" && (
        <div>
          <h4>Series</h4>
          <div className={styles.resultsContainer}>
            {series.map((serie) => (
            <SerieCard key={serie.id} serie={serie} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Search