import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/style.css";

function TabBottomNavigator() {
  const location = useLocation();

  const isActive = (pathname) => location.pathname === pathname;

  const tabs = [
    {
      icon: "fas fa-home",
      path: "/",
      name: "Home",
    },
    {
      icon: "fa-solid fa-clipboard-list",
      path: "/Order",
      name: "Order",
    },
    {
      icon: "fas fa-hand-holding-usd",
      path: "/grap",
      name: "Grap",
    },
    {
      icon: "fa-solid fa-headphones",
      path: "/Online",
      name: "CS",
    },
    {
      icon: "fas fa-user",
      path: "/profile",
      name: "Account",
    },
  ];

  return (
    <div className="bottom-nav">
      {tabs.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`nav-btn ${isActive(item.path) ? "active" : ""}`}
          style={{ textDecoration: "none" }}
        >
          <i className={item.icon}></i>
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default TabBottomNavigator;
