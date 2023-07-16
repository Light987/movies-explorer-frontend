import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movies from "../../utils/movies";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
    function savedMovies(movies) {
        if (movies) {
            return movies.filter((savedMovie) => savedMovie.isLiked);
        } else {
            return [];
        }
    }

    console.log(savedMovies(movies) ? savedMovies(movies).length : 0)
    console.log(savedMovies(props.moviesToRender) ? savedMovies(props.moviesToRender).length : 0)

    return (
        <main className="main">
            <SearchForm handleSubmit={props.handleSubmit}/>
            <MoviesCardList movies={savedMovies(props.moviesToRender)} onMovieLike={props.movieLike}
                            movieQuery={props.movieQuery}/>
            <Preloader maxMovies={savedMovies(movies) ? savedMovies(movies).length : 0}
                       moviesLen={savedMovies(props.moviesToRender) ? savedMovies(props.moviesToRender).length : 0}
                       morePosts={savedMovies(props.showMoreMovies)}/>
        </main>
    )
}

export default SavedMovies;