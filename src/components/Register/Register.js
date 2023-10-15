import {useState} from "react";
import {Link} from "react-router-dom";
import logo from "../../images/logo.svg";

function Register(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidName, setIsValidName] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');

    function handleNameChange(e) {
        const input = e.target;
        const validName = /^[a-zA-Zа-яА-Я- ]+$/.test(input.value);
        setIsValidName(validName);
        if (input.value.length < 1) {
            setNameError("Вы пропустили это поле");
        } else if (input.value.length < 2) {
            setNameError("Длина имени должна быть не менее 2 символов");
        } else if (!validName) {
            setNameError("Имя может содержать только буквы, пробел или дефис");
        } else {
            setNameError("");
        }
        setName(input.value);
    }

    function handleEmailChange(e) {
        const input = e.target;
        const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
            input.value
        );
        setEmail(input.value);
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
        props.onRegister({
            name: name,
            email: email,
            password: password,
        });
    };

    return (
        <section className="register">
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
                           value={name || ""}
                           onChange={handleNameChange}
                           minLength="2"
                           maxLength="30"
                           placeholder='Введите имя'></input>
                    <span
                        className={`register__block-error ${nameError ? "register__block-error_open" : ""}`}>{nameError}</span>
                    <p className="register__block-text">E-mail</p>
                    <input className="register__block-input"
                           name="email"
                           type="email"
                           autoComplete="off"
                           required
                           value={email || ""}
                           onChange={handleEmailChange}
                           placeholder='Введите email'/>
                    <span
                        className={`register__block-error ${emailError ? "register__block-error_open" : ""}`}>{emailError}</span>
                    <p className="register__block-text">Пароль</p>
                    <input className={`register__block-input ${props.isSuccess ? "register__block-input_error" : ""}`}
                           name="password"
                           type="password"
                           autoComplete="off"
                           required
                           value={password || ""}
                           onChange={handlePasswordChange}
                           placeholder='Введите пароль'/>
                    <span
                        className={`register__block-error ${passwordError ? "register__block-error_open" : ""}`}>{passwordError}</span>
                    <button
                        className={`register__block-button ${(isValidEmail && isValidPassword && isValidName) ? '' : "register__block-button_disable"}`}
                        type="submit" disabled={!(isValidEmail && isValidPassword && isValidName)}>Зарегистрироваться
                    </button>
                </form>
                <div className="register__registration-block">
                    <p className="register__block-registration-q">Уже зарегистрированы?</p>
                    <Link to="/signin" className="register__block-registration register__block-registration_link">
                        Войти
                    </Link>
                </div>
            </div>
        </section>);
}

export default Register;