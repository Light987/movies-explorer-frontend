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
    const [loggedIn, setLoggedIn] = useState(false);
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
    const [isSavedMovies, setIsSavedMovies] = useState(false)
    const [isShortMovies, setIsShortMovies] = useState(false);
    const [isShortSavedMovies, setIsShortSavedMovies] = useState(false);
    const [updateProf, setUpdateProf] = useState(false);
    const [loading, setLoading] = useState(false)
    const [isAppLoad, setIsAppLoad] = useState(false)

    const movieSearchValue = JSON.parse(localStorage.getItem("movieSearchValue"))


    if (movieSearchValue === null) {
        localStorage.setItem("movieSearchValue", JSON.stringify({
            'search': '',
            'checkbox': false
        }));
    }

    const savedMovieSearchValue = JSON.parse(localStorage.getItem("savedMovieSearchValue"))

    if (savedMovieSearchValue === null) {
        localStorage.setItem("savedMovieSearchValue", JSON.stringify({
            'search': '',
            'checkbox': false
        }));
    }

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        if (token) {
            auth
                .checkToken(token)
                .then((res) => {
                    if (res) {
                        setCurrentUser(res);
                        setLoggedIn(true);
                        setIsAppLoad(true)

                    }
                })
                .catch((err) => console.log(err))
        }
    }, []);


    useEffect(() => {

        const movieSearchValue = JSON.parse(localStorage.getItem("movieSearchValue"));
        const savedMovieSearchValue = JSON.parse(localStorage.getItem("savedMovieSearchValue"))

        if (movieSearchValue === '') {
            setLoading(false)
        }

        if (loggedIn) {
            Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies(), moviesApi.getAllMovies()])
                .then(([profileInfo, savedMovies, movies]) => {
                    setCurrentUser(profileInfo);
                    setLoggedIn(true);

                    setMoviesBF(movies)
                    setSavedMovies(savedMovies.reverse());
                    setFilteredSavedMovies(savedMovies.reverse())
                    setIsShortMovies(movieSearchValue.checkbox);
                    setLoading(false)


                    if (movieSearchValue.search !== '' && !movieSearchValue.checkbox) {
                        const filteredMovies = movies.filter((movie) => movie.nameRU.toLowerCase().includes(movieSearchValue.search.toLowerCase()));
                        setFilteredMoviesBF(filteredMovies);
                    } else if (movieSearchValue.checkbox && movieSearchValue.search !== '') {
                        const filteredMovies = movies.filter((movie) => movie.nameRU.toLowerCase().includes(movieSearchValue.search.toLowerCase()));
                        const filteredAndCheckBox = filteredMovies.filter((movie) => movie.duration <= 40);
                        setFilteredMoviesBF(filteredAndCheckBox);
                    } else if (movieSearchValue.checkbox) {
                        const filteredMovies = movies.filter((movie) => movie.duration <= 40);
                        setFilteredMoviesBF(filteredMovies);
                    }

                    if (savedMovieSearchValue.search !== '' && !savedMovieSearchValue.checkbox) {
                        const filteredMovies = savedMovies.reverse().filter((movie) => movie.nameRU.toLowerCase().includes(savedMovieSearchValue.search.toLowerCase()));
                        setFilteredSavedMovies(filteredMovies);
                        setIsShortMovies(filteredMovies)
                    } else if (savedMovieSearchValue.checkbox && savedMovieSearchValue.search !== '') {
                        const filteredMovies = savedMovies.reverse().filter((movie) => movie.nameRU.toLowerCase().includes(savedMovieSearchValue.search.toLowerCase()));
                        const filteredAndCheckBox = filteredMovies.filter((movie) => movie.duration <= 40);
                        setFilteredSavedMovies(filteredAndCheckBox);
                        setIsShortMovies(filteredAndCheckBox)
                    } else if (savedMovieSearchValue.checkbox) {
                        const filteredMovies = savedMovies.reverse().filter((movie) => movie.duration <= 40);
                        setFilteredSavedMovies(filteredMovies);
                        setIsShortMovies(filteredMovies)
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
                handleLogin(regUserData)
                error("", false);
                setIsAppLoad(true)
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
                    setIsAppLoad(true)
                    navigate("/movies", {replace: true});
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleSignOut() {
        navigate("/", {replace: true});
        setLoggedIn(false);
        setIsAppLoad(false)
        localStorage.clear();
        setMoviesBF([]);
        setSavedMovies([]);
        setFilteredSavedMovies([])
        setFilteredMoviesBF([])
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

        if (valueSearch === '') {
            errorInput("Нужно ввести ключевое слово", true);
            setLoading(false)
        } else if (valueCheckbox && valueSearch === '') {
            const filteredMovies = moviesBF.filter((movie) => {
                return movie.duration <= 40;
            });
            setFilteredMoviesBF(filteredMovies);
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
        } else if ((valueSearch !== '') && valueCheckbox) {
            const filteredMovies = moviesBF.filter((movie) => {
                return movie.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
            });
            const filteredMoviesAndShort = filteredMovies.filter((movie) => {
                return movie.duration <= 40;
            });
            setFilteredMoviesBF(filteredMoviesAndShort);
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

            if (filteredMoviesAndShort.length === 0) {
                error("Ничего не найдено", true);
            }
        } else {
            const filteredMovies = moviesBF.filter((movie) => {
                return movie.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
            });
            setFilteredMoviesBF(filteredMovies);
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

    function handleShortMovie({valueSearch, valueCheckbox}) {
        localStorage.setItem("movieSearchValue", JSON.stringify({
            'search': valueSearch,
            'checkbox': valueCheckbox
        }));

        if (valueCheckbox && valueSearch !== '') {
            const filteredMovies = filteredMoviesBF.filter((movie) => {
                return movie.duration <= 40;
            });
            setFilteredMoviesBF(filteredMovies);
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
        } else if (valueCheckbox && valueSearch === '') {
            const filteredMovies = filteredMoviesBF.filter((movie) => {
                return movie.duration <= 40;
            });
            setFilteredMoviesBF(filteredMovies);
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
            const filteredMovies = moviesBF.filter((movie) => {
                return movie.nameRU.toLowerCase().includes(valueSearch.toLowerCase());
            });
            setFilteredMoviesBF(filteredMovies);
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


    function handleSearchSavedMovie({valueSearch, valueCheckbox}) {
        localStorage.setItem("savedMovieSearchValue", JSON.stringify({
            'search': valueSearch,
            'checkbox': valueCheckbox
        }));


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

            if (savedMovies.length === 0) {
                error("Ничего не найдено", true);
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

            if (filteredMovies.length === 0) {
                error("Ничего не найдено", true);
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

            if (filteredMoviesAndShort.length === 0) {
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

    function handleShortSavedMovie({valueSearch, valueCheckbox}) {
        localStorage.setItem("savedMovieSearchValue", JSON.stringify({
            'search': valueSearch,
            'checkbox': valueCheckbox
        }));

        if (valueCheckbox && valueSearch !== '') {
            const filteredMovies = filteredSavedMovies.filter((movie) => {
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

            if (filteredMovies.length === 0) {
                error("Ничего не найдено", true);
            }
        } else if (valueCheckbox && valueSearch === '') {
            const filteredMovies = filteredSavedMovies.filter((movie) => {
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

            if (savedMovies.length === 0) {
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

                if (savedMovieSearchValue.search !== '' && !savedMovieSearchValue.checkbox) {
                    const filteredMovies = [movie, ...savedMovies].reverse().filter((movie) => movie.nameRU.toLowerCase().includes(savedMovieSearchValue.search.toLowerCase()));
                    setFilteredSavedMovies(filteredMovies);
                    setIsShortMovies(filteredMovies)

                    if (filteredMovies.length === 0) {
                        error("Ничего не найдено", true);
                    }
                } else if (savedMovieSearchValue.checkbox && savedMovieSearchValue.search !== '') {
                    const filteredMovies = [movie, ...savedMovies].reverse().filter((movie) => movie.nameRU.toLowerCase().includes(savedMovieSearchValue.search.toLowerCase()));
                    const filteredAndCheckBox = filteredMovies.filter((movie) => movie.duration <= 40);
                    setFilteredSavedMovies(filteredAndCheckBox);
                    setIsShortMovies(filteredAndCheckBox)

                    if (filteredAndCheckBox.length === 0) {
                        error("Ничего не найдено", true);
                    }
                } else if (savedMovieSearchValue.checkbox) {
                    const filteredMovies = [movie, ...savedMovies].reverse().filter((movie) => movie.duration <= 40);
                    setFilteredSavedMovies(filteredMovies);
                    setIsShortMovies(filteredMovies)

                    if (filteredMovies.length === 0) {
                        error("Ничего не найдено", true);
                    }
                } else {
                    setFilteredSavedMovies([movie, ...savedMovies])
                }
            })
            .catch((err) => console.log(err.message));
    }

    function handleDeleteMovie(movie) {
        const id = movie._id ? movie._id : savedMovies.find(savedMovie => savedMovie.movieId === movie.id)._id;

        mainApi.deleteMovie(id)
            .then(() => {

                const newSavedMovies = savedMovies.filter((item) => item._id !== id);
                setSavedMovies(newSavedMovies);

                if (savedMovieSearchValue.search !== '' && !savedMovieSearchValue.checkbox) {
                    const filteredMovies = newSavedMovies.reverse().filter((movie) => movie.nameRU.toLowerCase().includes(savedMovieSearchValue.search.toLowerCase()));
                    setFilteredSavedMovies(filteredMovies);
                    setIsShortMovies(filteredMovies)

                    if (filteredMovies.length === 0) {
                        error("Ничего не найдено", true);
                    }
                } else if (savedMovieSearchValue.checkbox && savedMovieSearchValue.search !== '') {
                    const filteredMovies = newSavedMovies.reverse().filter((movie) => movie.nameRU.toLowerCase().includes(savedMovieSearchValue.search.toLowerCase()));
                    const filteredAndCheckBox = filteredMovies.filter((movie) => movie.duration <= 40);
                    setFilteredSavedMovies(filteredAndCheckBox);
                    setIsShortMovies(filteredAndCheckBox)

                    if (filteredAndCheckBox.length === 0) {
                        error("Ничего не найдено", true);
                    }
                } else if (savedMovieSearchValue.checkbox) {
                    const filteredMovies = newSavedMovies.reverse().filter((movie) => movie.duration <= 40);
                    setFilteredSavedMovies(filteredMovies);
                    setIsShortMovies(filteredMovies)

                    if (filteredMovies.length === 0) {
                        error("Ничего не найдено", true);
                    }
                } else {
                    setFilteredSavedMovies(newSavedMovies)
                }

            })
            .catch((err) => console.log(err.message))
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


    function handleEditProfile(value) {
        if (!value) {
            setTimeout(() => setIsEditProfile(false), 2000)
        } else {
            setIsEditProfile(false)
        }
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
                        handleShortMovie={handleShortMovie}
                        handleSearchMovie={handleSearchMovie}
                        setIsShortMovies={setIsShortMovies}
                        isSavedMovies={isSavedMovies}
                        setIsSavedMovies={setIsSavedMovies}
                        isError={isErrorMessage}
                        isSuccess={isErrorStatus}
                        isErrorInput={isErrorMessageInput}
                        isSuccessInput={isErrorStatusInput}
                        maxMovies={filteredMoviesBF.length}
                        width={width}
                        count={count}
                        setCount={setCount}
                        handleSaveMovie={handleSaveMovie}
                        handleDeleteMovie={handleDeleteMovie}
                        handleMoreMovies={handleMoreMovies}
                        loading={loading}
                        setLoading={setLoading}
                        isAppLoad={isAppLoad}
                    />}/>

                <Route
                    path="/saved-movies"
                    element={<ProtectedRoute
                        loggedIn={loggedIn}
                        element={SavedMovies}
                        handleShortSavedMovie={handleShortSavedMovie}
                        savedMovies={filteredSavedMovies}
                        handleSearchSavedMovie={handleSearchSavedMovie}
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
                        isAppLoad={isAppLoad}
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
                           setUpdateProf={setUpdateProf}
                           isAppLoad={isAppLoad}/>}/>

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


                <Route path="/" element={<Main/>}/>

                <Route path="/404" element={<NotFound/>}/>
                <Route path="*" element={<Navigate to="/404"/>}/>

            </Routes>
            <BurgerMenu isOpened={isOpenBurgerMenu} onClose={closeBurgerMenu}/>


            <Footer/>
        </div>
    </CurrentUserContext.Provider>);
}

export default App;
