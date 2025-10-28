
import React, { useState, useEffect } from "react";
import "./styles/style.css";
import { Link } from "react-router-dom";

function Header() {
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(3);

  // Example: Simulate fetching notifications
  

  return (
    <div className="header">
      <div className="logo">
        Mano<span>Mano</span>
      </div>
      <Link to="/notification" className="remove__ligne">
        <div className="header-icons">
          <div className="notification-icon-wrapper">
            <i className="fas fa-bell" />
            {unreadNotificationsCount > 0 && (
              <span className="notification-badga">
                {unreadNotificationsCount > 99 ? '99+' : unreadNotificationsCount}
              </span>
            )}
          </div>
        </div>
      </Link>


    </div>

  );
}

export default Header;