import React, { useRef, useEffect } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import authSelectors from "src/modules/auth/authSelectors";
import Message from "src/view/shared/message";
import selectors from "src/modules/company/list/companyListSelectors";
import listactions from "src/modules/company/list/companyListActions";
import { useDispatch, useSelector } from "react-redux";

function Invitation() {
  const dispatch = useDispatch();

  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const referenceCodeRef = useRef<any>(null);
  const copyToClipboard = () => {
    const referenceCode = referenceCodeRef.current.innerText;

    // Check if the browser supports the modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(referenceCode)
        .then(() => {
          alert("Copied to clipboard:");
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

  const dolistCompany = () => {
    dispatch(listactions.doFetch());
  };

  const logorecord = useSelector(selectors.selectRows);
  const loadingImage = useSelector(selectors?.selectLoading);
  useEffect(() => {
    dolistCompany();

    // eslint-disable-next-line
  }, [dispatch]);

  return (
   <>
  {/* Header Section */}
<SubHeader title="Invitation" detail="Invite Friends &amp; Earn" />
  {/* Page Title */}
   <div className="page-title"></div>

  {/* Invite Card */}
  <div className="invite-card">
    <h2 className="invite-title">Your Referral Code</h2>
    <div className="referral-code">
      <span className="code-text">MANO1234</span>
      <button className="copy-btn">Copy</button>
    </div>
    <p style={{ color: "#7b8796", fontSize: 14, margin: "10px 0" }}>
      Share this code with your friends
    </p>
    <div className="share-buttons">
      <button className="share-btn btn-whatsapp">
        <i className="fab fa-whatsapp" />
        WhatsApp
      </button>
      <button className="share-btn btn-telegram">
        <i className="fab fa-telegram" />
        Telegram
      </button>
      <button className="share-btn btn-link">
        <i className="fas fa-link" />
        Copy Link
      </button>
    </div>
  </div>
  {/* Commission Structure */}
  <div className="commission-section">
    <h2 className="section-title">Commission Structure</h2>
    <div className="commission-levels">
      <div className="level-card level-1">
        <div className="level-header">
          <span className="level-name">Level 1 (Direct Referrals)</span>
          <span className="level-percentage">10%</span>
        </div>
        <p className="level-description">
          Earn 10% of your direct referrals' daily earnings
        </p>
      </div>
      <div className="level-card level-2">
        <div className="level-header">
          <span className="level-name">Level 2</span>
          <span className="level-percentage">7%</span>
        </div>
        <p className="level-description">
          Earn 7% of the earnings from your Level 1 referrals' referrals
        </p>
      </div>
      <div className="level-card level-3">
        <div className="level-header">
          <span className="level-name">Level 3</span>
          <span className="level-percentage">4%</span>
        </div>
        <p className="level-description">
          Earn 4% of the earnings from your Level 2 referrals' referrals
        </p>
      </div>
      <div className="level-card level-4">
        <div className="level-header">
          <span className="level-name">Level 4</span>
          <span className="level-percentage">2%</span>
        </div>
        <p className="level-description">
          Earn 2% of the earnings from your Level 3 referrals' referrals
        </p>
      </div>
    </div>
  </div>
  {/* Team Structure */}
  <div className="team-section">
    <h2 className="section-title">Your Team</h2>
    <div className="team-stats">
      <div className="stat-card">
        <div className="stat-value">12</div>
        <div className="stat-label">Total Members</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">$42.50</div>
        <div className="stat-label">Total Earned</div>
      </div>
    </div>
    <div className="team-levels">
      <div className="team-level">
        <div className="team-level-info">
          <div className="team-level-badge badge-1">1</div>
          <span className="team-level-name">Level 1</span>
        </div>
        <div className="team-level-count">5 members</div>
      </div>
      <div className="team-level">
        <div className="team-level-info">
          <div className="team-level-badge badge-2">2</div>
          <span className="team-level-name">Level 2</span>
        </div>
        <div className="team-level-count">4 members</div>
      </div>
      <div className="team-level">
        <div className="team-level-info">
          <div className="team-level-badge badge-3">3</div>
          <span className="team-level-name">Level 3</span>
        </div>
        <div className="team-level-count">2 members</div>
      </div>
      <div className="team-level">
        <div className="team-level-info">
          <div className="team-level-badge badge-4">4</div>
          <span className="team-level-name">Level 4</span>
        </div>
        <div className="team-level-count">1 member</div>
      </div>
    </div>
  </div>
  {/* How It Works */}
  <div className="how-it-works">
    <h2 className="section-title">How It Works</h2>
    <div className="steps">
      <div className="step">
        <div className="step-number">1</div>
        <div className="step-content">
          <h3 className="step-title">Share Your Referral Code</h3>
          <p className="step-description">
            Share your unique code with friends via social media, messaging
            apps, or directly.
          </p>
        </div>
      </div>
      <div className="step">
        <div className="step-number">2</div>
        <div className="step-content">
          <h3 className="step-title">Friends Sign Up</h3>
          <p className="step-description">
            Your friends use your code when registering for their ManoMano
            account.
          </p>
        </div>
      </div>
      <div className="step">
        <div className="step-number">3</div>
        <div className="step-content">
          <h3 className="step-title">Start Earning</h3>
          <p className="step-description">
            Earn commissions from your friends' activities based on our
            multi-level structure.
          </p>
        </div>
      </div>
      <div className="step">
        <div className="step-number">4</div>
        <div className="step-content">
          <h3 className="step-title">Track Your Earnings</h3>
          <p className="step-description">
            Monitor your commissions and team growth right from your dashboard.
          </p>
        </div>
      </div>
    </div>
  </div>
 

  <style>{` /* Page Title */
        .page-title {
            padding: 20px 15px 10px;
            text-align: center;
            color: #0f2161;
            font-size: 24px;
            font-weight: 700;
        }
        
        .page-subtitle {
            text-align: center;
            color: #7b8796;
            font-size: 16px;
            margin-bottom: 20px;
            padding: 0 20px;
            line-height: 1.5;
        }
        
        /* Invite Card */
        .invite-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin: 0 15px 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            text-align: center;
        }
        
        .invite-title {
            color: #0f2161;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 15px;
        }
        
        .referral-code {
            background: #f0f4ff;
            border: 2px dashed #0f2161;
            border-radius: 10px;
            padding: 15px;
            margin: 15px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .code-text {
            font-size: 18px;
            font-weight: 700;
            color: #0f2161;
            letter-spacing: 1px;
        }
        
        .copy-btn {
            background: #0f2161;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 8px 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .copy-btn:active {
            transform: scale(0.95);
        }
        
        .share-buttons {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
        
        .share-btn {
            flex: 1;
            padding: 10px 0px;
            border-radius: 8px;
            border: none;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .share-btn:active {
            transform: scale(0.97);
        }
        
        .btn-whatsapp {
            background: #25D366;
            color: white;
        }
        
        .btn-telegram {
            background: #0088cc;
            color: white;
        }
        
        .btn-link {
            background: #f0f4ff;
            color: #0f2161;
        }
        
        /* Commission Structure */
        .commission-section {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin: 0 15px 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .section-title {
            color: #0f2161;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 20px;
            text-align: center;
            position: relative;
            padding-bottom: 10px;
        }
        
        .section-title:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background: #ffde59;
        }
        
        .commission-levels {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-top: 20px;
        }
        
        .level-card {
            background: #f8f9ff;
            border-radius: 10px;
            padding: 15px;
            position: relative;
            overflow: hidden;
        }
        
        .level-card::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 5px;
        }
        
        .level-1::before {
            background: #ffde59;
        }
        
        .level-2::before {
            background: #3498db;
        }
        
        .level-3::before {
            background: #2ecc71;
        }
        
        .level-4::before {
            background: #9b59b6;
        }
        
        .level-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .level-name {
            font-weight: 700;
            color: #0f2161;
            font-size: 18px;
        }
        
        .level-percentage {
            font-weight: 800;
            font-size: 20px;
        }
        
        .level-1 .level-percentage {
            color: #ffde59;
        }
        
        .level-2 .level-percentage {
            color: #3498db;
        }
        
        .level-3 .level-percentage {
            color: #2ecc71;
        }
        
        .level-4 .level-percentage {
            color: #9b59b6;
        }
        
        .level-description {
            color: #5a6370;
            font-size: 14px;
            line-height: 1.5;
        }
        
        /* Team Structure */
        .team-section {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin: 0 15px 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .team-stats {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .stat-card {
            background: #f8f9ff;
            border-radius: 10px;
            padding: 15px;
            text-align: center;
        }
        
        .stat-value {
            font-size: 20px;
            font-weight: 800;
            color: #0f2161;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 14px;
            color: #7b8796;
        }
        
        .team-levels {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .team-level {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 15px;
            background: #f8f9ff;
            border-radius: 10px;
        }
        
        .team-level-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .team-level-badge {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: white;
            font-size: 14px;
        }
        
        .badge-1 {
            background: #ffde59;
        }
        
        .badge-2 {
            background: #3498db;
        }
        
        .badge-3 {
            background: #2ecc71;
        }
        
        .badge-4 {
            background: #9b59b6;
        }
        
        .team-level-name {
            font-weight: 600;
            color: #0f2161;
        }
        
        .team-level-count {
            font-weight: 700;
            color: #0f2161;
        }
        
        /* How It Works */
        .how-it-works {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin: 0 15px 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .steps {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-top: 20px;
        }
        
        .step {
            display: flex;
            gap: 15px;
        }
        
        .step-number {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #0f2161;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            flex-shrink: 0;
        }
        
        .step-content {
            flex: 1;
        }
        
        .step-title {
            font-weight: 600;
            color: #0f2161;
            margin-bottom: 5px;
        }
        
        .step-description {
            color: #5a6370;
            font-size: 14px;
            line-height: 1.5;
        }
      
        
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: #7b8796;
            font-size: 12px;
            width: 20%;
        }
        
        .nav-item.active {
            color: #0f2161;
        }
        
        .nav-item i {
            font-size: 20px;
            margin-bottom: 4px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 340px) {
            .share-buttons {
                flex-direction: column;
            }
            
            .team-stats {
                grid-template-columns: 1fr;
            }
        }`}</style>
</>

  );
}
export default Invitation;
