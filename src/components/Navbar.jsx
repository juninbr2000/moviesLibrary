import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi"
import styles from "./Navbar.module.css"

const Navbar = () => {

  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!search) return

    navigate(`/search?q=${search}`)
    setSearch("")
  }

  return (
    <nav className={styles.navbar} >
      <h2 className={styles.logo} >
        <Link to="/">LbMovie<BiCameraMovie /></Link>
      </h2>
      <form onSubmit={handleSubmit} className={styles.searchForm} >
        <input 
          type="text" 
          placeholder="Pesquisar filmes" 
          onChange={(e) => setSearch(e.target.value)} 
          value={search}
        />
        <button type="submit" className={styles.btn}>
          <BiSearchAlt2 /> Buscar
        </button>
      </form>
    </nav>
  )
}

export default Navbar