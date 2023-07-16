import React from 'react'
import './Preloader.css'

function Preloader(props) {

    return (
        <section className="preloader">
            <button className={`preloader__container ${props.maxMovies === props.moviesLen ? "preloader__hide" : ""}`} onClick={props.morePosts ? props.morePosts : []} type='button'>
                Ещё
            </button>
        </section>
    )
}

export default Preloader
