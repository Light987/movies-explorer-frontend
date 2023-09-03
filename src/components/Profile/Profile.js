import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [formValue, setFormValue] = useState({
        name: "",
        email: "",
    });

    useEffect(() => {
        setFormValue({
            name: currentUser.name,
            email: currentUser.email
        })
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();

        if ((currentUser.name !== formValue.name) || (currentUser.email !== formValue.email)) {
            props.onUpdateUser({
                name: formValue.name,
                email: formValue.email,
            });

            props.setUpdateProf(true)
            props.handleEditProfile(changeValue)
        } else {
            props.handleEditProfile(changeValue)
            props.setUpdateProf(false)
        }
    }

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });

    };

    const changeValue = ((formValue.name === currentUser.name) && (formValue.email === currentUser.email))

    return (
        <section className="profile">
            <h1 className="profile__title">Привет, {formValue.name}</h1>
            <form className="profile__form">
                <div className="profile__container">
                    <p className="profile__container-text">Имя</p>
                    <input
                        className={`profile__container-input ${props.isEditProfile ? "profile__container-input_enabled" : ""}`}
                        onChange={handleChange}
                        value={formValue.name || ""}
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
                        onChange={handleChange}
                        value={formValue.email || ""}
                        autoComplete="off"
                        required
                        name="email"
                        id="email-input"
                        type="text"
                        placeholder='Введите почту'/>
                </div>
                {!props.isEditProfile ?
                    <button className="profile__container-edit" type="button"
                            onClick={() => {
                                props.onEditProfile(true);
                            }}>Редактировать </button>
                    :
                    <button className={`profile__container-edit ${props.onUpdateProf ? "profile__container-edit_update" : ""}`} type="button"
                            onClick={handleSubmit}>{props.onUpdateProf ? 'Обновлено' : changeValue ? 'Закрыть' : 'Сохранить'}</button>}
            </form>
            <Link to="/about" className="profile__container-logout" onClick={props.onSignout}>Выйти из аккаунта</Link>
        </section>
    );
}

export default Profile;