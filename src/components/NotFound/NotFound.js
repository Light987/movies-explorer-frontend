import React from "react";
import {Link} from "react-router-dom";

function NotFound() {

    return (
        <div className="notfound">
            <div className="notfound__block">
                <p className="notfound__block_error-code">404</p>
                <p className="notfound__block_error-text">Страница не найдена</p>
                <Link to="/" className="notfound__block_back" href="/">Назад</Link>
            </div>
        </div>
    );
}

export default NotFound;