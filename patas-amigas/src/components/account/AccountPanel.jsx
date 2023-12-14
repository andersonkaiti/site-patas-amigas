import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import baseUrl from "../baseUrl";
import MyPets from "./MyPets";
import Loader from "../layout/Loader";
import Button from "../layout/Button";
import Modal from "../layout/Modal";

function AccountPanel({ idDoador }) {
    const [petsData, setPetsData] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    
    axios.defaults.withCredentials = true;

    const getDataUser = async () => {
        try {
            const res = await axios.get(`${baseUrl}/pets-data-user`);
            setPetsData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setRemoveLoading(true);
        }
    }

    useEffect(() => {
        getDataUser();
    }, []);

    const logout = async () => {
        try {
            const res = await axios.get(`${baseUrl}/logout`);
            if (res.data.status === "success") {
                location.reload(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="main-content">
            <h1>Pets cadastrados por você</h1>
            <div className="pets">
                {removeLoading && petsData.length === 0 && (
                    <div style={{ height: "55vh" }}>
                        <br />
                        <p>Ainda não há nenhum <em>pet</em> cadastrado.</p>
                    </div>
                )}
                {petsData.length > 0
                    ? petsData.map((pet, index) => {
                        const { pet_name, race, description, url, id, id_doador } = pet;
                        return <MyPets
                            key={index}
                            imgUrl={url}
                            name={pet_name}
                            race={race}
                            petId={id}
                        />
                    })
                    :
                    null
                }
                {!removeLoading && (
                    <div className="loader-center" style={{ height: "100vh" }}>
                        <Loader />
                    </div>
                )}
            </div>
            <Link to={`/register-pet/${idDoador}`}>
                <Button
                    content="CADASTRAR PET"
                    width="100%"
                />
            </Link>
            <div className="account-panel-buttons">
                <Modal
                    onClick={logout}
                    content="SAIR"
                    modalText="Tem certeza de que deseja sair da conta?"
                    modalButtonText="SAIR"
                />
                <div style={{
                    width: "1em"
                }} />
                <Link to={`/account-edit/${idDoador}`}>
                    <Button
                        content="ATUALIZAR CONTA"
                    />
                </Link>
            </div>
        </div>
    )
}

export default AccountPanel;