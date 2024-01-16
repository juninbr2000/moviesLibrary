import { Link } from "react-router-dom"

const imageUrl = import.meta.env.VITE_IMG

const NowPlaying = ({destaque}) => {

    const stylescard = {
        background: `url(${imageUrl}${destaque.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    }

  return (
    <div style={stylescard} className="destaquecard">
        <h3>{destaque.title}</h3>

        <p>{destaque.overview}</p>

        <Link to={`/movie/${destaque.id}`}>Ver Mais</Link>
    </div>
  )
}

export default NowPlaying