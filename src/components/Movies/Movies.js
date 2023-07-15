import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies(props) {

    return (
        <main className="main">
            <SearchForm handleSubmit={props.handleSubmit}/>
            <MoviesCardList movies={props.moviesToRender} onMovieLike={props.movieLike}
                            movieQuery={props.movieQuery}/>
            <Preloader maxMovies={props.maxMovies} moviesLen={props.moviesToRender.length}
                       morePosts={props.showMoreMovies}/>
        </main>
    )
}

export default Movies;