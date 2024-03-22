import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./MovieCard.module.css"

const imageUrl = import.meta.env.VITE_IMG

export const SerieCard = ({serie}) => {
  return (
    <div className={styles.movie}>
        <Link to={`/serie/${serie.id}`}>
            {serie.poster_path === null ? (<div className={styles.image}>
    
                <p>{serie.title}</p>        
            </div> ) : (
            <img src={imageUrl + 'w500/' + serie.poster_path} alt={serie.title} />
            )}
        </Link>
    </div>
  )
}
