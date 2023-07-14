import React from "react";
import search from "../../images/search.svg";
import point from "../../images/point.svg";

function SearchForm(props) {

    return (
        <section className="background-search-form">
            <div className="search-form">
                <form className="search-form__search" autoComplete='off' onSubmit={props.handleSubmit}>
                    <input type="search" name='search' className="search-form__search-input"
                           placeholder="Фильм"></input>
                    <button className="search-form__search-button" type='submit'>
                        <img className="search-form__button-search search-form__button-search_img" src={search}
                             alt="Поиск">
                        </img>
                    </button>
                </form>

                <div className="search-form__filter">
                    <img src={point} alt="Индикатор" className="search-form__filter-img"></img>
                    <p className="search-form__filter-text">Короткометражки</p>
                </div>
            </div>
        </section>
    );
}

export default SearchForm;