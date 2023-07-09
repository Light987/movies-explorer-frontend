import React from "react";

function Header() {

    return (
        <footer className="footer">
            <p className="footer__up">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__down">
                <p className="footer__down_copyright">
                    &copy; {new Date().getFullYear()}
                </p>
                <div className="footer__down_copyright-links">
                    <a href="https://practicum.yandex.ru/" className="footer__down_copyright-link footer__down_copyright-link_praktikum">Яндекс.Практикум</a>
                    <a href="https://github.com/" className="footer__down_copyright-link">Github</a>
                </div>
            </div>
        </footer>
    );
}

export default Header;