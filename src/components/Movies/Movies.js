import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
// import movies from "../../utils/movies"
// import {useEffect, useState} from "react";

function Movies(props) {

    return (
        <>
            <main className="main">
                <SearchForm handleSubmit={props.handleSubmit}/>
                <MoviesCardList movies={props.moviesToRender} onMovieLike={props.movieLike} movieQuery={props.movieQuery}/>
                <Preloader maxMovies={props.maxMovies} moviesLen={props.moviesToRender.length}
                           morePosts={props.showMoreMovies}/>
            </main>
        </>
    )
}

export default Movies;