import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../styles/styles.css";
import { Link } from "react-router-dom";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import Amount from "src/shared/Amount";
import { useHistory } from "react-router-dom"; // Assuming you're using React Router
import actions from "src/modules/record/list/recordListActions";
import selectors from "src/modules/record/list/recordListSelectors";
import { log } from "console";
import styles from "../../shared/form/styles/styles";
import Message from "src/view/shared/message";

function Profile() {
  const dispatch = useDispatch();
  const total = useSelector(selectors.selectTotal);
  const totalperday = useSelector(selectors.selectTotalPerday);

  useEffect(() => {
    const values = {
      status: "completed",
    };
    dispatch(actions.doCountDay());
    dispatch(actions.doFetch(values, values));
  }, [dispatch]);

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };
  const history = useHistory();

  const goto = (param) => {
    history.push(param);
  };
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const data = [
    {
      icon: "fa-solid fa-clock-rotate-left",
      name: "Tasks History",
      url: "/order",
    },
    { icon: "fa-solid fa-wallet", name: "Bind Wallet", url: "/wallet" },
    {
      icon: "fa-solid fa-arrow-right-arrow-left",
      name: "Transactions",
      url: "/transacation",
    },
    {
      icon: "fa-solid fa-money-bill-transfer",
      name: "Withdraw",
      url: "/withdraw",
    },
    { icon: "fa-solid fa-user", name: "Profile", url: "/myprofile" },
    { icon: "fa-solid fa-lock", name: "Security", url: "/security" },
  ];
  const referenceCodeRef = useRef<any>(null);

  const copyToClipboardCoupon = () => {
    const referenceCode = referenceCodeRef.current.innerText;

    // Check if the browser supports the modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(referenceCode)
        .then(() => {
          Message.success("Copied");
          // You can add any additional logic here, such as showing a success message
        })
        .catch((error) => {
          console.error("Error copying to clipboard:", error);
          // You can handle errors here, such as displaying an error message to the user
        });
    } else {
      // Fallback for browsers that do not support the modern clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = referenceCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      Message.success("Copied");

      // You can add any additional logic here for the fallback mechanism
    }
  };

  return (
    <>
      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-top">
          <div className="profile-image">
            <i className="fas fa-user" />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">John Doe</h2>
            <span className="profile-status">Gold Member</span>
          </div>
        </div>
        <div className="profile-details">
          <div className="profile-detail">
            <div className="detail-label">Invitation Code</div>
            <div className="detail-value">MANO1234</div>
          </div>
          <div className="profile-detail">
            <div className="detail-label">Credit Score</div>
            <div className="detail-value">100</div>
          </div>
        </div>
      </div>
      {/* Balance Section */}
      <div className="balance-section">
        <div className="balance-header">
          <div className="balance-title">Available Balance</div>
          <div className="balance-info">USD</div>
        </div>
        <div className="balance-amount">$1,250.75</div>
        <div className="balance-buttons">
          <button className="balance-btn btn-deposit">
            <i className="fas fa-plus-circle" />
            Deposit
          </button>
          <button className="balance-btn btn-withdraw">
            <i className="fas fa-money-bill-wave" />
            Withdraw
          </button>
          <button className="balance-btn btn-history">
            <i className="fas fa-history" />
            History
          </button>
          <button className="balance-btn btn-invite">
            <i className="fas fa-user-plus" />
            Invite
          </button>
        </div>
      </div>
      {/* Account Options */}
      <div className="options-section">
        <div className="section-title">
          <i className="fas fa-cog" />
          Account Settings
        </div>
        <a href="#" className="option-item">
          <div className="option-icon">
            <i className="fas fa-user-circle" />
          </div>
          <div className="option-content">
            <div className="option-title">Personal Information</div>
            <div className="option-desc">Update your profile details</div>
          </div>
          <div className="option-arrow">
            <i className="fas fa-chevron-right" />
          </div>
        </a>
        <a href="#" className="option-item">
          <div className="option-icon">
            <i className="fas fa-lock" />
          </div>
          <div className="option-content">
            <div className="option-title">Change Password</div>
            <div className="option-desc">Update your login password</div>
          </div>
          <div className="option-arrow">
            <i className="fas fa-chevron-right" />
          </div>
        </a>
        <a href="#" className="option-item">
          <div className="option-icon">
            <i className="fas fa-key" />
          </div>
          <div className="option-content">
            <div className="option-title">Withdrawal Password</div>
            <div className="option-desc">Change your withdrawal password</div>
          </div>
          <div className="option-arrow">
            <i className="fas fa-chevron-right" />
          </div>
        </a>
        <a href="#" className="option-item">
          <div className="option-icon">
            <i className="fas fa-wallet" />
          </div>
          <div className="option-content">
            <div className="option-title">Wallet Address</div>
            <div className="option-desc">Add or update your wallet</div>
          </div>
          <div className="option-arrow">
            <i className="fas fa-chevron-right" />
          </div>
        </a>
      </div>
      {/* More Options */}
      <div className="options-section">
        <div className="section-title">
          <i className="fas fa-sliders-h" />
          Preferences
        </div>
        <a href="#" className="option-item">
          <div className="option-icon">
            <i className="fas fa-shield-alt" />
          </div>
          <div className="option-content">
            <div className="option-title">Security Settings</div>
            <div className="option-desc">Manage security preferences</div>
          </div>
          <div className="option-arrow">
            <i className="fas fa-chevron-right" />
          </div>
        </a>
     
        <a href="#" className="option-item">
          <div className="option-icon">
            <i className="fas fa-language" />
          </div>
          <div className="option-content">
            <div className="option-title">Language</div>
            <div className="option-desc">Change app language</div>
          </div>
          <div className="option-arrow">
            <i className="fas fa-chevron-right" />
          </div>
        </a>
        <a href="#" className="option-item">
          <div className="option-icon">
            <i className="fas fa-question-circle" />
          </div>
          <div className="option-content">
            <div className="option-title">Help &amp; Support</div>
            <div className="option-desc">Get assistance</div>
          </div>
          <div className="option-arrow">
            <i className="fas fa-chevron-right" />
          </div>
        </a>
      </div>
      {/* Logout Button */}
      <div className="logout-section" onClick={()=> doSignout()}>
        <button className="logout-btn">
          <i className="fas fa-sign-out-alt" />
          Logout
        </button>
      </div>
      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <a href="#" className="nav-item">
          <i className="fas fa-home" />
          <span>Home</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fas fa-wallet" />
          <span>Recharge</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fas fa-hand-holding-usd" />
          <span>Grap</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fas fa-shopping-cart" />
          <span>Order</span>
        </a>
        <a href="#" className="nav-item active">
          <i className="fas fa-user" />
          <span>Account</span>
        </a>
      </div>

      <style>{`  /* Profile Section */
        .profile-section {
            background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
            border-radius: 20px;
            padding: 25px 20px;
            margin: 20px 15px;
            box-shadow: 0 10px 20px rgba(15, 33, 97, 0.15);
            color: white;
            position: relative;
            overflow: hidden;
        }
        
        .profile-section::before {
            content: "";
            position: absolute;
            top: -20px;
            right: -20px;
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
        }
        
        .profile-section::after {
            content: "";
            position: absolute;
            bottom: -30px;
            left: -30px;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: rgba(255, 222, 89, 0.1);
        }
        
        .profile-top {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .profile-image {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 28px;
            margin-right: 15px;
            border: 2px solid rgba(255, 255, 255, 0.3);
        }
        
        .profile-info {
            flex: 1;
        }
        
        .profile-name {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 5px;
        }
        
        .profile-status {
            display: inline-block;
            background: rgba(255, 222, 89, 0.9);
            color: #0f2161;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .profile-details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }
        
        .profile-detail {
            background: rgba(255, 255, 255, 0.15);
            padding: 12px;
            border-radius: 12px;
            backdrop-filter: blur(5px);
        }
        
        .detail-label {
            font-size: 12px;
            opacity: 0.8;
            margin-bottom: 5px;
        }
        
        .detail-value {
            font-size: 16px;
            font-weight: 600;
        }
        
        /* Balance Section */
        .balance-section {
            background: white;
            border-radius: 18px;
            padding: 20px;
            margin: 0 15px 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .balance-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .balance-title {
            color: #7b8796;
            font-size: 16px;
        }
        
        .balance-info {
            color: #0f2161;
            font-size: 12px;
            background: #f0f4ff;
            padding: 4px 10px;
            border-radius: 10px;
        }
        
        .balance-amount {
            color: #0f2161;
            font-size: 32px;
            font-weight: 800;
            text-align: center;
            margin-bottom: 20px;
            letter-spacing: 0.5px;
        }
        
        .balance-buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }
        
        .balance-btn {
            padding: 12px 5px;
            border-radius: 12px;
            border: none;
            font-weight: 600;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 12px;
        }
        
        .balance-btn:active {
            transform: scale(0.97);
        }
        
        .balance-btn i {
            font-size: 18px;
        }
        
        .btn-deposit {
            background: #0f2161;
            color: white;
        }
        
        .btn-withdraw {
            background: #f0f4ff;
            color: #0f2161;
        }
        
        .btn-history {
            background: #fff8e1;
            color: #e6b400;
        }
        
        .btn-invite {
            background: #e8f5e9;
            color: #2e7d32;
        }
        
        /* Quick Actions */
        .quick-actions {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            padding: 0 15px;
            margin-bottom: 25px;
        }
        
        .action-btn {
            background: white;
            border-radius: 15px;
            padding: 15px 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            transition: all 0.2s ease;
            border: none;
            cursor: pointer;
        }
        
        .action-btn:active {
            transform: scale(0.97);
        }
        
        .action-btn i {
            font-size: 22px;
            color: #0f2161;
        }
        
        .action-btn span {
            font-size: 12px;
            font-weight: 600;
            color: #0f2161;
        }
        
        /* Account Options */
        .options-section {
            background: white;
            border-radius: 20px;
            padding: 10px 0;
            margin: 0 15px 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .section-title {
            padding: 15px 20px 10px;
            font-size: 18px;
            font-weight: 700;
            color: #0f2161;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .section-title i {
            color: #7b8796;
            font-size: 16px;
        }
        
        .option-item {
            display: flex;
            align-items: center;
            padding: 16px 20px;
            border-bottom: 1px solid #f5f6f7;
            text-decoration: none;
            color: #333;
            transition: all 0.2s ease;
        }
        
        .option-item:active {
            background: #f9f9f9;
        }
        
        .option-item:last-child {
            border-bottom: none;
        }
        
        .option-icon {
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: #f0f4ff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: #0f2161;
            font-size: 18px;
        }
        
        .option-content {
            flex: 1;
        }
        
        .option-title {
            font-weight: 600;
            color: #0f2161;
            margin-bottom: 4px;
            font-size: 16px;
        }
        
        .option-desc {
            font-size: 13px;
            color: #7b8796;
        }
        
        .option-arrow {
            color: #7b8796;
        }
        
        /* Logout Button */
        .logout-section {
            padding: 0 15px 20px;
        }
        
        .logout-btn {
            width: 100%;
            padding: 16px;
            background: #e81f1f;
            color: #fff;
            border: 1px solid #fff8e1;
            border-radius: 16px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            box-shadow: 0 4px 10px rgba(230, 180, 0, 0.1);
        }
        
        .logout-btn:active {
            transform: scale(0.98);
            background: #fff8e1;
        }
    
        
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: #7b8796;
            font-size: 12px;
            width: 20%;
            transition: all 0.2s ease;
        }
        
        .nav-item.active {
            color: #0f2161;
            transform: translateY(-5px);
        }
        
        .nav-item i {
            font-size: 20px;
            margin-bottom: 4px;
            transition: all 0.2s ease;
        }
        
        .nav-item.active i {
            transform: scale(1.2);
            color: #0f2161;
        }
        
        /* Responsive adjustments */
        @media (max-width: 340px) {
            .balance-buttons {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .quick-actions {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .profile-details {
                grid-template-columns: 1fr;
            }
        }`}</style>
    </>
  );
}

export default Profile;
