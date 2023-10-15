import {useState} from "react";
import logo from "../../images/logo.svg";
import {Link, useLocation} from "react-router-dom";


function Login(props) {
    const {pathname} = useLocation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    function handleEmailChange(e) {
        const input = e.target;
        setEmail(input.value);
        const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
            input.value
        );
        setIsValidEmail(validEmail);
        if (!validEmail) {
            setEmailError('Неверный формат почты')
        } else {
            setEmailError('');
        }
    }

    function handlePasswordChange(e) {
        const input = e.target;
        setPassword(input.value);
        setIsValidPassword(input.validity.valid);
        if (!isValidPassword) {
            setPasswordError(input.validationMessage)
        } else {
            setPasswordError('');
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.onLogin({
            email: email,
            password: password,
        });
    };

    console.log(passwordError)


    return (
        <section className="login">
            <div className="login__block">
                <Link to="/">
                    <img className="login__block-logo" src={logo}
                         alt="Обозреватель фильмов"></img>
                </Link>
                <h1 className="login__block-title">Рады видеть!</h1>
                <form onSubmit={handleSubmit}>
                    <p className="login__block-email">E-mail</p>
                    <input className="login__block-input"
                           name="email"
                           type="email"
                           autoComplete="off"
                           required
                           value={email || ""}
                           onChange={handleEmailChange}
                           placeholder='Введите email'/>
                    <span
                        className={`login__block-error ${emailError ? "login__block-error_open" : ""}`}>{emailError}</span>
                    <p className="login__block-email">Пароль</p>
                    <input className="login__block-input"
                           name="password"
                           type="password"
                           autoComplete="off"
                           required
                           value={password || ""}
                           onChange={handlePasswordChange}
                           placeholder='Введите пароль'/>
                    <span
                        className={`login__block-error ${passwordError ? "login__block-error_open" : ""}`}>{passwordError}</span>
                    <button
                        className={`login__block-button ${(isValidPassword && isValidEmail) ? '' : "login__block-button_disable"}`}
                        type="submit" disabled={!isValidPassword}>Войти
                    </button>
                </form>
                <div className="login__registration-block">
                    <p className="login__block-registration-q">Ещё не
                        зарегистрированы?</p>
                    {pathname === "/signin" && (
                        <Link to="/signup"
                              className="login__block-registration login__block-registration_link">
                            Регистрация
                        </Link>
                    )}
                </div>
            </div>
        </section>);
}

export default Login;