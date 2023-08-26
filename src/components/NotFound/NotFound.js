import React from "react";
import {Link} from "react-router-dom";

function NotFound() {

    return (
        <section className="notfound">
            <div className="notfound__block">
                <p className="notfound__block_error-code">404</p>
                <p className="notfound__block_error-text">Страница не найдена</p>
                <Link to="/about" className="notfound__block_back" href="/">Назад</Link>
            </div>
        </section>
    );
}

export default NotFound;