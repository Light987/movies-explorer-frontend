import {useState} from "react";
import logo from "../../images/logo.svg";
import {Link, useLocation} from "react-router-dom";


function Login(props) {
    const {pathname} = useLocation();

    const [formValue, setFormValue] = useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onLogin(formValue);
    };

    return (
        <section className="login">
            <div className="login__block">
                <Link to="/about">
                    <img className="login__block-logo" src={logo} alt="Обозреватель фильмов"></img>
                </Link>
                <h1 className="login__block-title">Рады видеть!</h1>
                <form onSubmit={handleSubmit}>
                    <p className="login__block-email">E-mail</p>
                    <input className="login__block-input"
                           name="email"
                           type="email"
                           autoComplete="off"
                           required
                           value={formValue.email || ""}
                           onChange={handleChange}
                           placeholder='Введите email'/>
                    <p className="login__block-email">Пароль</p>
                    <input className="login__block-input"
                           name="password"
                           type="password"
                           autoComplete="off"
                           required
                           value={formValue.password || ""}
                           onChange={handleChange}
                           placeholder='Введите пароль'/>
                    <button className="login__block-button" type="submit">Войти</button>
                </form>
                <div className="login__registration-block">
                    <p className="login__block-registration-q">Ещё не зарегистрированы?</p>
                    {pathname === "/signin" && (
                        <Link to="/signup" className="login__block-registration login__block-registration_link">
                            Регистрация
                        </Link>
                    )}
                </div>
            </div>
        </section>);
}

export default Login;