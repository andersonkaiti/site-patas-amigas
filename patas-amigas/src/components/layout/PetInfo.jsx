import "../../assets/css/pet-info.css";

function PetInfo({ name, petName, email, phone, race, description, imgUrl }) {
    return (
        <div className="info-container">
            <div className="info-container-img">
                <img src={imgUrl}/>
            </div>
            <div className="info-content">
                <div className="pet-info-content">
                    <p className="info-title">Nome do <em>pet</em></p>
                    <p>{petName}</p>
                    <p className="info-title">Raça</p>
                    <p>{race}</p>
                    <p className="info-title">Descrição do <em>pet</em></p>
                    <p>{description}</p>
                </div>
                <div className="doador-info-content">
                    <p className="info-title">Nome do doador</p>
                    <p>{name}</p>
                    <p className="info-title"><em>E-mail</em> do doador</p>
                    <p>{email}</p>
                    <p className="info-title">Telefone</p>
                    <p>{phone}</p>
                </div>
            </div>
        </div>
    )
}

export default PetInfo;