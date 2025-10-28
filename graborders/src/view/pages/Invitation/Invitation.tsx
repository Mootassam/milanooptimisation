import React, { useRef, useEffect, useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import authSelectors from "src/modules/auth/authSelectors";
import Message from "src/view/shared/message";
import { useDispatch, useSelector } from "react-redux";
import userFormActions from "src/modules/user/form/userFormActions";
import userFormSelectors from "src/modules/user/form/userFormSelectors";
import Header from "src/view/layout/Header";

function Invitation() {
  const dispatch = useDispatch();
  const selectRefLoading = useSelector(userFormSelectors.selectRefLoading);
  const selectRefUsers = useSelector(userFormSelectors.selectRefUsers);
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  const referenceCodeRef = useRef<any>(null);
  const [showTeamModal, setShowTeamModal] = useState<boolean>(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [teamMembers, setTeamMembers] = useState<
    Array<{
      id?: string | number;
      email?: string;
      joinDate?: string;
      balance?: number;
      vipLevel?: string;
      [key: string]: any;
    }>
  >([]);

  // Extract data from selectRefUsers
  const targetUser = selectRefUsers?.targetUser;
  const teamSummary = selectRefUsers?.teamSummary;

  const totalCommissions = selectRefUsers?.totalCommissions || 0;

  const totalMembers = teamSummary?.totalMembers || 0;
  const levels = teamSummary?.levels || { 1: [], 2: [], 3: [], 4: [] };

  // Calculate member counts for each level
  const levelCounts = {
    1: levels[1]?.length || 0,
    2: levels[2]?.length || 0,
    3: levels[3]?.length || 0,
    4: levels[4]?.length || 0
  };

  const copyToClipboard = () => {
    const referenceCode = targetUser?.refcode || currentUser?.refcode || "NOCODE";

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
    const message = `Join me on our platform! Use my referral code: ${targetUser?.refcode || currentUser?.refcode}\nGet started now and earn together!`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const shareOnTelegram = () => {
    const message = `Join me on our platform! Use my referral code: ${targetUser?.refcode || currentUser?.refcode}\nGet started now and earn together!`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}/signup?ref=${targetUser?.refcode || currentUser?.refcode}`;
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
      const openTeamModal = (level: number) => {
        setSelectedLevel(level);
        setTeamMembers(levels[level] || []);
        setShowTeamModal(true);
      };
      Message.success("Referral link copied to clipboard!");
    }
  };

  const openTeamModal = (level) => {
    setSelectedLevel(level);
    setTeamMembers(levels[level] || []);
    setShowTeamModal(true);
  };

  const closeTeamModal = () => {
    setShowTeamModal(false);
    setSelectedLevel(null);
    setTeamMembers([]);
  };

  useEffect(() => {
    if (currentUser?.id) {
      dispatch(userFormActions.doRef(currentUser.id));
    }
  }, [dispatch, currentUser?.id]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Header Section */}
      <Header
        title="Invitation"
        showBackButton={true}
        showLogo={false}
        showNotification={true}
      />

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
              {selectRefLoading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Loading team members...</p>
                </div>
              ) : (
                <>
                  <div className="team-members-list">
                    {teamMembers.map((member) => (
                      <div key={member?.id} className="team-member-card">
                        <div className="member-avatar">
                          <i className="fas fa-user" />
                        </div>
                        <div className="member-info">
                          <div className="member-name">{member.email}</div>
                          <div className="member-details">
                            <span className="member-join-date">Joined: {formatDate(member.joinDate)}</span>
                            <span className="member-earnings">Balance: ${member.balance || 0}</span>
                          </div>
                        </div>
                        <div className="member-status active">
                          {member.vipLevel || 'Member'}
                        </div>
                      </div>
                    ))}
                  </div>

                  {teamMembers.length === 0 && (
                    <div className="no-members">
                      <i className="fas fa-users" />
                      <p>No members in this level yet</p>
                      <span>Start inviting friends to build your team!</span>
                    </div>
                  )}
                </>
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

      {/* Loading State for Main Content */}
      {selectRefLoading ? (
        <div className="loading-section">
          <div className="loading-spinner large"></div>
          <p>Loading your referral data...</p>
        </div>
      ) : (
        <>
          {/* Invite Card */}
          <div className="invite-card">
            <h2 className="invite-title">Your Referral Code</h2>
            <div className="referral-code">
              <span ref={referenceCodeRef} className="code-text">
                {targetUser?.refcode || currentUser?.refcode || "NOCODE"}
              </span>
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
                <div className="stat-value">{totalMembers}</div>
                <div className="stat-label">Total Members</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">${totalCommissions.toFixed(2)}</div>
                <div className="stat-label">Total Earned</div>
              </div>
            </div>
            <div className="team-levels">
              <div className="team-level" onClick={() => openTeamModal(1)}>
                <div className="team-level-info">
                  <div className="team-level-badge badge-1">1</div>
                  <span className="team-level-name">Level 1</span>
                </div>
                <div className="team-level-count">
                  {levelCounts[1]} {levelCounts[1] === 1 ? 'member' : 'members'}
                  <i className="fas fa-chevron-right" />
                </div>
              </div>
              <div className="team-level" onClick={() => openTeamModal(2)}>
                <div className="team-level-info">
                  <div className="team-level-badge badge-2">2</div>
                  <span className="team-level-name">Level 2</span>
                </div>
                <div className="team-level-count">
                  {levelCounts[2]} {levelCounts[2] === 1 ? 'member' : 'members'}
                  <i className="fas fa-chevron-right" />
                </div>
              </div>
              <div className="team-level" onClick={() => openTeamModal(3)}>
                <div className="team-level-info">
                  <div className="team-level-badge badge-3">3</div>
                  <span className="team-level-name">Level 3</span>
                </div>
                <div className="team-level-count">
                  {levelCounts[3]} {levelCounts[3] === 1 ? 'member' : 'members'}
                  <i className="fas fa-chevron-right" />
                </div>
              </div>
              <div className="team-level" onClick={() => openTeamModal(4)}>
                <div className="team-level-info">
                  <div className="team-level-badge badge-4">4</div>
                  <span className="team-level-name">Level 4</span>
                </div>
                <div className="team-level-count">
                  {levelCounts[4]} {levelCounts[4] === 1 ? 'member' : 'members'}
                  <i className="fas fa-chevron-right" />
                </div>
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
                    Your friends use your code when registering for their account.
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
        </>
      )}

      <style>{`
        /* Loading Styles */
        .loading-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          text-align: center;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f4f6;
          border-top: 4px solid #0f2161;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        .loading-spinner.large {
          width: 60px;
          height: 60px;
          border-width: 5px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

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
          background: #e8f5e8;
          color: #26a17b;
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
        
        .no-members span {
          font-size: 14px;
          color: #a0a4ab;
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

        /* Invite Card */
        .invite-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 15px 20px;
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