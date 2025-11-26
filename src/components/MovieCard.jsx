import { Link } from "react-router-dom"
import styles from "./MovieCard.module.css"

const imageUrl = import.meta.env.VITE_IMG

const MovieCard = ({movie}) => {

  return (
    <Link to={`/movie/${movie.id}`} className={styles.movie}>
        <img src={`${imageUrl}/w500${movie.poster_path}`} alt={movie.title} />
    </Link>
  )
}

export default MovieCard