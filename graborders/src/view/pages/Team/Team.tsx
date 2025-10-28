import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import Header from "src/view/layout/Header";

function Team() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);

  return (
    <div className="team-profile-container">
  <Header
        title="Profile"
        showBackButton={true}
        showLogo={false}
        showNotification={true}
      />
      <div className="team-profile-section">
        <div className="team-profile-header">
          <div className="team-profile-avatar">
            <i className="fas fa-user" />
          </div>
          <div className="team-profile-info">
            <h2 className="team-profile-name">{currentUser?.fullName || "User"}</h2>
            <span className="team-profile-status">Active Member</span>
          </div>
        </div>

        <div className="team-profile-details">
          <div className="team-profile-group">
            <div className="team-profile-label">Full Name</div>
            <div className="team-profile-value">{currentUser?.fullName}</div>
          </div>

          <div className="team-profile-group">
            <div className="team-profile-label">Email</div>
            <div className="team-profile-value">{currentUser?.email}</div>
          </div>

          <div className="team-profile-group">
            <div className="team-profile-label">Phone Number</div>
            <div className="team-profile-value">{currentUser?.phoneNumber}</div>
          </div>

          {currentUser?.username && (
            <div className="team-profile-group">
              <div className="team-profile-label">Country</div>
              <div className="team-profile-value">{currentUser?.username}</div>
            </div>
          )}

          <div className="team-profile-group">
            <div className="team-profile-label">Invitation Code</div>
            <div className="team-profile-value team-invitation-code">
              {currentUser?.invitationcode}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .team-profile-container {
          min-height: 100vh;
          background: #f5f7fa;
          padding-bottom: 80px;
        }

        /* Team Profile Section */
        .team-profile-section {
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          border-radius: 20px;
          padding: 25px 20px;
          margin: 20px 15px;
          box-shadow: 0 10px 20px rgba(15, 33, 97, 0.15);
          color: white;
          position: relative;
          overflow: hidden;
        }
        
        .team-profile-section::before {
          content: "";
          position: absolute;
          top: -20px;
          right: -20px;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .team-profile-section::after {
          content: "";
          position: absolute;
          bottom: -30px;
          left: -30px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(255, 222, 89, 0.1);
        }
        
        .team-profile-header {
          display: flex;
          align-items: center;
          margin-bottom: 25px;
          position: relative;
          z-index: 1;
        }
        
        .team-profile-avatar {
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
        
        .team-profile-info {
          flex: 1;
        }
        
        .team-profile-name {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        
        .team-profile-status {
          display: inline-block;
          background: rgba(255, 222, 89, 0.9);
          color: #0f2161;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .team-profile-details {
          display: flex;
          flex-direction: column;
          gap: 15px;
          position: relative;
          z-index: 1;
        }
        
        .team-profile-group {
          background: rgba(255, 255, 255, 0.15);
          padding: 16px;
          border-radius: 12px;
          backdrop-filter: blur(5px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s ease;
        }
        
        .team-profile-group:active {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(0.98);
        }
        
        .team-profile-label {
          font-size: 14px;
          opacity: 0.9;
          font-weight: 500;
        }
        
        .team-profile-value {
          font-size: 16px;
          font-weight: 600;
          text-align: right;
        }
        
        .team-invitation-code {
          background: rgba(255, 222, 89, 0.9);
          color: #0f2161;
          padding: 6px 12px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 14px;
        }

        /* Responsive Design */
        @media (max-width: 340px) {
          .team-profile-group {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          
          .team-profile-value {
            text-align: left;
            width: 100%;
          }
          
          .team-profile-header {
            flex-direction: column;
            text-align: center;
          }
          
          .team-profile-avatar {
            margin-right: 0;
            margin-bottom: 15px;
          }
        }

        @media (min-width: 768px) {
          .team-profile-section {
            max-width: 500px;
            margin: 20px auto;
          }
        }
      `}</style>
    </div>
  );
}

export default Team;