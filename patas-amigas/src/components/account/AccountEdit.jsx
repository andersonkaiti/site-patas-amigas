import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../assets/css/doar-pets.css";
import axios from "axios";
import baseUrl from "../baseUrl";
import Input from "../layout/Input";
import Loader from "../layout/Loader";
import Modal from "../layout/Modal";
import Button from "../layout/Button";

const validatePhone = new RegExp(
    "^[0-9]{8,}(?:[-()][0-9]+)*$"
);

function AccountEdit() {
    const { id } = useParams();
    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [phoneError, setPhoneError] = useState(false);

    axios.defaults.withCredentials = true;

    const validate = async () => {
        try {
            const res = await axios.post(`${baseUrl}/register-pet-validation`, { id });
            if (res.data.status !== "success") {
                navigate("/account");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        validate();
    }, []);

    const validateForm = () => {
        if (!validatePhone.test(values.phone)) {
            setPhoneError(true);
            return false;
        } else {
            setPhoneError(false);
        }

        return true;
    }

    const getDataUser = async () => {
        try {
            const res = await axios.post(`${baseUrl}/user-data`, { id });
            setValues({
                ...values,
                name: res.data[0].name,
                email: res.data[0].email,
                phone: res.data[0].phone
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getDataUser();
    }, []);

    const updateDataUser = async (event) => {
        event.preventDefault();
        validateForm(event);
        const isValid = await validateForm();
        if (isValid) {
            try {
                const res = await axios.put(`${baseUrl}/update-user`, {
                    name: values.name,
                    phone: values.phone,
                    id
                });
                if (res.data.status === "success") {
                    navigate("/account");
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    const validateAccount = async () => {
        try {
            const res = await axios.post(`${baseUrl}/register-pet-validation`);
            if (res.data.status === "unauthorized") {
                return true;
            } else {
                return true;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const deleteUser = async (event) => {
        event.preventDefault();
        const value = await validateAccount();

        if (value) {
            navigate("/account");
            location.reload(true);
        }

        try {
            const res = await axios.post(`${baseUrl}/delete-user`);
            if (res.data.status === "success") {
                navigate("/account");
                location.reload(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const errorStyle = {
        fontSize: ".8em",
        color: "#f00",
        marginTop: "-2em"
    }

    const title = {
        fontSize: ".8em",
        color: "#767676"
    }

    return (
        <main>
            {loading ? (
                <div className="loader-center" style={{ height: "90vh" }}>
                    <Loader />
                </div>
            ) : (
                <div className="form-container-content">
                    <h1>Atualize a sua conta</h1>
                    <form>
                        <br />
                        <p style={title}><em>E-mail</em></p>
                        <p>{values.email}</p>
                        <br />
                        <Input
                            type="text"
                            nameId="name"
                            state={values.name}
                            value={values}
                            placeholder="Digite o seu nome"
                            setValues={setValues}
                        />
                        <Input
                            type="text"
                            nameId="phone"
                            state={values.phone}
                            value={values}
                            placeholder="Digite o seu número de telefone"
                            setValues={setValues}
                        />
                        {phoneError && (
                            <p style={errorStyle}>Digite um número de telefone válido</p>
                        )}
                        <Button
                            onClick={updateDataUser}
                            content="ATUALIZAR"
                            width="100%"
                        />
                    </form>
                    <div style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "flex-end"
                    }}>
                        <Modal
                            onClick={deleteUser}
                            content="DELETAR CONTA"
                            modalText="Tem certeza de que deseja deletar a sua conta?"
                            modalButtonText="DELETAR"
                        />
                    </div>
                </div>
            )
            }
        </main>
    );
}

export default AccountEdit;