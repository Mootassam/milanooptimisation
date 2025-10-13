import React from "react";
import { useHistory } from 'react-router-dom';

function SubHeader(props) {
  const history = useHistory();

  const goBack = () => {
    history.goBack(); // This will take you back to the previous page
  };
  return (
       <div className="header">
        <div className="back-btn" onClick={() => goBack()}>
          <i className="fas fa-arrow-left" />
        </div>
        <div className="header-title">
          <h1>{props.title}</h1>
          <p>{props.detail}</p>
        </div>
        <style>{`   .header {
            background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
            color: white;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 4px 12px rgba(15, 33, 97, 0.2);
            border-radius: 0 0 16px 16px;
        }
        
        .back-btn {
            color: white;
            font-size: 20px;
            margin-right: 15px;
            text-decoration: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.1);
        }
        
        .header-title {
            flex: 1;
        }
        
        .header-title h1 {
            font-size: 20px;
            font-weight: 700;
        }
        
        .header-title p {
            font-size: 12px;
            opacity: 0.8;
            margin-top: 2px;
        }`}</style>
      </div>
  );
}
export default SubHeader;
