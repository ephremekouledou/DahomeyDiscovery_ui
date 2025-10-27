import { useState, useEffect } from "react";
import { Flex } from "antd";
import BeginningButton from "../../components/dededed/BeginingButton";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import PanierViewer from "../../components/dededed/Panier";
import { usePanier } from "../../context/panierContext";
import PaniersAPI from "../../sdk/api/panier";
import { emptyPanierPresenter, PanierPresenter } from "../../sdk/models/panier";
import FloatingCartButton from "../../components/dededed/PanierButton";

const Reservation = () => {
  const { panier } = usePanier();
  const [panierPresenter, setPanierPresenter] = useState<PanierPresenter>(
    emptyPanierPresenter()
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    PaniersAPI.GetPresenter(panier)
      .then((data) => {
        setPanierPresenter(data);
      })
      .catch((err) => {
        console.error("Error fetching circuits:", err);
      });
  }, [panier]);

  useEffect(() => {
    document.title = "Réservation de Circuit";
  }, []);

  return (
    <Flex justify="center" vertical>
      <BeginningButton />
      <FloatingCartButton />
      {/* Header avec NavBar */}
      <div className="relative z-20 flex items-center justify-center">
        <NavBar menu="" />
      </div>
      <Flex
        justify="center"
        align="center"
        vertical
        style={{
          backgroundColor: "#F9FAFB",
          // minHeight: "100vh",
          paddingTop: "30px",
          width: "100%",
          marginBottom: 55,
        }}
      >
        <PanierViewer panier={panierPresenter} current={true} />
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default Reservation;
