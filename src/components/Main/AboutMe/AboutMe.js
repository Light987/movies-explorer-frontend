import React from "react";
import photo_me from "../../../images/me.jpeg";

function AboutMe() {
    return (
        <section className="about-me-background">
            <div className="about-me">
                <h2 className="about-me__title">Студент</h2>
                <div className="about-me__content">
                    <p className="about-me__name">Денис</p>
                    <p className="about-me__about">Фронтенд-разработчик, {new Date().getFullYear() - 1987} лет</p>
                    <p className="about-me__text">Я родился и живу в Хабаровске, закончил педагогический колледж. Я люблю
                        слушать музыку, а ещё увлекаюсь 3D моделированием. Кодить начал года 3 назад. С 2022 года
                        работаю Ведущим аналитиком. После того, как прошёл курс по веб-разработке, начал начал
                        разработку своего проекта.</p>
                    <a href="https://github.com/Light987" className="about-me__link" target="_blank" rel="noreferrer">Github</a>
                    <img className="about-me__img" src={photo_me} alt="Я"></img>
                </div>
            </div>
        </section>
    )
}

export default AboutMe;