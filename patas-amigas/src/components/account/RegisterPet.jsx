import axios from "axios";
import baseUrl from "../baseUrl";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Input from "../layout/Input";
import Textarea from "../layout/Textarea";
import Loader from "../layout/Loader";
import Button from "../layout/Button";

function RegisterPet() {
    const { id } = useParams();
    const [values, setValues] = useState({
        name: "",
        race: "",
        description: "",
        url: ""
    });
    const [image, setImage] = useState(null);
    const [imageInvalid, setImageInvalid] = useState(false);
    const [loading, setLoading] = useState(true);
    const [registerClicked, setRegisterClicked] = useState(false);
    const [registering, setRegistering] = useState(false);

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const validate = async () => {
        try {
            const res = await axios.post(`${baseUrl}/register-pet-validation`, { id });
            if (res.data.status === "unauthorized") {
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

    const registerPet = async (event) => {
        try {
            event.preventDefault();
            setRegisterClicked(true);

            if (image == null) {
                setImageInvalid(true);
                setRegisterClicked(false);
                return;
            }

            setImageInvalid(false);
            setRegistering(true);

            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("race", values.race);
            formData.append("description", values.description);
            formData.append("id", id);
            formData.append("image", image);

            const res = await axios.post(`${baseUrl}/register-pet`, formData);

            if (res.data.status === "success") {
                navigate("/account");
                location.reload(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setRegistering(false);
        }
    }

    const errorStyle = {
        color: "#f00",
        display: "inline",
        marginLeft: "1em",
        fontWeight: "bold"
    }

    return (
        <main className="form-container-content">
            {loading ? (
                <div style={{ height: "90vh", width: "calc(100% - 100px)" }}>
                    <Loader />
                </div>
            ) : (
                <>
                    <h1>
                        Preencha os campos abaixo para anunciar a doação do pet
                    </h1>
                    <form onSubmit={registerPet}>
                        <Input
                            type="text"
                            nameId="name"
                            value={values}
                            placeholder="Digite o nome do pet"
                            setValues={setValues}
                            maxLength={120}
                        />
                        <Input
                            type="text"
                            nameId="race"
                            value={values}
                            placeholder="Digite a raça do pet"
                            setValues={setValues}
                            maxLength={100}
                        />
                        <h2>Escreva uma breve descrição sobre o <em>pet</em></h2>
                        <br />
                        <Textarea
                            nameId="description"
                            value={values}
                            setValues={setValues}
                        />
                        <label className="input-file" htmlFor="file">SELECIONE UMA IMAGEM DO PET</label>
                        <input
                            type="file"
                            id="file"
                            onChange={e => {
                                setImage(e.target.files[0]);
                            }}
                        />
                        {imageInvalid && (
                            <p style={errorStyle}>Insira uma imagem</p>
                        )}
                        {registerClicked && registering ? (
                            <div className="loader-center">
                                <Loader />
                            </div>
                        ) : (
                            <Button
                                content="CADASTRAR PET"
                                width="100%"
                            />
                        )}
                    </form>
                </>
            )}
        </main>
    )
}

export default RegisterPet;