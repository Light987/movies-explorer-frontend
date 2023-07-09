import React from 'react'
import './Preloader.css'

function Preloader(props) {
    return (
        <div className={`preloader ${props.maxMovies === props.moviesLen ? "preloader__hide" : ""}`}>
            <button className="preloader__container" onClick={props.morePosts}>
                Ещё
            </button>
        </div>
    )
}

export default Preloader
