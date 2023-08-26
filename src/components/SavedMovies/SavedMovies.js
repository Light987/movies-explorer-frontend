import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {

    const savedMoviesSlice = props.savedMovies.slice(0, props.count);

    return (
        <main className="main">
            <SearchForm handleSearchMovie={props.handleSearchMovie} handleShortMovie={props.handleShortMovie}
                        isErrorInput={props.isErrorInput} isSuccessInput={props.isSuccessInput}/>
            <MoviesCardList movies={savedMoviesSlice} isSavedMovies={props.isSavedMovies}
                            handleSaveMovie={props.handleSaveMovie} handleDeleteMovie={props.handleDeleteMovie}/>
            <Preloader movies={savedMoviesSlice} isError={props.isError} isSuccess={props.isSuccess}
                       handleMoreMovies={props.handleMoreMovies} maxMovies={props.maxSavedMovies}/>
        </main>
    )
}

export default SavedMovies;