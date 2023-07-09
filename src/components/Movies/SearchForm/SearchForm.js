import React from "react";
import search from "../../../images/search.svg";
import point from "../../../images/point.svg";

function SearchForm(props) {

    return (
        <div className="searchform">
            <form className="searchform__search" autoComplete='off' onSubmit={props.handleSubmit}>
                <input type="search" name='search' className="searchform__search-input" placeholder="Фильм" ></input>
                <button className="searchform__search-button">
                    <img className="searchform__search-button_img" src={search} alt="Поиск">
                    </img>
                </button>
            </form>

            <div className="searchform__filter">
                <img src={point} alt="Индикатор" className="searchform__filter-img"></img>
                <p className="searchform__filter-text">Короткометражки</p>
            </div>
        </div>
    );
}

export default SearchForm;