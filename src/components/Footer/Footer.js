import React from "react";

function Header() {

    return (
        <footer className="footer-background">
            <div className="footer">
                <h2 className="footer__up">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
                <div className="footer__down">
                    <p className="footer__down-copyright">
                        &copy; {new Date().getFullYear()}
                    </p>
                    <div className="footer__copyright-links">
                        <a href="https://practicum.yandex.ru/"
                           className="footer__copyright-link footer__copyright-link_praktikum">Яндекс.Практикум</a>
                        <a href="https://github.com/" className="footer__copyright-link">Github</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Header;