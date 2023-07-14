import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";

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
    }

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    return (
        <>
            <Header onBurgerMenu={props.onBurgerMenu} width={props.width}/>
            <div className="profile">
                <h1 className="profile__title">Привет, {name}</h1>
                <form className="profile__form" onSubmit={handleSubmit}>
                    <div className="profile__container">
                        <p className="profile__container-text">Имя</p>
                        <input className="profile__container-input"
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
                        <input className="profile__container-input"
                               onChange={handleChangeEmail}
                               value={email || ""}
                               autoComplete="off"
                               required
                               name="email"
                               id="email-input"
                               type="text"
                               placeholder='Введите почту'/>
                    </div>
                    <button className="profile__container-edit" type="submit">Редактировать</button>
                </form>
                <Link to="/" className="profile__container-logout" onClick={props.onSignout}>Выйти из аккаунта</Link>
            </div>
        </>
    );
}

export default Profile;