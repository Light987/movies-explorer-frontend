import React from "react";
import search from "../../images/search.svg";

function SearchForm(props) {

    const handleChangeChk = () => props.setIsShortMovies(!props.isShortMovies)

    function handleSubmit(e) {
        e.preventDefault();
        props.setLoading(true)
        props.handleSearchMovie({valueSearch: e.target.search.value, valueCheckbox: props.isShortMovies});
    }

    return (
        <section className="background-search-form">
            <div className="search-form">
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <div className="search-form__search">
                        <input type="search" name='search' className="search-form__search-input"
                               placeholder={`${props.isSuccessInput ? props.isErrorInput : "Фильм"}`}></input>
                        <button className="search-form__search-button" type='submit'>
                            <img className="search-form__button-search search-form__button-search_img" src={search}
                                 alt="Поиск">
                            </img>
                        </button>
                    </div>
                    <label className="search-form__filter">
                        <div className="search-form__filter-inner"></div>
                        <input type="checkbox" className="search-form__filter-checkbox"
                               onChange={handleChangeChk} checked={props.isShortMovies}></input>
                        <span className="search-form__filter-text">Короткометражки</span>
                    </label>
                </form>
            </div>
        </section>
    );
}

export default SearchForm;