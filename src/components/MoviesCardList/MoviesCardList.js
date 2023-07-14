import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList(props) {

    return (
        <section className="background-movies-card-list">
            <ul className="movies-card-list">
                {props.movies.filter(movie => movie.name.includes(props.movieQuery)).map((movie) => (
                    <MoviesCard key={movie.movieId} movie={movie} onMovieLike={props.onMovieLike}/>
                ))}
            </ul>
        </section>
    );
}

export default MoviesCardList;