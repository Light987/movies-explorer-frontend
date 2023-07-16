import React from "react";

function Portfolio() {
    return (
        <section className="portfolio-background">
            <div className="portfolio">
                <h2 className="portfolio__title">Портфолио</h2>
                <ul className="portfolio__sites">
                    <li className="portfolio__row-sites">
                        <p className="portfolio__name-sites">
                            Статичный сайт
                        </p>
                        <a className=" portfolio__link-sites" href="https://github.com/Light987/how-to-learn"
                           target="_blank" rel="noreferrer">
                            ↗
                        </a>
                    </li>
                    <li className="portfolio__row-sites">
                        <p className="portfolio__name-sites">
                            Адаптивный сайт
                        </p>
                        <a className="portfolio__link-sites" href="https://github.com/Light987/russian-travel"
                           target="_blank" rel="noreferrer">
                            ↗
                        </a>
                    </li>
                    <li className="portfolio__row-sites">
                        <p className="portfolio__name-sites">
                            Одностраничное приложение
                        </p>
                        <a className="portfolio__link-sites"
                           href="https://github.com/Light987/react-mesto-api-full-gha" target="_blank" rel="noreferrer">
                            ↗
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Portfolio;