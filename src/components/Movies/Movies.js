import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies(props) {

    const moviesSlice = props.movies.slice(0, props.count);

    return (
        <main className="main">
            <SearchForm handleSearchMovie={props.handleSearchMovie} handleShortMovie={props.handleShortMovie}
                        isErrorInput={props.isErrorInput} isSuccessInput={props.isSuccessInput}/>
            <MoviesCardList movies={moviesSlice}
                            handleSaveMovie={props.handleSaveMovie} handleDeleteMovie={props.handleDeleteMovie}
                            checkIsSaved={props.checkIsSaved}/>
            <Preloader movies={moviesSlice} isError={props.isError} isSuccess={props.isSuccess}
                       handleMoreMovies={props.handleMoreMovies} maxMovies={props.maxMovies}/>
        </main>
    )
}

export default Movies;