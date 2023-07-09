import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList(props) {

    return (
        <ul className="moviescardlist">
            {props.movies.filter(movie => movie.name.includes(props.movieQuery)).map((movie) => (
                <MoviesCard key={movie.movieId} movie={movie} onMovieLike={props.onMovieLike} />
            ))}
        </ul>
    );
}

export default MoviesCardList;