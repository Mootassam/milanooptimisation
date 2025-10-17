import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import authActions from "src/modules/auth/authActions";
import authSelectors from "src/modules/auth/authSelectors";
import Amount from "src/shared/Amount";
import { useHistory } from "react-router-dom";
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
  
  const referenceCodeRef = useRef<any>(null);

  const copyToClipboardCoupon = () => {
    const referenceCode = referenceCodeRef.current.innerText;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(referenceCode)
        .then(() => {
          Message.success("Copied");
        })
        .catch((error) => {
          console.error("Error copying to clipboard:", error);
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = referenceCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      Message.success("Copied");
    }
  };

  // Balance Button Actions
  const balanceActions = [
    {
      path: "/deposit",
      name: "Deposit",
      icon: "fas fa-plus-circle",
      className: "btn-deposit"
    },
    {
      path: "/withdraw",
      name: "Withdraw",
      icon: "fas fa-money-bill-wave",
      className: "btn-withdraw"
    },
    {
      path: "/history",
      name: "History",
      icon: "fas fa-history",
      className: "btn-history"
    },
    {
      path: "/invite",
      name: "Invite",
      icon: "fas fa-user-plus",
      className: "btn-invite"
    }
  ];

  // Account Settings Options
  const accountSettings = [
    {
      path: "/personal-information",
      name: "Personal Information",
      icon: "fas fa-user-circle",
      description: "Update your profile details"
    },
    {
      path: "/change-password",
      name: "Change Password",
      icon: "fas fa-lock",
      description: "Update your login password"
    },
    {
      path: "/withdrawal-password",
      name: "Withdrawal Password",
      icon: "fas fa-key",
      description: "Change your withdrawal password"
    },
    {
      path: "/wallet-address",
      name: "Wallet Address",
      icon: "fas fa-wallet",
      description: "Add or update your wallet"
    }
  ];

  // Preferences Options
  const preferences = [
    {
      path: "/security-settings",
      name: "Security Settings",
      icon: "fas fa-shield-alt",
      description: "Manage security preferences"
    },
    {
      path: "/notification",
      name: "Notifications",
      icon: "fas fa-bell",
      description: "Manage your alerts"
    },
    {
      path: "/language",
      name: "Language",
      icon: "fas fa-language",
      description: "Change app language"
    },
    {
      path: "/help-support",
      name: "Help & Support",
      icon: "fas fa-question-circle",
      description: "Get assistance"
    }
  ];

  // Bottom Navigation Items
  const navItems = [
    {
      path: "/",
      name: "Home",
      icon: "fas fa-home"
    },
    {
      path: "/recharge",
      name: "Recharge",
      icon: "fas fa-wallet"
    },
    {
      path: "/grap",
      name: "Grap",
      icon: "fas fa-hand-holding-usd"
    },
    {
      path: "/order",
      name: "Order",
      icon: "fas fa-shopping-cart"
    },
    {
      path: "/account",
      name: "Account",
      icon: "fas fa-user",
      active: true
    }
  ];

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
          {balanceActions.map((action, index) => (
            <Link key={index} to={action.path}>
              <button className={`balance-btn ${action.className}`}>
                <i className={action.icon} />
                {action.name}
              </button>
            </Link>
          ))}
        </div>
      </div>

      {/* Account Settings */}
      <div className="options-section">
        <div className="section-title">
          <i className="fas fa-cog" />
          Account Settings
        </div>
        {accountSettings.map((item, index) => (
          <Link key={index} to={item.path} className="option-item">
            <div className="option-icon">
              <i className={item.icon} />
            </div>
            <div className="option-content">
              <div className="option-title">{item.name}</div>
              <div className="option-desc">{item.description}</div>
            </div>
            <div className="option-arrow">
              <i className="fas fa-chevron-right" />
            </div>
          </Link>
        ))}
      </div>

      {/* Preferences */}
      <div className="options-section">
        <div className="section-title">
          <i className="fas fa-sliders-h" />
          Preferences
        </div>
        {preferences.map((item, index) => (
          <Link key={index} to={item.path} className="option-item">
            <div className="option-icon">
              <i className={item.icon} />
            </div>
            <div className="option-content">
              <div className="option-title">{item.name}</div>
              <div className="option-desc">{item.description}</div>
            </div>
            <div className="option-arrow">
              <i className="fas fa-chevron-right" />
            </div>
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <div className="logout-section" onClick={() => doSignout()}>
        <button className="logout-btn">
          <i className="fas fa-sign-out-alt" />
          Logout
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        {navItems.map((item, index) => (
          <Link 
            key={index} 
            to={item.path} 
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            <i className={item.icon} />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      <style>{`
        /* Profile Section */
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
        
        .balance-buttons a {
          text-decoration: none;
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
            width: 100%;
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
        
        /* Bottom Navigation */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            display: flex;
            justify-content: space-around;
            padding: 12px 0;
            box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.08);
            z-index: 1000;
            max-width: 400px;
            margin: 0 auto;
            border-radius: 20px 20px 0 0;
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
            
            .profile-details {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
    </>
  );
}

export default Profile;