import React from 'react'
import './Preloader.css'

function Preloader(props) {
    return (
        <section className={`preloader ${props.maxMovies === props.moviesLen ? "preloader__hide" : ""}`}>
            <button className="preloader__container" onClick={props.morePosts} type='button'>
                Ещё
            </button>
        </section>
    )
}

export default Preloader
