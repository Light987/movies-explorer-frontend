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

    return (<div className="login">
        <div className="login__block">
            <Link to="/">
                <img className="login__block_logo" src={logo} alt="Обозреватель фильмов"></img>
            </Link>
            <h1 className="login__block_title">Рады видеть!</h1>
            <form onSubmit={handleSubmit}>
                <p className="login__block_email">E-mail</p>
                <input className="login__block_input"
                       name="email"
                       type="email"
                       autoComplete="off"
                       required
                       value={formValue.email || ""}
                       onChange={handleChange}/>
                <p className="login__block_email">Пароль</p>
                <input className="login__block_input"
                       name="password"
                       type="password"
                       autoComplete="off"
                       required
                       value={formValue.password || ""}
                       onChange={handleChange}/>
                <button className="login__block_button" type="submit">Войти</button>
            </form>
            <div className="login__block_registration">
                <p className="login__block_registration-q">Ещё не зарегистрированы?</p>
                {pathname === "/signin" && (
                    <Link to="/signup" className="login__block_registration-link">
                        Регистрация
                    </Link>
                )}
            </div>
        </div>
    </div>);
}

export default Login;