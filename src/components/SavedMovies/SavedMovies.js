import MoviesCardList from "../MoviesCardList/MoviesCardList";
import movies from "../../utils/movies";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";

function SavedMovies(props) {
    function savedMovies(movies) {
        return movies.filter((savedMovie) => savedMovie.isLiked)
    }

    return (
        <main className="main">
            <Header onBurgerMenu={props.onBurgerMenu} width={props.width}/>
            <SearchForm handleSubmit={props.handleSubmit}/>
            <MoviesCardList movies={savedMovies(movies)} onMovieLike={props.movieLike}
                            movieQuery={props.movieQuery}/>
        </main>
    )
}

export default SavedMovies;