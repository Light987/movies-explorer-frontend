import React from "react";

function AboutProject() {
    return (
        <>
            <div className="aboutproject">
                <h2 className="aboutproject__title">О проекте</h2>
                <ul className="aboutproject__info">
                    <li className="aboutproject__info-text">
                        Дипломный проект включал 5 этапов
                    </li>

                    <li className="aboutproject__info-text">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
                        доработки.
                    </li>

                    <li className="aboutproject__info-text">
                        На выполнение диплома ушло 5 недель
                    </li>

                    <li className="aboutproject__info-text">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно
                        защититься.
                    </li>
                </ul>

                <ul className="aboutproject__progress">
                    <li className="aboutproject__progress-text">
                        1 неделя
                    </li>

                    <li className="aboutproject__progress-text">
                        Back-end
                    </li>

                    <li className="aboutproject__progress-text">
                        4 недели
                    </li>

                    <li className="aboutproject__progress-text">
                        Front-end
                    </li>
                </ul>
            </div>
        </>
    )
}

export default AboutProject;