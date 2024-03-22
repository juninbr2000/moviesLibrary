import { Link } from "react-router-dom"
import styles from "./MovieCard.module.css"

const imageUrl = import.meta.env.VITE_IMG

const MovieCard = ({movie}) => {

  return (
    <div className={styles.movie}>
      <Link to={`/movie/${movie.id}`}>
      {movie.poster_path === null ? (<div className={styles.image}>
        
        <p>{movie.title}</p>        
        </div> ) : (
        <img src={imageUrl +'w500/'+ movie.poster_path} alt={movie.title} />
        )}
      </Link>
    </div>
  )
}

export default MovieCard