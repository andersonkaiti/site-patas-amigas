import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../baseUrl";
import PetInfo from "../layout/PetInfo";
import Loader from "../layout/Loader";

function ShowPetInfo() {
    const { id } = useParams();
    const [petData, setPetData] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);

    const getData = async () => {
        try {
            const res = await axios.post(`${baseUrl}/pet-data-filter-id`, { id });
            setPetData(res.data[0]);
            setRemoveLoading(true);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getData();
    }, [id]);

    return (
        <div className="pet-info">
            {removeLoading ?
                (
                    <PetInfo
                        key={petData.id}
                        name={petData.name}
                        petName={petData.pet_name}
                        email={petData.email}
                        phone={petData.phone}
                        race={petData.race}
                        description={petData.description}
                        imgUrl={petData.url}
                    />
                ) : (
                    <Loader />
                )
            }
        </div>
    )
}

export default ShowPetInfo;