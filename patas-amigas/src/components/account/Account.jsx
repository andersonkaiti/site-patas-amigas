import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../baseUrl";
import AccountPanel from "./AccountPanel";
import Loader from "../layout/Loader";

function Account() {
    const [auth, setAuth] = useState(null);
    const [idDoador, setIdDoador] = useState();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const validate = async () => {
        try {
            const res = await axios.get(`${baseUrl}/doar-pet`);
            if (res.data.status === "success") {
                setIdDoador(res.data.id_doador);
                setAuth(true);
            } else {
                setAuth(false);
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

    return (
        <>
            {
                loading ? (
                    <div className="loader-center" style={{ height: "90vh" }}>
                        <Loader />
                    </div>
                ) : auth ? (
                    <AccountPanel idDoador={idDoador}/>
                ) : (
                    navigate("/login")
                )
            }
        </>
    )
}

export default Account;