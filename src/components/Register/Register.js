import {useState} from "react";
import {Link} from "react-router-dom";
import logo from "../../images/logo.svg";

function Register(props) {
    const [regFormValue, setRegFormValue] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (evt) => {
        const {name, value} = evt.target;

        setRegFormValue({
            ...regFormValue,
            [name]: value,
        });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onRegister(regFormValue);
    };

    return (
        <div className="register">
            <div className="register__block">
                <Link to="/">
                    <img className="register__block-logo" src={logo} alt="Обозреватель фильмов"></img>
                </Link>
                <h1 className="register__block-title">Добро пожаловать!</h1>
                <form onSubmit={handleSubmit}>
                    <p className="register__block-text">Имя</p>
                    <input className="register__block-input"
                           name="name"
                           type="name"
                           autoComplete="off"
                           required
                           value={regFormValue.name || ""}
                           onChange={handleChange}
                           minLength="2"
                           maxLength="30"
                           placeholder='Введите имя'></input>
                    <p className="register__block-text">E-mail</p>
                    <input className="register__block-input"
                           name="email"
                           type="email"
                           autoComplete="off"
                           required
                           value={regFormValue.email || ""}
                           onChange={handleChange}
                           placeholder='Введите email'/>
                    <p className="register__block-text">Пароль</p>
                    <input className={`register__block-input ${props.isSuccess ? "register__block-input_error" : ""}`}
                           name="password"
                           type="password"
                           autoComplete="off"
                           required
                           value={regFormValue.password || ""}
                           onChange={handleChange}
                           placeholder='Введите пароль'/>
                    <span
                        className={`register__block-error ${props.isSuccess ? "register__block-error_open" : ""}`}>{props.isError}</span>
                    <button className="register__block-button" type="submit">Зарегистрироваться</button>
                </form>
                <div className="register__registration-block">
                    <p className="register__block-registration-q">Уже зарегистрированы?</p>
                    <Link to="/signin" className="register__block-registration register__block-registration_link">
                        Войти
                    </Link>
                </div>
            </div>
        </div>);
}

export default Register;