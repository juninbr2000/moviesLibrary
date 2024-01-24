import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='error'>
        <h2>404 - Pagina não encontrada</h2>
        <p>a pagina que você procura não existe ou pode ter sido removida</p>

        <Link to={"/"}>Inicio</Link>
    </div>
  )
}

export default ErrorPage