import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList(props) {

    return (
        <section className="background-movies-card-list">
            <ul className="movies-card-list">
                {props.movies.map((movie) => (
                    <li className="movies-card" key={!props.isSavedMovies ? movie.id : movie.movieId}>
                        <MoviesCard
                            movie={movie}
                            checkIsSaved={props.checkIsSaved}
                            handleSaveMovie={props.handleSaveMovie}
                            handleDeleteMovie={props.handleDeleteMovie}
                            isSavedMovies={props.isSavedMovies}
                            setIsSavedMovies = {props.setIsSavedMovies}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default MoviesCardList;