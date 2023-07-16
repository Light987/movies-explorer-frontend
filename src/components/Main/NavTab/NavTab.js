import React from "react";
import logo from "../../../images/logo.svg";
import {Link, useLocation} from "react-router-dom";

// import { Link, useLocation } from "react-router-dom";

function NavTab(props) {
    const {pathname} = useLocation();

    return (
        <navtab className="navtab">
            <img className="navtab__logo" src={logo} alt="Обозреватель фильмов"/>

            <ul className="navtab__profile">
                <li>
                    <Link to="/signup" className="navtab__profile-link navtab__profile-link_signin">
                        Регистрация
                    </Link>
                </li>
                <li>
                    <Link to="/signin" className="navtab__profile-link navtab__profile-link_signup">
                        Войти
                    </Link>
                </li>
            </ul>

        </navtab>
    );
}

export default NavTab;