import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../baseUrl";
import Button from "../layout/Button";
import Modal from "../layout/Modal";

function MyPets({ imgUrl, name, race, petId }) {
    axios.defaults.withCredentials = true;

    const navigate = useNavigate();

    const validate = async () => {
        try {
            const res = await axios.get(`${baseUrl}/doar-pet`);
            if (res.data.status === "unauthorized") {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            console.error(error);
        }
    }

    const deletePet = async (event) => {
        event.preventDefault();
        const value = await validate();

        if (!value) {
            navigate("/account");
            location.reload(true);
        }

        try {
            const urlSplit = imgUrl.split("/");
            const ref = urlSplit.slice(4, 7).join("/");
            const res = await axios.post(`${baseUrl}/delete-pet`, {
                id: petId,
                image_ref: ref
            });
            if (res.data.status === "success") {
                location.reload(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="pet-container">
            <div className="pet-option">
                <div className="pet-option-img">
                    <img src={imgUrl} alt="pet" />
                </div>
                <div className="pet-option-info">
                    <p className="info-title">Nome</p>
                    <p>{name}</p>
                    <p className="info-title">Raça</p>
                    <p>{race}</p>
                    <Link to={`/pet-edit/${petId}`}>
                        <Button
                            content="EDITAR"
                            width="100%"
                        />
                    </Link>
                    <br />
                    <Modal
                        onClick={deletePet}
                        content="DELETAR PET"
                        modalText="Tem certeza de que deseja deletar o registro do pet?"
                        modalButtonText="DELETAR"
                    />
                </div>
            </div>
        </div>
    )
}

export default MyPets;