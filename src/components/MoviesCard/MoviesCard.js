import addMovies from '../../images/icon_check.svg'
import delMovies from '../../images/icon-delLike.svg'
import {useLocation} from "react-router-dom";


function MoviesCard(props) {
    const {pathname} = useLocation();

    const isLike = props.checkIsSaved ? props.checkIsSaved(props.movie) : pathname === '/saved-movies';

    const handleLikeClick = () => isLike ? props.handleDeleteMovie(props.movie) : props.handleSaveMovie(props.movie);


    const cardLikeButtonClassName = `movies-card__button ${isLike ? 'movies-card__button-check' : ''}`

    return (
        <>
            <div className="movies-card__head">
                <h2 className="movies-card__head-title">{props.movie.nameRU}</h2>
                <p className="movies-card__head-time">{props.movie.duration} минуты</p>
            </div>
            <a href={props.movie.trailerLink}>
                <img
                src={`${pathname === "/saved-movies" ? props.movie.image : "https://api.nomoreparties.co" + props.movie.image.url}`}
                className="movies-card__img" alt={props.movie.nameRU}></img>
            </a>
            {pathname === '/movies' ? (
                <button onClick={handleLikeClick}
                        className={cardLikeButtonClassName}
                        type='button'>
                    {isLike ?
                        <img src={addMovies}
                             alt="Добавить в избранное"></img> : "Сохранить"}
                </button>
            ) : (
                <button onClick={handleLikeClick} className='movies-card__button' type='button'>
                    <img src={delMovies} alt="Удалить из избранное"></img>
                </button>
            )}
        </>
    );
}

export default MoviesCard;