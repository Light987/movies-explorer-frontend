import React from "react";

function AboutProject() {
    return (
        <section className="about-project-background">
            <div className="about-project">
                <h2 className="about-project__title">О проекте</h2>
                <ul className="about-project__info">
                    <li className="about-project__info-content">
                        <p className="about-project__text-title">Дипломный проект включал 5 этапов</p>
                        <p className="about-project__text-about"> Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
                            доработки.</p>
                    </li>

                    <li className="about-project__info-content">
                        <p className="about-project__text-title">На выполнение диплома ушло 5 недель</p>
                        <p className="about-project__text-about">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно
                        защититься.</p>
                    </li>
                </ul>

                <ul className="about-project__progress">
                    <li className="about-project__progress-text">
                        1 неделя
                    </li>

                    <li className="about-project__progress-text">
                        Back-end
                    </li>

                    <li className="about-project__progress-text">
                        4 недели
                    </li>

                    <li className="about-project__progress-text">
                        Front-end
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default AboutProject;