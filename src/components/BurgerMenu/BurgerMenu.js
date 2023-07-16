import {Link} from "react-router-dom";
import icon_profile from "../../images/icon-profile.svg";
import icon_close from "../../images/icon-close.svg";
import React from "react";

function BurgerMenu(props) {

    return (
        <nav className={`burger-menu  ${props.isOpened ? "burger-menu__visible" : ""}`}>
            <div className="burger-menu__overlay"></div>

            <ul className="burger-menu__menu">
                <li className="burger-menu__item">
                    <button
                        type="button"
                        className="burger-menu__close-button"
                        onClick={props.onClose}>
                        <img className="burger-menu__close-button-img" src={icon_close}
                             alt="Закрыть"></img>
                    </button>
                </li>

                <li className="burger-menu__item">
                    <Link to="/about" className="burger-menu__link">
                        Главная
                    </Link>
                </li>

                <li className="burger-menu__item">
                    <Link to="/movies" className="burger-menu__link">
                        Фильмы
                    </Link>
                </li>

                <li className="burger-menu__item">
                    <Link to="/saved-movies" className="burger-menu__link">
                        Сохранённые фильмы
                    </Link>
                </li>

                <li className="burger-menu__item">
                    <Link to="/profile" className="burger-menu__link">
                        <p className="burger-menu__link-text">Аккаунт</p>
                        <img className="burger-menu__link-img" src={icon_profile}
                             alt="Профайл"></img>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default BurgerMenu;