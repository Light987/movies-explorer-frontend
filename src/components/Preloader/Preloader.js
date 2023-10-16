import React from 'react'
import './Preloader.css'

function Preloader(props) {

    return (
        <section className="preloader">
            {((props.isSuccess)) &&
                <span className="preloader__text">Ничего не найдено</span>}
            {!props.isSuccess &&
                <button
                    className={`preloader__container ${(props.movies.length === props.maxMovies) ? "preloader__hide" : ""}`}
                    type='button'
                    onClick={props.handleMoreMovies}>
                    <span className="preloader__text">Ещё</span>
                </button>}
            {((props.loading && !props.isSuccess) && (props.movies.length !== 0)) &&
                <span className="preloader__text">Загрузка...</span>}
        </section>
    )
}

export default Preloader
