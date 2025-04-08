import { useEffect } from "react";
import "./Acceuil.css";
import NavBar from "../../components/navBar/navBar";
import bgVideo from "../../assets/videos/bgVideo.mp4";
import { FlipWords } from "../../components/ui/flip-words";
import  logo  from "../../assets/images/Logo/monoChrome-blanc.png"

const Acceuil = () => {
  useEffect(() => {
    document.title = "Acceuil";
  }, []);

  const words = ["Une rencontre humaine", "Une immersion culturelle", "Un engagement solidaire"];

  return (
    <>
      <section className="one">
        <NavBar scrolled={true} />
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
        <img
          src={logo}
          className="Accueil_image_3"
        />

        <div className="Acceuil_description">
          <h1><FlipWords words={words} /></h1>
          <p>
            Nous vous emmenons explorer les trésors cachés du Bénin et
            d’ailleurs, à travers des <b>circuits authentiques</b> , guidés par des
            passionnés du territoire.
          </p>
          <p>
            Mais notre mission ne s’arrête pas là. Conscients des réalités
            locales, nous mettons un point d’honneur à <b>agir</b> concrètement pour
            améliorer les conditions de vie des habitants dans les zones que
            nous visitons.
          </p>
          <p>
            Grâce à des <b>actions caritatives</b> ,soutien à l’éducation, accès à
            l’eau, initiatives communautaires – nous semons, avec vous, les
            graines d’un tourisme plus juste et plus humain.
          </p>
          <p>
            Voyager avec Dahomey Discovery, c’est vivre des <b>moments forts</b> , en
            toute sécurité, dans le respect des populations locales et avec un
            impact positif.
          </p>
        </div>
      </section>

      <section className="four">
        <h1>Fourth page</h1>
      </section>
    </>
  );
};

export default Acceuil;
