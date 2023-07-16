import React from "react";

function Techs() {
    return (
        <section className="techs-background">
            <div className="techs">
                <h2 className="techs__title-main">Технологии</h2>
                <p className="techs__title">7 технологий</p>
                <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в
                    дипломном
                    проекте.</p>

                <ul className="techs__learn">
                    <li className="techs__learn-text">
                        HTML
                    </li>

                    <li className="techs__learn-text">
                        CSS
                    </li>

                    <li className="techs__learn-text">
                        JS
                    </li>

                    <li className="techs__learn-text">
                        React
                    </li>

                    <li className="techs__learn-text">
                        Git
                    </li>

                    <li className="techs__learn-text">
                        Express.js
                    </li>

                    <li className="techs__learn-text">
                        mongoDB
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Techs;