import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import styles from "./Collection.module.css"
import MovieCard from "../components/MovieCard"
import { BsFillFileEarmarkTextFill } from "react-icons/bs"
import { FaArrowCircleLeft } from "react-icons/fa"

import { Link } from "react-router-dom"

const apiKey = import.meta.env.VITE_API_KEY
const imageUrl = import.meta.env.VITE_IMG
const collectionURL = import.meta.env.VITE_COLLECTION

const Collection = () => {
  
    const {id} = useParams()
    const [collection ,setCollection] = useState(null)

    const getCollection = async (url) => {
        const res = await fetch(url)
        const data = await res.json()

        setCollection(data)
    }

    useEffect(() => {
        const collectionUrl = `${collectionURL}${id}?language=pt-br&${apiKey}`

        getCollection(collectionUrl)
    },[id])

    
    return (
    <div className={styles.container}>
        <Link to={"/"} className={styles.back}><FaArrowCircleLeft /> Inicio</Link>

        {collection && (
        <div className={styles.collect}>
            <div className={styles.image}>
                <img src={`${imageUrl}${collection.poster_path}`} alt="" />
            </div>

            <div className={styles.info}>
                <h2>{collection.name}</h2>


                <p><BsFillFileEarmarkTextFill/> Descrição: </p>
                <span><p>{collection.overview}</p></span>

                <h4>Filmes:</h4>
                <div className={styles.movie_container}>
                    {collection.parts.length > 0 && collection.parts.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
                </div>
            </div>
        </div>
        )}
    </div>
  )
}

export default Collection