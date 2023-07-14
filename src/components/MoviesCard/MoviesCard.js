import addMovies from '../../images/icon_check.svg'
import delMovies from '../../images/icon-delLike.svg'
import {useLocation} from "react-router-dom";


function MoviesCard(props) {
    const {pathname} = useLocation();
    const isLiked = props.movie.isLiked

    const cardLikeButtonClassName = pathname === "/saved-movies" ? "moviescard__button" : `moviescard__button ${
        isLiked && "moviescard__button-check"
    }`;

    function handleLikeClick() {
        props.onMovieLike(props.movie);
    }

    return (
        <li className="moviescard">
            <div className="moviescard__head">
                <h2 className="moviescard__head-title">{props.movie.name}</h2>
                <p className="moviescard__head-time">{props.movie.duration}</p>
            </div>
            <img src={props.movie.thumbNail} className="moviescard__img" alt={props.movie.name}></img>
            <button type='button'
                className={cardLikeButtonClassName}
                onClick={handleLikeClick}>
                {isLiked ?
                <img src={pathname === "/saved-movies" ? delMovies : addMovies} alt="Добавить в избранное"></img> : "Сохранить"}
            </button>
        </li>
    );
}

export default MoviesCard;