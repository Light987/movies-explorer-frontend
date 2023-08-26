import React from 'react'
import './Preloader.css'

function Preloader(props) {

    return (
        <section className="preloader">
            {props.isSuccess &&
                <span className="preloader__text">Ничего не найдено</span>}
            {!props.isSuccess &&
                <button
                    className={`preloader__container ${(props.movies.length === props.maxMovies) || (props.movies.length <= props.count) ? "preloader__hide" : ""}`}
                    type='button'
                    onClick={props.handleMoreMovies}>
                    <span className="preloader__text">Ещё</span>
                </button>}
        </section>
    )
}

export default Preloader
