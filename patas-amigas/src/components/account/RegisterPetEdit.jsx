import axios from "axios";
import baseUrl from "../baseUrl";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../layout/Input";
import Textarea from "../layout/Textarea";
import Loader from "../layout/Loader";
import Button from "../layout/Button";

function RegisterPet() {
    const { id } = useParams();
    const [values, setValues] = useState({
        pet_name: "",
        race: "",
        description: "",
        url: ""
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registerClicked, setRegisterClicked] = useState(false);
    const [registering, setRegistering] = useState(false);

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const validate = async () => {
        try {
            const res = await axios.post(`${baseUrl}/update-pet-validation`, { id });
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
    });

    const getData = async () => {
        try {
            const res = await axios.post(`${baseUrl}/pet-data-edit`, { id });
            setValues({
                ...values,
                pet_name: res.data[0].pet_name,
                race: res.data[0].race,
                description: res.data[0].description,
                url: res.data[0].url
            });
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, [id]);

    const request = async (formData) => {
        try {
            setRegistering(true);
            const res = await axios.put(`${baseUrl}/update-pet`, formData);
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

    const updatePet = event => {
        event.preventDefault();
        const formData = new FormData();
        setRegisterClicked(true);
        formData.append("name", values.pet_name);
        formData.append("race", values.race);
        formData.append("description", values.description);
        formData.append("id", id);

        if (!image) {
            request(formData);
        } else {
            const urlSplit = values.url.split("/");
            const ref = urlSplit.slice(4, 7).join("/");
            formData.append("image", image);
            formData.append("image_ref", ref)
            request(formData);
        }
    }

    return (
        <main className="form-container-content">
            {loading ? (
                <div className="loader-center" style={{ height: "90vh" }}>
                    <Loader />
                </div>
            ) : (
                <>
                    <h1>
                        Altere as informações do <em>pet</em>
                    </h1>
                    <form>
                        <Input
                            type="text"
                            nameId="pet_name"
                            state={values.pet_name}
                            value={values}
                            placeholder="Digite o nome do pet"
                            setValues={setValues}
                            maxLength={120}
                        />
                        <Input
                            type="text"
                            nameId="race"
                            state={values.race}
                            value={values}
                            placeholder="Digite a raça do pet"
                            setValues={setValues}
                            maxLength={100}
                        />
                        <h2>Escreva uma breve descrição sobre o <em>pet</em></h2>
                        <br/>
                        <Textarea
                            nameId="description"
                            state={values.description}
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
                        {registerClicked && registering ? (
                            <div className="loader-center">
                                <Loader />
                            </div>
                        ) : (
                            <Button
                                onClick={updatePet}
                                content="ATUALIZAR INFORMAÇÕES"
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