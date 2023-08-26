import auth from "../../utils/Auth";
import {Routes, Route, Navigate, useNavigate, useLocation} from "react-router-dom";
import Main from '../Main/Main'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Register from '../Register/Register'
import NotFound from '../NotFound/NotFound'
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import React, {useEffect, useState} from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import mainApi from "../../utils/MainApi";
import movieApi from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import moviesApi from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";


function App() {
    const navigate = useNavigate();
    const [width, setWidth] = useState(window.innerWidth);
    const [count, setCount] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [moviesBF, setMoviesBF] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [isErrorMessage, setIsErrorMessage] = useState("");
    const [isErrorStatus, setIsErrorStatus] = useState(false);
    const [isErrorMessageInput, setIsErrorMessageInput] = useState("");
    const [isErrorStatusInput, setIsErrorStatusInput] = useState(false);
    const [maxMovies, setMaxMovies] = useState(0);
    const [maxSavedMovies, setMaxSavedMovies] = useState(0);
    const [isSavedMovies, setIsSavedMovies] = useState(false)


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

        const movieSearchValue = localStorage.getItem("movieSearchValue");

        const movieCheckBox = localStorage.getItem("movieCheckBox");

        const savedMovieSearchValue = localStorage.getItem("savedMovieSearchValue");

        const savedMovieCheckBox = localStorage.getItem("savedMovieCheckBox");

        if (loggedIn) {
            Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies(), moviesApi.getAllMovies()])
                .then(([profileInfo, savedMovies, movies]) => {
                    setCurrentUser(profileInfo);

                    setSavedMovies(savedMovies.reverse());

                    if (movieCheckBox) {
                        const filteredMovies = movies.filter((movie) => movie.duration <= 40);
                        setMoviesBF(filteredMovies);
                        setMaxMovies(filteredMovies.length);
                    }

                    if (movieSearchValue) {
                        const filteredMovies = movies.filter((movie) => movie.nameRU.toLowerCase().includes(movieSearchValue.toLowerCase()));
                        setMoviesBF(filteredMovies);
                        setMaxMovies(filteredMovies.length);
                    }

                    if (savedMovieSearchValue) {
                        const filteredMovies = savedMovies.filter((movie) => movie.duration <= 40);
                        setSavedMovies(filteredMovies);
                        setMaxSavedMovies(filteredMovies.length);
                    }

                    if (savedMovieCheckBox) {
                        const filteredMovies = savedMovies.filter((movie) => movie.nameRU.toLowerCase().includes(savedMovieSearchValue.toLowerCase()));
                        setSavedMovies(filteredMovies);
                        setMaxSavedMovies(filteredMovies.length);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [loggedIn]);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidth(window.innerWidth);
        });

        if (width >= 1280) {
            setCount(12);
        } else if (width > 635 && width < 1280) {
            setCount(8);
        } else {
            setCount(5);
        }
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
    const {pathname} = useLocation();
    console.log(pathname)

    function handleSignOut() {
        navigate("/about", {replace: true});
        setLoggedIn(false);
        localStorage.clear();
        setMoviesBF([]);
        setMaxMovies(0);
        setSavedMovies([]);
        setMaxSavedMovies(0);
    }

    console.log(loggedIn)

    function handleUpdateUser(newUserInfo) {

        mainApi
            .patchUserInfo(newUserInfo)
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => console.log(err))
    }


    function handleSearchMovie(value) {
        localStorage.setItem("movieSearchValue", value);
        if (value === '') {
            errorInput("Нужно ввести ключевое слово", true);
        } else {
            movieApi.getAllMovies()
                .then((movies) => {
                    const filteredMovies = movies.filter((movie) => {
                        return movie.nameRU.toLowerCase().includes(value.toLowerCase());
                    });
                    setMoviesBF(filteredMovies);
                    setMaxMovies(filteredMovies.length);
                    error("", false);
                    errorInput("", false);


                    if (width >= 1280) {
                        setCount(12);
                    } else if (width > 635 && width < 1280) {
                        setCount(8);
                    } else {
                        setCount(5);
                    }

                    if (filteredMovies.length === 0) {
                        error("Ничего не найдено", true);
                    }
                })
                .catch((err) => {
                    console.log(err)
                    error("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз", true)
                });
        }
    }

    function handleSearchSavedMovie(value) {
        localStorage.setItem("savedMovieSearchValue", value);
        if (value === '') {
            errorInput("Нужно ввести ключевое слово", true);
        } else {
            MainApi.getSavedMovies()
                .then((movies) => {
                    const filteredMovies = movies.filter((movie) => {
                        return movie.nameRU.toLowerCase().includes(value.toLowerCase());
                    });
                    setSavedMovies(filteredMovies);
                    setMaxSavedMovies(filteredMovies.length);
                    error("", false);
                    errorInput("", false);


                    if (width >= 1280) {
                        setCount(12);
                    } else if (width > 635 && width < 1280) {
                        setCount(8);
                    } else {
                        setCount(5);
                    }

                    if (filteredMovies.length === 0) {
                        error("Ничего не найдено", true);
                    }
                })
                .catch((err) => {
                    console.log(err)
                    error("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз", true)
                });
        }
    }

    function handleShortMovie(value) {
        localStorage.setItem("movieCheckBox", value);

        if (value) {
            moviesApi.getAllMovies()
                .then((movies) => {
                    const filteredMovies = movies.filter((movie) => {
                        return movie.duration <= 40;
                    });
                    setMoviesBF(filteredMovies);
                    setMaxMovies(filteredMovies.length);
                    error("", false);

                    if (width >= 1280) {
                        setCount(12);
                    } else if (width > 635 && width < 1280) {
                        setCount(8);
                    } else {
                        setCount(5);
                    }
                })
                .catch((err) => {
                    console.log(err)
                    error("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз", true)
                });
        } else {
            setMoviesBF([]);
            setMaxMovies(moviesBF.length);
            if (setMoviesBF.length === 0) {
                error("Ничего не найдено", true);
            }
        }
    }

    function handleShortSavedMovie(value) {
        localStorage.setItem("savedMovieCheckBox", value);

        if (value) {
            MainApi.getSavedMovies()
                .then((movies) => {
                    const filteredMovies = movies.filter((movie) => {
                        return movie.duration <= 40;
                    });
                    setSavedMovies(filteredMovies);
                    setMaxSavedMovies(filteredMovies.length);
                    error("", false);

                    if (width >= 1280) {
                        setCount(12);
                    } else if (width > 635 && width < 1280) {
                        setCount(8);
                    } else {
                        setCount(5);
                    }
                })
                .catch((err) => {
                    console.log(err)
                    error("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз", true)
                });
        } else {
            setSavedMovies([]);
            setMaxSavedMovies(savedMovies.length);
            if (setMoviesBF.length === 0) {
                error("Ничего не найдено", true);
            }
        }
    }

    function handleMoreMovies() {
        if (width >= 1280) {
            setCount(count + 3);
        } else if (width > 635 && width <= 1280) {
            setCount(count + 2);
        } else {
            setCount(count + 1);
        }
    }

    function handleSaveMovie(data) {
        mainApi.postMovie(data)
            .then((movie) => {
                setSavedMovies([movie, ...savedMovies]);
            })
            .catch((err) => console.log(err.message));
    }

    function handleDeleteMovie(movie) {
        const id = movie._id ? movie._id : savedMovies.find(savedMovie => savedMovie.movieId === movie.id)._id;
        mainApi.deleteMovie(id)
            .then(() => {
                const newSavedMovies = savedMovies.filter((item) => item._id !== id);
                setSavedMovies(newSavedMovies);
            })
            .catch((err) => console.log(err.message));
    }

    function closeBurgerMenu() {
        setIsOpenBurgerMenu(false);
    }

    function error(message, isSuccess) {
        setIsErrorMessage(message);
        setIsErrorStatus(isSuccess);
    }

    function errorInput(message, isSuccess) {
        setIsErrorMessageInput(message);
        setIsErrorStatusInput(isSuccess);
    }


    function handleEditProfile() {
        setIsEditProfile(false);
    }

    const checkIsSaved = (movie) => savedMovies.some((savedMovies) => savedMovies.movieId === movie.id);


    return (<CurrentUserContext.Provider value={currentUser}>
        <div className="app">


            <Header onBurgerMenu={setIsOpenBurgerMenu} width={width}/>
            <Routes>

                <Route path="/signin" element={<Login onLogin={handleLogin}/>}/>

                <Route path="/signup"
                       element={<Register isSuccess={isErrorStatus}
                                          isError={isErrorMessage}
                                          onRegister={handleRegister}/>}/>


                <Route path="/about" element={<Main/>}/>

                <Route
                    path="/movies"
                    element={<ProtectedRoute
                        loggedIn={loggedIn}
                        element={Movies}
                        movies={moviesBF}
                        checkIsSaved={checkIsSaved}
                        handleSearchMovie={handleSearchMovie}
                        handleShortMovie={handleShortMovie}
                        isSavedMovies={isSavedMovies}
                        setIsSavedMovies={setIsSavedMovies}
                        isError={isErrorMessage}
                        isSuccess={isErrorStatus}
                        isErrorInput={isErrorMessageInput}
                        isSuccessInput={isErrorStatusInput}
                        maxMovies={maxMovies}
                        width={width}
                        count={count}
                        setCount={setCount}
                        handleSaveMovie={handleSaveMovie}
                        handleDeleteMovie={handleDeleteMovie}
                        handleMoreMovies={handleMoreMovies}
                    />}/>

                <Route
                    path="/saved-movies"

                    element={<ProtectedRoute
                        loggedIn={loggedIn}
                        element={SavedMovies}
                        savedMovies={savedMovies}
                        handleSearchMovie={handleSearchSavedMovie}
                        handleShortMovie={handleShortSavedMovie}
                        isSavedMovies={!checkIsSaved}
                        setIsSavedMovies={setIsSavedMovies}
                        isError={isErrorMessage}
                        isSuccess={isErrorStatus}
                        isErrorInput={isErrorMessageInput}
                        isSuccessInput={isErrorStatusInput}
                        maxSavedMovies={maxSavedMovies}
                        width={width}
                        count={count}
                        setCount={setCount}
                        handleSaveMovie={handleSaveMovie}
                        handleDeleteMovie={handleDeleteMovie}
                        handleMoreMovies={handleMoreMovies}
                    />}/>

                <Route path="/profile"
                       element={<ProtectedRoute
                           loggedIn={loggedIn}
                           element={Profile}
                           isEditProfile={isEditProfile}
                           onEditProfile={setIsEditProfile}
                           handleEditProfile={handleEditProfile}
                           onUpdateUser={handleUpdateUser}
                           onSignout={handleSignOut}/>}/>

                <Route path="/404" element={<NotFound/>}/>
                <Route path="*" element={<Navigate to="/404"/>}/>

            </Routes>

            <BurgerMenu isOpened={isOpenBurgerMenu} onClose={closeBurgerMenu}/>


            <Footer/>
        </div>
    </CurrentUserContext.Provider>);
}

export default App;
