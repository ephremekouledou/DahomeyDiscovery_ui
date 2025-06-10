import { Flex, Typography } from "antd";
import background from "../../assets/images/backgroundFooter.png";
import logo from "../../assets/images/Logo/monoChrome-blanc.png";

function Footer() {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "448px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Overlay pour assombrir l'image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay noir avec 50% d'opacité
            zIndex: 1,
          }}
        ></div>

        {/* Contenu du footer */}
        <Flex
          style={{
            color: "white",
            width: "100%",
            height: "100%",
            fontSize: "18px",
            zIndex: 2, // Au-dessus de l'overlay
          }}
          vertical
          justify="flex-end"
          align="center"
          gap="3vh"
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: "8vw", width: "8vw" }}
          />
          <Typography
            style={{
              fontSize: "24px",
              color: "white",
            }}
          >
            dahomeydiscovery@gmail.com | +229 01 67 11 02 20
          </Typography>
          <span
            style={{
              color: "white",
              borderTop: "1px solid white",
              marginTop: "30px",
              padding: "20px 0",
              width: "20%",
                textAlign: "center",
            }}
          >
            © 2025 - Tous droits réservés
          </span>
        </Flex>
      </div>
    </>
  );
}
export default Footer;
