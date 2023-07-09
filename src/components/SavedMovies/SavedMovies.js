import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import movies from "../../utils/movies";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies(props) {
    function savedMovies(movies) {
        return movies.filter((savedMovie) => savedMovie.isLiked)
    }

    return (
        <>
            <main className="main">
                <SearchForm handleSubmit={props.handleSubmit}/>
                <MoviesCardList movies={savedMovies(movies)} onMovieLike={props.movieLike} movieQuery={props.movieQuery}/>
            </main>
        </>
    )
}

export default SavedMovies;