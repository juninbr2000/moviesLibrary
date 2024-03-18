import { Link } from "react-router-dom"

const imageUrl = import.meta.env.VITE_IMG

const NowPlaying = ({destaque}) => {

    const stylescard = {
        background: `url(${imageUrl}${destaque.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }

  return (
    <div style={stylescard} className="destaquecard">
        <div className="infomovie">
          <h3>{destaque.title}</h3>

          <p>{destaque.overview}</p>
          <Link to={`/movie/${destaque.id}`}>Ver Mais</Link>
        </div>
        <div className="imagemovie">
          <img src={imageUrl + destaque.poster_path} alt={destaque.title} />
        </div>
    </div>
  )
}

export default NowPlaying