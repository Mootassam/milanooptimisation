import React, { useRef, useEffect, useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import authSelectors from "src/modules/auth/authSelectors";
import Message from "src/view/shared/message";
import selectors from "src/modules/company/list/companyListSelectors";
import listactions from "src/modules/company/list/companyListActions";
import { useDispatch, useSelector } from "react-redux";

function Invitation() {
  const dispatch = useDispatch();
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const referenceCodeRef = useRef<any>(null);
  
  // Static team data for demonstration
  const staticTeamData = {
    level1: [
      { id: 1, name: "John Smith", joinDate: "2024-01-15", earnings: "$12.50", status: "Active" },
      { id: 2, name: "Sarah Johnson", joinDate: "2024-01-20", earnings: "$8.75", status: "Active" },
      { id: 3, name: "Mike Wilson", joinDate: "2024-02-01", earnings: "$15.20", status: "Active" },
      { id: 4, name: "Emily Brown", joinDate: "2024-02-05", earnings: "$6.05", status: "Active" },
      { id: 5, name: "David Lee", joinDate: "2024-02-10", earnings: "$0.00", status: "Inactive" }
    ],
    level2: [
      { id: 6, name: "Alex Chen", joinDate: "2024-01-25", earnings: "$5.25", status: "Active" },
      { id: 7, name: "Maria Garcia", joinDate: "2024-02-02", earnings: "$7.80", status: "Active" },
      { id: 8, name: "James Miller", joinDate: "2024-02-08", earnings: "$3.45", status: "Active" },
      { id: 9, name: "Lisa Taylor", joinDate: "2024-02-12", earnings: "$9.10", status: "Active" }
    ],
    level3: [
      { id: 10, name: "Robert Davis", joinDate: "2024-02-03", earnings: "$2.15", status: "Active" },
      { id: 11, name: "Jennifer White", joinDate: "2024-02-09", earnings: "$4.30", status: "Active" }
    ],
    level4: [
      { id: 12, name: "Thomas Moore", joinDate: "2024-02-14", earnings: "$1.25", status: "Active" }
    ]
  };

  const copyToClipboard = () => {
    const referenceCode = referenceCodeRef.current.innerText;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(referenceCode)
        .then(() => {
          Message.success("Referral code copied to clipboard!");
        })
        .catch((error) => {
          console.error("Error copying to clipboard:", error);
          Message.error("Failed to copy referral code");
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = referenceCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      Message.success("Referral code copied to clipboard!");
    }
  };

  // Social Sharing Functions
  const shareOnWhatsApp = () => {
    const message = `Join me on ManoMano! Use my referral code: MANO1234\nGet started now and earn together!`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const shareOnTelegram = () => {
    const message = `Join me on ManoMano! Use my referral code: MANO1234\nGet started now and earn together!`;
    const url = `https://t.me/share/url?url=${encodeURIComponent('https://manomano.com')}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const copyReferralLink = () => {
    const link = "https://manomano.com/signup?ref=MANO1234";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link)
        .then(() => {
          Message.success("Referral link copied to clipboard!");
        })
        .catch((error) => {
          console.error("Error copying link:", error);
          Message.error("Failed to copy referral link");
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      Message.success("Referral link copied to clipboard!");
    }
  };

  const openTeamModal = (level) => {
    setSelectedLevel(level);
    setTeamMembers(staticTeamData[`level${level}`] || []);
    setShowTeamModal(true);
  };

  const closeTeamModal = () => {
    setShowTeamModal(false);
    setSelectedLevel(null);
    setTeamMembers([]);
  };

  const dolistCompany = () => {
    dispatch(listactions.doFetch());
  };

  const logorecord = useSelector(selectors.selectRows);
  const loadingImage = useSelector(selectors?.selectLoading);
  
  useEffect(() => {
    dolistCompany();
  }, [dispatch]);

  return (
    <>
      {/* Header Section */}
      <SubHeader title="Invitation" detail="Invite Friends & Earn" />
      
      {/* Team Members Modal */}
      {showTeamModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="modal-title">Level {selectedLevel} Team Members</h3>
              <button className="modal-close" onClick={closeTeamModal}>
                <i className="fas fa-times" />
              </button>
            </div>
            
            <div className="modal-content">
              <div className="team-members-list">
                {teamMembers.map((member) => (
                  <div key={member.id} className="team-member-card">
                    <div className="member-avatar">
                      <i className="fas fa-user" />
                    </div>
                    <div className="member-info">
                      <div className="member-name">{member.name}</div>
                      <div className="member-details">
                        <span className="member-join-date">Joined: {member.joinDate}</span>
                      </div>
                    </div>
                    <div className={`member-status ${member.status.toLowerCase()}`}>
                      {member.status}
                    </div>
                  </div>
                ))}
              </div>
              
              {teamMembers.length === 0 && (
                <div className="no-members">
                  <i className="fas fa-users" />
                  <p>No members in this level yet</p>
                </div>
              )}
            </div>
            
            <div className="modal-actions">
              <button className="modal-btn primary" onClick={closeTeamModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Card */}
      <div className="invite-card">
        <h2 className="invite-title">Your Referral Code</h2>
        <div className="referral-code">
          <span ref={referenceCodeRef} className="code-text">MANO1234</span>
          <button className="copy-btn" onClick={copyToClipboard}>
            <i className="fas fa-copy" />
            Copy
          </button>
        </div>
        <p style={{ color: "#7b8796", fontSize: 14, margin: "10px 0" }}>
          Share this code with your friends
        </p>
        <div className="share-buttons">
          <button className="share-btn btn-whatsapp" onClick={shareOnWhatsApp}>
            <i className="fab fa-whatsapp" />
            WhatsApp
          </button>
          <button className="share-btn btn-telegram" onClick={shareOnTelegram}>
            <i className="fab fa-telegram" />
            Telegram
          </button>
          <button className="share-btn btn-link" onClick={copyReferralLink}>
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
          <div className="team-level" onClick={() => openTeamModal(1)}>
            <div className="team-level-info">
              <div className="team-level-badge badge-1">1</div>
              <span className="team-level-name">Level 1</span>
            </div>
            <div className="team-level-count">5 members <i className="fas fa-chevron-right" /></div>
          </div>
          <div className="team-level" onClick={() => openTeamModal(2)}>
            <div className="team-level-info">
              <div className="team-level-badge badge-2">2</div>
              <span className="team-level-name">Level 2</span>
            </div>
            <div className="team-level-count">4 members <i className="fas fa-chevron-right" /></div>
          </div>
          <div className="team-level" onClick={() => openTeamModal(3)}>
            <div className="team-level-info">
              <div className="team-level-badge badge-3">3</div>
              <span className="team-level-name">Level 3</span>
            </div>
            <div className="team-level-count">2 members <i className="fas fa-chevron-right" /></div>
          </div>
          <div className="team-level" onClick={() => openTeamModal(4)}>
            <div className="team-level-info">
              <div className="team-level-badge badge-4">4</div>
              <span className="team-level-name">Level 4</span>
            </div>
            <div className="team-level-count">1 member <i className="fas fa-chevron-right" /></div>
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

      <style>{`
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 20px;
        }
        
        .modal-container {
          background: white;
          border-radius: 20px;
          max-width: 400px;
          width: 100%;
          max-height: 80vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          animation: modalSlideIn 0.3s ease-out;
        }
        
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .modal-header {
          padding: 25px 25px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f0f4ff;
        }
        
        .modal-title {
          color: #0f2161;
          font-size: 20px;
          font-weight: 700;
          margin: 0;
        }
        
        .modal-close {
          background: none;
          border: none;
          font-size: 20px;
          color: #7b8796;
          cursor: pointer;
          padding: 5px;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .modal-close:hover {
          background: #f0f4ff;
          color: #0f2161;
        }
        
        .modal-content {
          padding: 25px;
        }
        
        .team-members-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .team-member-card {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 12px;
          border: 1px solid #f0f4ff;
        }
        
        .member-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: #0f2161;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        
        .member-info {
          flex: 1;
        }
        
        .member-name {
          font-weight: 600;
          color: #0f2161;
          margin-bottom: 4px;
        }
        
        .member-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .member-join-date,
        .member-earnings {
          font-size: 12px;
          color: #7b8796;
        }
        
        .member-status {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .member-status.active {
          background: #e8f5e8;
          color: #26a17b;
        }
        
        .member-status.inactive {
          background: #ffe8e8;
          color: #e74c3c;
        }
        
        .no-members {
          text-align: center;
          padding: 40px 20px;
          color: #7b8796;
        }
        
        .no-members i {
          font-size: 48px;
          margin-bottom: 15px;
          color: #f0f4ff;
        }
        
        .modal-actions {
          padding: 20px 25px 25px;
          display: flex;
          gap: 12px;
        }
        
        .modal-btn {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .modal-btn.primary {
          background: #0f2161;
          color: white;
        }
        
        .modal-btn.primary:hover {
          background: #1a3a8f;
        }

        /* Updated Team Level Styles for Clickable */
        .team-level {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          background: #f8f9ff;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .team-level:hover {
          background: #f0f4ff;
          transform: translateY(-2px);
        }
        
        .team-level-count {
          font-weight: 700;
          color: #0f2161;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .team-level-count i {
          font-size: 12px;
          color: #7b8796;
        }

        /* Updated Copy Button with Icon */
        .copy-btn {
          background: #0f2161;
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .copy-btn:active {
          transform: scale(0.95);
        }

        /* Page Title */
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
        
        /* Responsive adjustments */
        @media (max-width: 340px) {
            .share-buttons {
                flex-direction: column;
            }
            
            .team-stats {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
    </>
  );
}

export default Invitation;