import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
    const savedMovieSearchValue = JSON.parse(localStorage.getItem("savedMovieSearchValue"))

    const savedMoviesSlice = props.savedMovies.slice(0, props.count);

    return (
        <main className="main">
            <SearchForm handleSearchMovie={props.handleSearchSavedMovie}
                        isShortMovies={props.isShortMovies}
                        setIsShortMovies={props.setIsShortMovies}
                        handleShortMovie={props.handleShortSavedMovie}
                        handleChangeChk={props.handleChangeChk}
                        isErrorInput={props.isErrorInput}
                        isSuccessInput={props.isSuccessInput}
                        setLoading={props.setLoading}
                        movieSearchValue={savedMovieSearchValue}/>
            <MoviesCardList movies={savedMoviesSlice} isSavedMovies={props.isSavedMovies}
                            handleSaveMovie={props.handleSaveMovie} handleDeleteMovie={props.handleDeleteMovie}/>
            <Preloader movies={savedMoviesSlice} isError={props.isError} isSuccess={props.isSuccess}
                       handleMoreMovies={props.handleMoreMovies} maxMovies={props.maxSavedMovies}
                       loading={props.loading}/>
        </main>
    )
}

export default SavedMovies;