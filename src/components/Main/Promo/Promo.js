import React from "react";
import landing_logo from "../../../images/landing-logo.svg";

function Promo() {
    return (
        <>
            <div className="promo">
                <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
                <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <a href="/movies" className="promo__link">Узнать больше</a>
                <img className="promo__logo" src={landing_logo} alt="Web"></img>
            </div>
        </>
    )
}

export default Promo;