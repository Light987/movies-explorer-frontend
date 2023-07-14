import Promo from "../Main/Promo/Promo"
import AboutProject from "../Main/AboutProject/AboutProject"
import Techs from "../Main/Techs/Techs"
import AboutMe from "../Main/AboutMe/AboutMe"
import Portfolio from "../Main/Portfolio/Portfolio"
import Header from "../Header/Header";
import React from "react";

function Main(props) {
    return (
        <main className="main">
            <Header onBurgerMenu={props.onBurgerMenu} width={props.width}/>
            <Promo/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Portfolio/>
        </main>
    )
}

export default Main;