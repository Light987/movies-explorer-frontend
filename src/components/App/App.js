import auth from "../../utils/Auth";
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import moviesApi from "../../utils/MoviesApi";


function App() {
    const navigate = useNavigate();
    const [width, setWidth] = useState(window.innerWidth);
    const [count, setCount] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(true);
    const [moviesBF, setMoviesBF] = useState([]);
    const [filteredMoviesBF, setFilteredMoviesBF] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
    const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [isErrorMessage, setIsErrorMessage] = useState("");
    const [isErrorStatus, setIsErrorStatus] = useState(false);
    const [isErrorMessageInput, setIsErrorMessageInput] = useState("");
    const [isErrorStatusInput, setIsErrorStatusInput] = useState(false);
    const [maxMovies, setMaxMovies] = useState(0);
    const [isSavedMovies, setIsSavedMovies] = useState(false)
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [isShortSavedMovies, setIsShortSavedMovies] = useState(false);
    const [updateProf, setUpdateProf] = useState(false);
    const [loading, setLoading] = useState(false)


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

        const movieSearchValue = JSON.parse(localStorage.getItem("movieSearchValue"));

        if (movieSearchValue === null) {
            setLoading(false)
        }

        if (loggedIn) {
            Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies(), moviesApi.getAllMovies()])
                .then(([profileInfo, savedMovies, movies]) => {
                    setCurrentUser(profileInfo);


                    setMoviesBF(movies)
                    setSavedMovies(savedMovies.reverse());
                    setFilteredSavedMovies(savedMovies.reverse())
                    setIsShortMovies(movieSearchValue.checkbox);
                    setLoading(false)


                    if (movieSearchValue.search !== '' && !movieSearchValue.checkbox) {
                        const filteredMovies = movies.filter((movie) => movie.nameRU.toLowerCase().includes(movieSearchValue.search.toLowerCase()));
                        setFilteredMoviesBF(filteredMovies);
                        setMaxMovies(filteredMovies.length);
                    } else if (movieSearchValue.checkbox && movieSearchValue.search !== '') {
                        const filteredMovies = movies.filter((movie) => movie.nameRU.toLowerCase().includes(movieSearchValue.search.toLowerCase()));
                        const filteredAndCheckBox = filteredMovies.filter((movie) => movie.duration <= 40);
                        setFilteredMoviesBF(filteredAndCheckBox);
                        setMaxMovies(filteredAndCheckBox.length);
                    } else if (movieSearchValue.checkbox) {
                        const filteredMovies = movies.filter((movie) => movie.duration <= 40);
                        setFilteredMoviesBF(filteredMovies);
                        setMaxMovies(filteredMovies.length);
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


    // useEffect(() => {
    //     if (loggedIn) {
    //         if (pathname === "/sign-in" || pathname === "/sign-up") {
    //             navigate('/movie', {replace: true});
    //         }
    //     }
    // }, [loggedIn]);

    function handleRegister(regUserData) {

        auth
            .register(regUserData)
            .then(() => {
                handleLogin(regUserData)
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
        navigate("/about", {replace: true});
        setLoggedIn(false);
        localStorage.clear();
        setMoviesBF([]);
        setMaxMovies(0);
        setSavedMovies([]);
    }

    function handleUpdateUser(newUserInfo) {

        mainApi
            .patchUserInfo(newUserInfo)
            .then((data) => {
                setCurrentUser(data);
                setTimeout(() => setUpdateProf(false), 2000)

            })
            .catch((err) => console.log(err))
    }


    function handleSearchMovie({valueSearch, valueCheckbox}) {
        localStorage.setItem("movieSearchValue", JSON.stringify({
            'search': valueSearch,
            'checkbox': valueCheckbox
        }));

        if (valueSearch === '' && !valueCheckbox) {
            errorInput("Нужно ввести ключевое слово", true);
        } else if (valueCheckbox && valueSearch === '') {
            const filteredMovies = moviesBF.filter((movie) => {
                return movie.duration <= 40;
            });
            setFilteredMoviesBF(filteredMovies);
            setMaxMovies(filteredMovies.length);
            error("", false);
            errorInput("", false);
            setLoading(false)
            console.log(loading)

            if (width >= 1280) {
                setCount(12);
            } else if (width > 635 && width < 1280) {
                setCount(8);
            } else {
                setCount(5);
            }
        } else if ((valueSearch !== '') && valueCheckbox) {
            const filteredMovies = moviesBF.filter((movie) => {
                return movie.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
            });
            const filteredMoviesAndShort = filteredMovies.filter((movie) => {
                return movie.duration <= 40;
            });
            setFilteredMoviesBF(filteredMoviesAndShort);
            setMaxMovies(filteredMoviesAndShort.length);
            error("", false);
            errorInput("", false);
            setLoading(false)
            console.log(loading)


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
        } else {
            const filteredMovies = moviesBF.filter((movie) => {
                return movie.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
            });
            setFilteredMoviesBF(filteredMovies);
            setMaxMovies(filteredMovies.length);
            error("", false);
            errorInput("", false);
            setLoading(false)
            console.log(loading)


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
        }
    }

    function handleSearchSavedMovie({valueSearch, valueCheckbox}) {

        if (valueSearch === '' && !valueCheckbox) {
            setFilteredSavedMovies(savedMovies);
            error("", false);
            errorInput("", false);
            setLoading(false)

            if (width >= 1280) {
                setCount(12);
            } else if (width > 635 && width < 1280) {
                setCount(8);
            } else {
                setCount(5);
            }
        } else if (valueCheckbox && valueSearch === '') {
            const filteredMovies = savedMovies.filter((movie) => {
                return movie.duration <= 40;
            });
            setFilteredSavedMovies(filteredMovies);
            error("", false);
            errorInput("", false);
            setLoading(false)

            if (width >= 1280) {
                setCount(12);
            } else if (width > 635 && width < 1280) {
                setCount(8);
            } else {
                setCount(5);
            }
        } else if ((valueSearch !== '') && valueCheckbox) {
            const filteredMovies = savedMovies.filter((movie) => {
                return movie.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
            });
            const filteredMoviesAndShort = filteredMovies.filter((movie) => {
                return movie.duration <= 40;
            });
            setFilteredSavedMovies(filteredMoviesAndShort);
            error("", false);
            errorInput("", false);
            setLoading(false)


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
        } else {
            const filteredMovies = savedMovies.filter((movie) => {
                return movie.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
            });
            setFilteredSavedMovies(filteredMovies);
            error("", false);
            errorInput("", false);
            setLoading(false)


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
        }
    }

    function handleMoreMovies() {
        if (width >= 1280) {
            setCount(count + 3);
        } else if (width > 635 && width <= 1280) {
            setCount(count + 2);
        } else {
            setCount(count + 2);
        }
    }

    function handleSaveMovie(data) {
        mainApi.postMovie(data)
            .then((movie) => {
                setSavedMovies([movie, ...savedMovies]);
                setFilteredSavedMovies([movie, ...savedMovies])
            })
            .catch((err) => console.log(err.message));
    }

    function handleDeleteMovie(movie) {
        const id = movie._id ? movie._id : savedMovies.find(savedMovie => savedMovie.movieId === movie.id)._id;
        mainApi.deleteMovie(id)
            .then(() => {
                const newSavedMovies = savedMovies.filter((item) => item._id !== id);
                setSavedMovies(newSavedMovies);
                setFilteredSavedMovies(newSavedMovies)
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
        setTimeout(() => setIsEditProfile(false), 2000)
    }

    const checkIsSaved = (movie) => savedMovies.some((savedMovies) => savedMovies.movieId === movie.id);

    return (<CurrentUserContext.Provider value={currentUser}>
        <div className="app">


            <Header onBurgerMenu={setIsOpenBurgerMenu} width={width} loggedIn={loggedIn}/>
            <Routes>

                <Route
                    path="/movies"
                    element={<ProtectedRoute
                        loggedIn={loggedIn}
                        element={Movies}
                        movies={filteredMoviesBF}
                        isShortMovies={isShortMovies}
                        checkIsSaved={checkIsSaved}
                        handleSearchMovie={handleSearchMovie}
                        setIsShortMovies={setIsShortMovies}
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
                        loading={loading}
                        setLoading={setLoading}
                    />}/>

                <Route
                    path="/saved-movies"
                    element={<ProtectedRoute
                        loggedIn={loggedIn}
                        element={SavedMovies}
                        savedMovies={filteredSavedMovies}
                        handleSearchMovie={handleSearchSavedMovie}
                        isShortMovies={isShortSavedMovies}
                        setIsShortMovies={setIsShortSavedMovies}
                        isSavedMovies={!checkIsSaved}
                        setIsSavedMovies={setIsSavedMovies}
                        isError={isErrorMessage}
                        isSuccess={isErrorStatus}
                        isErrorInput={isErrorMessageInput}
                        isSuccessInput={isErrorStatusInput}
                        maxSavedMovies={filteredSavedMovies.length}
                        width={width}
                        count={count}
                        setCount={setCount}
                        handleSaveMovie={handleSaveMovie}
                        handleDeleteMovie={handleDeleteMovie}
                        handleMoreMovies={handleMoreMovies}
                        loading={loading}
                        setLoading={setLoading}
                    />}/>

                <Route path="/profile"
                       element={<ProtectedRoute
                           loggedIn={loggedIn}
                           element={Profile}
                           isEditProfile={isEditProfile}
                           onEditProfile={setIsEditProfile}
                           handleEditProfile={handleEditProfile}
                           onUpdateUser={handleUpdateUser}
                           onSignout={handleSignOut}
                           onUpdateProf={updateProf}
                           setUpdateProf={setUpdateProf}/>}/>

                <Route path="/signin" element={loggedIn ? (
                    <Navigate to="/movies" replace/>
                ) : (
                    <Login onLogin={handleLogin}/>)}/>

                <Route path="/signup"
                       element={loggedIn ? (
                           <Navigate to="/movies" replace/>
                       ) : (
                           <Register isSuccess={isErrorStatus}
                                     isError={isErrorMessage}
                                     onRegister={handleRegister}/>)
                       }/>


                <Route path="/about" element={<Main loggedIn={loggedIn}/>}/>

                <Route path="/404" element={<NotFound/>}/>
                <Route path="*" element={<Navigate to="/404"/>}/>

            </Routes>
            <BurgerMenu isOpened={isOpenBurgerMenu} onClose={closeBurgerMenu}/>


            <Footer/>
        </div>
    </CurrentUserContext.Provider>);
}

export default App;
