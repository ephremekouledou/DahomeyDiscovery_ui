import { useEffect } from "react";
import './Acceuil.css';


const Acceuil = () => {

    useEffect(() => {
        document.title = 'Acceuil';
    }, []);

    return (
        <div className="container">
        
            <section className="one">
                <h1>First page</h1>
            </section>

            <section className="two">
                <h1>Second page</h1>
            </section>

            <section className="three">
                <h1>Third page</h1>
            </section>

            <section className="four">
                <h1>Fourth page</h1>
            </section>
        </div>
    )
}

export default Acceuil
