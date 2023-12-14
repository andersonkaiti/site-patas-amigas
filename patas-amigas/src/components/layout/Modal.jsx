import { useState } from "react";
import Button from "./Button";
import "../../assets/css/modal.css";

function Modal({ onClick, content, modalText, modalButtonText }) {
    const [modal, setModal] = useState(false);
    
    const toggleModal = () =>{
        setModal(!modal);
    }

    if(modal) {
        document.body.classList.add("active-modal");
    } else {
        document.body.classList.remove("active-modal");
    }
    
    return (
        <>
            <Button
                onClick={toggleModal}
                content={content}
            />
            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-container">
                        <div className="modal-content">
                            <p>{modalText}</p>
                            <div className="modal-buttons">
                                <Button
                                    onClick={toggleModal}
                                    content="FECHAR"
                                    width="100%"
                                />
                                <div style={{
                                    width: "1em",
                                    height: "1em"
                                }}/>
                                <Button
                                    onClick={onClick}
                                    content={modalButtonText}
                                    width="100%"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal;