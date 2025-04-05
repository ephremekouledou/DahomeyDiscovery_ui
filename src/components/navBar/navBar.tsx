import { Link } from "react-router-dom"
import './navBar.css';
import  logo  from "../../assets/images/Logo/logo-belge.png"
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { useState } from "react";

const NavBar = () => {
    /* States */
    const [mobileClose, setMobileClose] = useState<boolean>(false);
  return (
    <div className="navbar_header">
      <Link to={"#"}>
        <img className="logo"  src={logo} alt= "logo" />
      </Link>

      {
        mobileClose ? <CloseOutlined className="menu" style={{color: "#fff", fontSize: "36px"}} onClick={() => setMobileClose(!mobileClose)}/> :
            <MenuOutlined className="menu" style={{color: "#fff", fontSize: "36px"}} onClick={() => setMobileClose(!mobileClose)} />
      }
      

      <nav /* className="navbar_navbar" */ className={`navbar_navbar ${mobileClose ? 'active' : ''}`} >
        <Link to={"#"}>
            Acceuil
        </Link>
        <Link to={"#"}>
            Destinations
        </Link>
        <Link to={"#"}>
            Nos Expériences
        </Link>
        <Link to={"#"}>
            Guides
        </Link>
        <Link to={"#"}>
            Catalogue
        </Link>
        <Link to={"#"}>
            Nos Valeurs
        </Link>
        <Link to={"#"}>
            Partenaire
        </Link>
        <Link to={"#"}>
            Blog
        </Link>
      </nav>

    </div>
  )
}

export default NavBar
