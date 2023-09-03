import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies(props) {
    const movieSearchValue = JSON.parse(localStorage.getItem("movieSearchValue"))

    const moviesSlice = props.movies.slice(0, props.count);

    return (
        <main className="main">
            <SearchForm handleSearchMovie={props.handleSearchMovie}
                        isShortMovies={props.isShortMovies}
                        handleShortMovie={props.handleShortMovie}
                        setIsShortMovies={props.setIsShortMovies}
                        handleChangeChk={props.handleChangeChk}
                        isErrorInput={props.isErrorInput}
                        isSuccessInput={props.isSuccessInput}
                        setLoading={props.setLoading}
                        movieSearchValue={movieSearchValue}/>
            <MoviesCardList movies={moviesSlice}
                            handleSaveMovie={props.handleSaveMovie} handleDeleteMovie={props.handleDeleteMovie}
                            checkIsSaved={props.checkIsSaved}/>
            <Preloader movies={moviesSlice} isError={props.isError} isSuccess={props.isSuccess} loading={props.loading}
                       handleMoreMovies={props.handleMoreMovies} maxMovies={props.maxMovies}/>
        </main>
    )
}

export default Movies;