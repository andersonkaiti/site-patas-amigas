import Button from "../layout/Button";
import { Link } from "react-router-dom";

function Pet({ petId, imgUrl, name, race }) {
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
                    <Link to={`/pet-info/${petId}`}>
                        <Button
                            content="MAIS INFORMAÇÕES"
                            width="100%"
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Pet;