import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../baseUrl";
import Input from "../layout/Input";
import Button from "../layout/Button";

function Login() {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const [wrongCredentials, setWrongCredentials] = useState(false);

    axios.defaults.withCredentials = true;

    const login = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${baseUrl}/login`, values);
            if (res.data.status === "success") {
                setWrongCredentials(false);
                navigate("/account");
                location.reload(true);
            }
            if (res.data.status === "unauthorized") {
                setWrongCredentials(true);
            }
        } catch (error) {
            console.error(error);
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
                <h1>Entre na conta para registrar o <em>pet</em></h1>
                <form onSubmit={login}>
                    <Input
                        type="text"
                        nameId="email"
                        value={values}
                        placeholder="Digite o seu e-mail"
                        setValues={setValues}
                    />
                    <Input
                        type="password"
                        nameId="password"
                        value={values}
                        placeholder="Digite a sua senha"
                        setValues={setValues}
                    />
                    {wrongCredentials && (
                        <p style={errorStyle}>O <em>e-mail</em> ou senha estão errados</p>
                    )}
                    <Button
                        content="ENTRAR NA CONTA"
                        width="100%"
                    />
                    <br/>
                    <br/>
                </form>
                <div className="form-toggle">
                    <p>Não possui conta? </p>
                    <Link to="/register" className="button-form-toggle">Registrar</Link>
                </div>
            </div>
        </main>
    )
}

export default Login;