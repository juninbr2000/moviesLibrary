import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import styles from "./Collection.module.css"
import MovieCard from "../../components/MovieCard"
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

        console.log(data)
        setCollection(data)
    }

    useEffect(() => {
        const collectionUrl = `${collectionURL}${id}?language=pt-br&${apiKey}`

        getCollection(collectionUrl)
    },[id])

    
    return (
        <>
            {collection ? (
                <div className={styles.container} style={{backgroundImage: `linear-gradient(0deg, #0e1e34 0%, #0f0f0f00 35%), url(${imageUrl}/original${collection.poster_path})`}}>
                    <div className={styles.content}>
                        <img src={`${imageUrl}/original${collection.poster_path}`} alt="" />
                        <div>
                            <h1>{collection.name}</h1>

                            <div className={styles.overview}>
                                <h3>Sinopse</h3>
                                <p>{collection.overview}</p>
                            </div>
                                
                            {collection.parts.length > 0 && (
                                <div className={styles.similarMovies}>
                                    <h3>Filmes na Coleção</h3>
                                    <div className={styles.similarMoviesContainer}>
                                        {collection.parts.map((movie) => (
                                            <MovieCard key={movie.id} movie={movie} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
                
        </>
    )
}

export default Collection