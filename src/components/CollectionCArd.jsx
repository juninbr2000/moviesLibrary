import React from 'react'
import styles from './CollectionCard.module.css'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const imageUrl = import.meta.env.VITE_IMG

const CollectionCArd = ({collection}) => {

    if(!collection){
      return null
    }

    const styleBackground = {
        background: `url(${imageUrl}${collection.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        margin: ".5em auto 1em",
        borderRadius: "10px",
    }

  return (

    <div className={styles.collection}>
        <div style={styleBackground}>            

            <h2>{collection.name}</h2>

            <Link to={`/collection/${collection.id}`} className={styles.button}>Veja mais <FaArrowAltCircleRight /></Link>
                    
            
        </div>
    </div>
  )
}

export default CollectionCArd