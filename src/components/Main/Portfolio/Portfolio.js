import React from "react";

function Portfolio() {
    return (
        <>
            <div className="portfolio">
                <h2 className="portfolio__title">Портфолио</h2>
                <ul className="portfolio__sites">
                    <li className="portfolio__sites_row">
                        <p className="portfolio__sites_name">
                            Статичный сайт
                        </p>
                        <a className="portfolio__sites_name-link" href="https://github.com/Light987/how-to-learn"
                           target="_blank" rel="noreferrer">
                            ↗
                        </a>
                    </li>
                    <li className="portfolio__sites_row">
                        <p className="portfolio__sites_name">
                            Адаптивный сайт
                        </p>
                        <a className="portfolio__sites_name-link" href="https://github.com/Light987/russian-travel"
                           target="_blank" rel="noreferrer">
                            ↗
                        </a>
                    </li>
                    <li className="portfolio__sites_row">
                        <p className="portfolio__sites_name">
                            Одностраничное приложение
                        </p>
                        <a className="portfolio__sites_name-link"
                           href="https://github.com/Light987/react-mesto-api-full-gha" target="_blank" rel="noreferrer">
                            ↗
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Portfolio;