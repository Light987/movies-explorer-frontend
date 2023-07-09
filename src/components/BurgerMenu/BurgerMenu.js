import {Link} from "react-router-dom";
import icon_profile from "../../images/icon-profile.svg";
import icon_close from "../../images/icon-close.svg";
import React from "react";

function BurgerMenu(props) {

    return (
        <nav className={`burgerMenu  ${props.isOpened ? "burgerMenu__visible" : ""}`}>
            <div className="burgerMenu__overlay"></div>

            <ul className="burgerMenu__menu">
                <li className="burgerMenu__item">
                    <button
                        type="button"
                        className="burgerMenu__close-button"
                        onClick={props.onClose}>
                        <img className="burgerMenu__close-button_img" src={icon_close}
                             alt="Закрыть"></img>
                    </button>
                </li>

                <li className="burgerMenu__item">
                    <Link to="/about" className="burgerMenu__link">
                        Главная
                    </Link>
                </li>

                <li className="burgerMenu__item">
                    <Link to="/movies" className="burgerMenu__link">
                        Фильмы
                    </Link>
                </li>

                <li className="burgerMenu__item">
                    <Link to="/saved-movies" className="burgerMenu__link">
                        Сохранённые фильмы
                    </Link>
                </li>

                <li className="burgerMenu__item">
                    <Link to="/profile" className="burgerMenu__link">
                        <p className="burgerMenu__link-text">Аккаунт</p>
                        <img className="burgerMenu__link-img" src={icon_profile}
                             alt="Профайл"></img>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default BurgerMenu;