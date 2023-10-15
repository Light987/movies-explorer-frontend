import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
    const savedMovieSearchValue = {
        'search': null
    }


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
            <MoviesCardList movies={props.savedMovies}
                            isSavedMovies={props.isSavedMovies}
                            handleSaveMovie={props.handleSaveMovie}
                            handleDeleteMovie={props.handleDeleteMovie}/>
            <Preloader movies={props.savedMovies} isError={props.isError}
                       isSuccess={props.isSuccess}
                       handleMoreMovies={props.handleMoreMovies}
                       maxMovies={props.maxSavedMovies}
                       loading={props.loading}/>
        </main>
    )
}

export default SavedMovies;