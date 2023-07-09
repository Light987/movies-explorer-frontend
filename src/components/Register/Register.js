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
                    <img className="register__block_logo" src={logo} alt="Обозреватель фильмов"></img>
                </Link>
                <h1 className="register__block_title">Добро пожаловать!</h1>
                <form onSubmit={handleSubmit}>
                    <p className="register__block_text">Имя</p>
                    <input className="register__block_input"
                           name="name"
                           type="name"
                           autoComplete="off"
                           required
                           value={regFormValue.name || ""}
                           onChange={handleChange}
                           minLength="2"
                           maxLength="30"></input>
                    <p className="register__block_text">E-mail</p>
                    <input className="register__block_input"
                           name="email"
                           type="email"
                           autoComplete="off"
                           required
                           value={regFormValue.email || ""}
                           onChange={handleChange}/>
                    <p className="register__block_text">Пароль</p>
                    <input className="register__block_input"
                           name="password"
                           type="password"
                           autoComplete="off"
                           required
                           value={regFormValue.password || ""}
                           onChange={handleChange}/>
                    <span
                        className={`register__block_error ${props.isSuccess ? "register__block_error-open" : ""}`}>{props.isError}</span>
                    <button className="register__block_button" type="submit">Зарегистрироваться</button>
                </form>
                <div className="register__block_registration">
                    <p className="register__block_registration-q">Ещё не зарегистрированы?</p>
                    <Link to="/signin" className="register__block_registration-link">
                        Войти
                    </Link>
                </div>
            </div>
        </div>);
}

export default Register;