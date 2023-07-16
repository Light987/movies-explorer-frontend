import React from "react";
import logo from "../../images/logo.svg";
import burger_menu from "../../images/icon_burger-menu.svg";
import icon_profile from "../../images/icon-profile.svg";
import {Link, useLocation} from "react-router-dom";

function Header(props) {
    const {pathname} = useLocation();

    return (
        <>
            {pathname === "/about" && (
                <header className="header">
                    <nav className="header__nav">
                        <ul className="header__profile">
                            <li className="header__item-profile">
                                <Link to="/">
                                    <img className="header__logo" src={logo} alt="Обозреватель фильмов"/>
                                </Link>
                            </li>
                            <li className="header__item-profile">
                                <Link to="/signup" className="header__profile-link header__profile-link_signin">
                                    Регистрация
                                </Link>
                            </li>

                            <li className="header__item-profile">
                                <Link to="/signin" className="header__profile-link header__profile-link_signup">
                                    Войти
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
            )}

            {(pathname === "/movies" || pathname === "/saved-movies" || pathname === "/profile") && (
                <header className="header header_movies">

                    {props.width > 990 ?

                        <nav className="header__nav">
                            <ul className="header__profile header__profile_movies">
                                <li className="header__profile-list-item">
                                    <Link to="/">
                                        <img className="header__logo" src={logo} alt="Обозреватель фильмов"/>
                                    </Link>
                                </li>
                                <li className="header__profile-list-item">
                                    <Link to="/movies"
                                          className={`header__profile-link header__profile-link_movies ${pathname === "/saved-movies" ? "header__profile-link_on-page" : ""}`}>
                                        Фильмы
                                    </Link>
                                </li>

                                <li className="header__profile-list-item">
                                    <Link to="/saved-movies"
                                          className={`header__profile-link header__profile-link_movies ${pathname === "/movies" ? "header__profile-link_on-page" : ""}`}>
                                        Сохранённые фильмы
                                    </Link>
                                </li>

                                <li className="header__profile-list-item">
                                    <Link to="/profile" className="header__profile-link header__profile-link_movies">
                                        <p className="header__link-profile header__link-profile_movies-text">Аккаунт</p>
                                        <img className="header__link-profile header__link-profile_movies-img"
                                             src={icon_profile}
                                             alt="Профайл"></img>
                                    </Link>
                                </li>
                            </ul>
                        </nav> : <nav className="header__nav">
                            <div className='header__burger'>
                                <Link to="/">
                                    <img className="header__logo" src={logo} alt="Обозреватель фильмов"/>
                                </Link>
                                <button className="header__burger-menu"
                                        type="button"
                                        onClick={() => {
                                            props.onBurgerMenu(true);
                                        }}
                                >
                                    <img src={burger_menu} alt="Меню" className="header__burger-menu_img"/>
                                </button>
                            </div>
                        </nav>}
                </header>
            )}
        </>
    );
}

export default Header;