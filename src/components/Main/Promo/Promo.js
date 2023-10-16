import React from "react";
import landing_logo from "../../../images/landing-logo.svg";
import {Link} from "react-router-dom";

function Promo() {
    return (
        <section className="promo-background">
            <div className="promo">
                <div className="promo-text">
                    <h1 className="promo-title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
                    <p className="promo-subtitle">Листайте ниже, чтобы узнать больше про этот проект и его
                        создателя.</p>
                    <Link to="/movies" className="promo-link">Узнать больше</Link>
                </div>
                <img className="promo-logo" src={landing_logo} alt="Web"></img>
            </div>
        </section>
    )
}

export default Promo;