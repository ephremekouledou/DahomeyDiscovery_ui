import { useEffect } from "react";
import './Acceuil.css';


const Acceuil = () => {

    useEffect(() => {
        document.title = 'Acceuil';
    }, []);

    return (
        <div className="container">
        Acceuil
        </div>
    )
}

export default Acceuil
