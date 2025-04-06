import { useEffect } from "react";
import './Acceuil.css';
import NavBar from "../../components/navBar/navBar";
import bgVideo from "../../assets/videos/bgVideo.mp4"


const Acceuil = () => {

    useEffect(() => {
        document.title = 'Acceuil';
    }, []);

    return (
        <div className="container">
        
            <section className="one">
                <NavBar />
                <div className="video-container">
                    <video autoPlay loop muted playsInline className="background-video">
                        <source src={bgVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
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
