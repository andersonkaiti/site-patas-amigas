import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../assets/css/doar-pets.css";
import axios from "axios";
import baseUrl from "../baseUrl";
import Input from "../layout/Input";
import Loader from "../layout/Loader";
import Button from "../layout/Button";

const validateEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
);

const validatePassword = new RegExp(
    "^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$"
);

const validatePhone = new RegExp(
    "^[0-9]{8,}(?:[-()][0-9]+)*$"
);

function Register() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
    });

    const navigate = useNavigate();

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
    const [registerClicked, setRegisterClicked] = useState(false);
    const [registering, setRegistering] = useState(false);

    const validate = () => {
        if (!validateEmail.test(values.email)) {
            setEmailError(true);
            return false;
        } else {
            setEmailError(false);
        }

        if (!validatePassword.test(values.password)) {
            setPasswordError(true);
            return false;
        } else {
            setPasswordError(false);
        }

        if (values.password !== values.confirmPassword) {
            setConfirmPasswordError(true);
            return false;
        } else {
            setConfirmPasswordError(false);
        }

        if (!validatePhone.test(values.phone)) {
            setPhoneError(true);
            return false;
        } else {
            setPhoneError(false);
        }

        return true;
    }

    const register = async (event) => {
        validate(event);
        const isValid = validate();
        event.preventDefault();
        setRegisterClicked(true);
        if(isValid) {
            setRegistering(true);
            try {
                const res = await axios.post(`${baseUrl}/register`, values);
                if (res.data.status === "success") {
                    navigate("/login");
                }
                if (res.data.status === "error") {
                    setEmailAlreadyExists(true);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setRegistering(false);
            }
        }
    }

    const errorStyle = {
        fontSize: ".8em",
        color: "#f00",
        marginTop: "-2em",
        marginBottom: ".5em",
        fontWeight: "bold"
    }

    return (
        <main>
            <div className="form-container-content">
                <h1>Registre-se antes de doar um <em>pet</em></h1>
                <form onSubmit={register}>
                    <Input
                        type="text"
                        nameId="name"
                        value={values}
                        placeholder="Digite o seu nome"
                        setValues={setValues}
                        maxLength={120}
                    />
                    <Input
                        type="text"
                        nameId="email"
                        value={values}
                        placeholder="Digite o seu e-mail"
                        setValues={setValues}
                        maxLength={50}
                    />
                    {emailAlreadyExists && (
                        <p style={errorStyle}>O <em>e-mail</em> já está sendo utilizado</p>
                    )}
                    {emailError && (
                        <p style={errorStyle}>Digite um e-mail válido</p>
                    )}
                    <Input
                        type="password"
                        nameId="password"
                        value={values}
                        placeholder="Digite a sua senha"
                        setValues={setValues}
                        maxLength={255}
                    />
                    {passwordError && (
                        <p style={errorStyle}>Digite uma senha válida (mínimo de 6 caracteres, 1 letra e 1 número)</p>
                    )}
                    <Input
                        type="password"
                        nameId="confirmPassword"
                        value={values}
                        placeholder="Digite a sua senha novamente"
                        setValues={setValues}
                        maxLength={255}
                    />
                    {confirmPasswordError && (
                        <p style={errorStyle}>As senhas não coincidem</p>
                    )}
                    <Input
                        type="text"
                        nameId="phone"
                        value={values}
                        placeholder="Digite o seu número de telefone"
                        setValues={setValues}
                        maxLength={15}
                    />
                    {phoneError && (
                        <p style={errorStyle}>Digite um número de telefone válido</p>
                    )}
                    {registerClicked && registering ? (
                        <div className="loader-center">
                            <Loader />
                        </div>
                    ) : (
                        <Button
                            content="CADASTRAR"
                            width="100%"
                        />
                    )}
                </form>
                <div className="form-toggle">
                    <p>Já possui conta? </p>
                    <Link to="/login" className="button-form-toggle">Logar</Link>
                </div>
            </div>
        </main>
    );
}

export default Register;