import React from "react";
import "./styles/style.css";
import { Link } from "react-router-dom";
function Header() {
  return (
<div className="header">
          <div className="logo">
            Mano<span>Mano</span>
          </div>
          <Link to="/notification" className="remove__ligne">
          <div className="header-icons">
            <i className="fas fa-bell" />
          </div>
          </Link>
        </div>
  );
}

export default Header;
