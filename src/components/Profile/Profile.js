import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");


    useEffect(() => {
        setName(currentUser.name);
        setEmail(currentUser.email);
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name: name,
            email: email,
        });

        props.handleEditProfile()
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    console.log(props.isEditProfile)
    return (
        <section className="profile">
            <h1 className="profile__title">Привет, {name}</h1>
            <form className="profile__form">
                <div className="profile__container">
                    <p className="profile__container-text">Имя</p>
                    <input
                        className={`profile__container-input ${props.isEditProfile ? "profile__container-input_enabled" : ""}`}
                        onChange={handleChangeName}
                        value={name || ""}
                        autoComplete="off"
                        required
                        name="name"
                        id="name-input"
                        type="text"
                        minLength="2"
                        maxLength="30"
                        placeholder='Введите имя'/>
                </div>
                <div className="profile__container">
                    <p className="profile__container-text">E-mail</p>
                    <input
                        className={`profile__container-input ${props.isEditProfile ? "profile__container-input_enabled" : ""}`}
                        onChange={handleChangeEmail}
                        value={email || ""}
                        autoComplete="off"
                        required
                        name="email"
                        id="email-input"
                        type="text"
                        placeholder='Введите почту'/>
                </div>
                {!props.isEditProfile ? <button className="profile__container-edit" type="button"
                                                onClick={() => {
                                                    props.onEditProfile(true);
                                                }}>Редактировать
                </button> : <button className="profile__container-edit" type="button"
                                    onClick={handleSubmit}>Сохранить </button>}
            </form>
            <Link to="/" className="profile__container-logout" onClick={props.onSignout}>Выйти из аккаунта</Link>
        </section>
    );
}

export default Profile;