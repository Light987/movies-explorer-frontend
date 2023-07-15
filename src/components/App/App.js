import auth from "../../utils/Auth";
import {Routes, Route, Navigate, useNavigate, useSearchParams} from "react-router-dom";
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Register from '../Register/Register'
import NotFound from '../NotFound/NotFound'
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import React, {useEffect, useState} from "react";
import useResize from '../../utils/useResize';

import CurrentUserContext from "../../contexts/CurrentUserContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import api from "../../utils/Api";

import moviess from "../../utils/movies"

let arrayForHoldingMovies = [];

function App() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [movies, setMovies] = useState([]);
    const width = useResize();
    const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [isErrorMessage, setIsErrorMessage] = useState("");
    const [isErrorStatus, setIsErrorStatus] = useState(false);
    const [moviesToShow, setMoviesToShow] = useState([]);
    const [moviesPerPage, setMoviesPerPages] = useState(setStep);
    const [next, setNext] = useState(setStep);
    const [searchParams, setSearchParams] = useSearchParams()

    const movieQuery = searchParams.get('movie') || ''

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const query = form.search.value;
        setSearchParams({movie: query})
    }

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            auth
                .checkToken(token)
                .then((res) => {
                    if (res) {
                        setLoggedIn(true);
                    }
                })
                .catch((err) => console.log(err))
        }
    }, []);

    useEffect(() => {
        if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getAllCards()])
                .then(([profileInfo, movies]) => {
                    setCurrentUser(profileInfo);
                    setMovies(movies.reverse().map((movie) => ({...movie})));
                })
                .catch((err) => console.log(err));
        }
    }, [loggedIn]);

    useEffect(() => {

        loopWithSlice(0, moviesPerPage);
    }, []);

    function handleRegister(regUserData) {

        auth
            .register(regUserData)
            .then(() => {
                navigate("/signin", {replace: true});
                error("", false);
            })
            .catch((err) => {
                console.log(err);
                error("Что-то пошло не так...", true);
            });
    }

    function handleLogin(userData) {

        auth
            .login(userData)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("jwt", res.token);
                    setLoggedIn(true);
                    navigate("/movies", {replace: true});
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleSignOut() {
        setLoggedIn(false);
        localStorage.removeItem("jwt");
        navigate("/", {replace: true});
    }

    function handleUpdateUser(newUserInfo) {

        api
            .patchUserInfo(newUserInfo)
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => console.log(err))
    }

    function closeBurgerMenu() {
        setIsOpenBurgerMenu(false);
    }

    function error(message, isSuccess) {
        setIsErrorMessage(message);
        setIsErrorStatus(isSuccess);
    }

    const loopWithSlice = (start, end) => {
        const slicedMovies = moviess.slice(start, end);
        arrayForHoldingMovies = [...arrayForHoldingMovies, ...slicedMovies];
        setMoviesToShow(arrayForHoldingMovies);
    };

    function setStep() {
        if (width >= 1280) {
            return 12
        } else if (width >= 768 && width < 1280) {
            return 8
        } else {
            return 5
        }
    }

    const handleShowMoreMovies = () => {
        loopWithSlice(next, next + moviesPerPage);
        setNext(next + moviesPerPage);
    };

    function handleMovieLike(movie) {
        const isLiked = movie.isLiked;

        movie.isLiked = !isLiked;
        loopWithSlice(next, moviesPerPage);
    }

    function handleEditProfile() {
        setIsEditProfile(false);
    }

    return (<CurrentUserContext.Provider value={currentUser}>
        <div className="app">


            <Header onBurgerMenu={setIsOpenBurgerMenu} width={width}/>
            <Routes>
                <Route
                    path="/"
                    element={loggedIn ? (<Navigate to="/movies" replace/>) : (<Navigate to="/about" replace/>)}
                />

                <Route path="/about" element={<Main/>}/>

                <Route path="/movies" element={<Movies movieLike={handleMovieLike}
                                                       maxMovies={moviess.length}
                                                       moviesToRender={moviesToShow}
                                                       showMoreMovies={handleShowMoreMovies}
                                                       handleSubmit={handleSubmit}
                                                       movieQuery={movieQuery}/>}/>

                <Route path="/saved-movies" element={<SavedMovies onBurgerMenu={setIsOpenBurgerMenu}
                                                                  width={width}
                                                                  movieLike={handleMovieLike}
                                                                  handleSubmit={handleSubmit}
                                                                  movieQuery={movieQuery}/>}/>

                <Route path="/profile"
                       element={<Profile isEditProfile={isEditProfile}
                                         onEditProfile={setIsEditProfile}
                                         handleEditProfile={handleEditProfile}
                                         onUpdateUser={handleUpdateUser}
                                         onSignout={handleSignOut}/>}/>

                <Route path="/signin" element={<Login onLogin={handleLogin}/>}/>

                <Route path="/signup"
                       element={<Register isSuccess={isErrorStatus} isError={isErrorMessage}
                                          onRegister={handleRegister}/>}/>

                <Route path="/404" element={<NotFound/>}/>
                <Route path="*" element={<Navigate to="/404"/>}/>
            </Routes>

            <BurgerMenu isOpened={isOpenBurgerMenu} onClose={closeBurgerMenu}/>

            <Footer/>
        </div>
    </CurrentUserContext.Provider>);
}

export default App;
