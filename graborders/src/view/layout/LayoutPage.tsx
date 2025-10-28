import React from "react";
import Header from "./Header";
import TabBottomNavigator from "./TabBottomNavigator";
import "./styles/style.css";
function LayoutPage(props) {
  return (
    <div className="">
      <Header
        showLogo={true}
        showBackButton={false}
        showNotification={true}
      />
      <div className="children__content">{props.children}</div>
      <TabBottomNavigator />
    </div>
  );
}

export default LayoutPage;
