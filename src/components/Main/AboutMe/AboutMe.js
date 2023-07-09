import React from "react";
import photo_me from "../../../images/me.jpeg";

function AboutMe() {
    return (
        <>
            <div className="aboutme">
                <h2 className="aboutme__title">Студент</h2>
                <div className="aboutme__content">
                    <p className="aboutme__name">Денис</p>
                    <p className="aboutme__about">Фронтенд-разработчик, {new Date().getFullYear() - 1987} лет</p>
                    <p className="aboutme__text">Я родился и живу в Хабаровске, закончил педагогический колледж. Я люблю
                        слушать музыку, а ещё увлекаюсь 3D моделированием. Кодить начал года 3 назад. С 2022 года
                        работаю Ведущим аналитиком. После того, как прошёл курс по веб-разработке, начал начал
                        разработку своего проекта.</p>
                    <a href="https://github.com/Light987" className="aboutme__link" target="_blank" rel="noreferrer">Github</a>
                    <img className="aboutme__img" src={photo_me} alt="Я"></img>
                </div>
            </div>
        </>
    )
}

export default AboutMe;