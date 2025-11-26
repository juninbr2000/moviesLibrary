import React from 'react'
import styles from './CollectionCard.module.css'
import { FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const imageUrl = import.meta.env.VITE_IMG

const CollectionCArd = ({collection}) => {

    if(!collection){
      return null
    }

    const styleBackground = {
        backgroundImage: `url(${imageUrl}original/${collection.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        margin: ".2em auto 1em",
        borderRadius: "20px",
    }

  return (

    <div className={styles.collection}>
        <div style={styleBackground}>            

            <h2>{collection.name}</h2>

            <Link to={`/collection/${collection.id}`} className={styles.button}>Veja mais <FaArrowRight /></Link>
                    
            
        </div>
    </div>
  )
}

export default CollectionCArd