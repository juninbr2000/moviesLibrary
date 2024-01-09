import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import {BiCameraMovie, BiSearchAlt2} from "react-icons/bi"
import styles from "./Navbar.module.css"

const Navbar = () => {

  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(!search) return

    navigate(`/search?q=${search}`)
    setSearch("")
  }

  return (
    <div>
      <nav className={styles.navbar} >
        <h2>
          <Link to="/">LbMovie<BiCameraMovie/></Link>
        </h2>
        <form onSubmit={handleSubmit}>
            <div className={styles.search}>
                <input type="text" placeholder='Busque por um filme' onChange={(e) => setSearch(e.target.value)} value={search}/>

                <button type='submit'><BiSearchAlt2/></button>
            </div>
        </form>
      </nav>
    </div>
  )
}

export default Navbar