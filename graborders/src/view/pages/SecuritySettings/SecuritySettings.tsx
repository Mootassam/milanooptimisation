import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";

function SecuritySettings() {
  return (
    <div className="security-settings-container">
      <SubHeader title="Security Settings" path="/profile" />
      
      <div className="security-settings-section">
        {/* Security Tips Card */}
        <div className="security-tips-card">
          <div className="tips-header">
            <i className="fas fa-shield-alt tips-icon" />
            <h3 className="tips-title">Security Tips</h3>
          </div>
          
          <div className="tips-content">
            <div className="tip-category">
              <h4 className="category-title">Password Security</h4>
              <ul className="tips-list">
                <li className="tip-item">
                  <i className="fas fa-check-circle tip-icon" />
                  <span>Use a strong, unique password with at least 8 characters including uppercase, lowercase, numbers, and symbols</span>
                </li>
                <li className="tip-item">
                  <i className="fas fa-check-circle tip-icon" />
                  <span>Never reuse passwords across different websites or services</span>
                </li>
                <li className="tip-item">
                  <i className="fas fa-check-circle tip-icon" />
                  <span>Change your password regularly, at least every 3 months</span>
                </li>
                <li className="tip-item">
                  <i className="fas fa-check-circle tip-icon" />
                  <span>Avoid using personal information like birthdays or names in your passwords</span>
                </li>
              </ul>
            </div>

            <div className="tip-category">
              <h4 className="category-title">Account Protection</h4>
              <ul className="tips-list">
                <li className="tip-item">
                  <i className="fas fa-check-circle tip-icon" />
                  <span>Enable two-factor authentication for an extra layer of security</span>
                </li>
                <li className="tip-item">
                  <i className="fas fa-check-circle tip-icon" />
                  <span>Always log out from shared or public computers</span>
                </li>
                <li className="tip-item">
                  <i className="fas fa-check-circle tip-icon" />
                  <span>Regularly review your account activity and connected devices</span>
                </li>
                <li className="tip-item">
                  <i className="fas fa-check-circle tip-icon" />
                  <span>Be cautious of phishing emails and never click suspicious links</span>
                </li>
              </ul>
            </div>

            <div className="tip-category">
              <h4 className="category-title">Device Security</h4>
              <ul className="tips-list">
                <li className="tip-item">
                  <i className="fas fa-check-circle tip-icon" />
                  <span>Keep your operating system and browser updated</span>
                </li>
                <li className="tip-item">
                  <i className="fas fa-check-circle tip-icon" />
                  <span>Use antivirus software and keep it updated</span>
                </li>
                <li className="tip-item">
                  <i className="fas fa-check-circle tip-icon" />
                  <span>Avoid using public Wi-Fi for sensitive transactions</span>
                </li>
                <li className="tip-item">
                  <i className="fas fa-check-circle tip-icon" />
                  <span>Enable screen lock on your mobile devices</span>
                </li>
              </ul>
            </div>

            <div className="tip-category">
              <h4 className="category-title">General Safety</h4>
              <ul className="tips-list">
                <li className="tip-item">
                  <i className="fas fa-check-circle tip-icon" />
                  <span>Never share your login credentials with anyone</span>
                </li>
                <li className="tip-item">
                  <i className="fas fa-check-circle tip-icon" />
                  <span>Be wary of unsolicited requests for personal information</span>
                </li>
                <li className="tip-item">
                  <i className="fas fa-check-circle tip-icon" />
                  <span>Regularly backup important data</span>
                </li>
                <li className="tip-item">
                  <i className="fas fa-check-circle tip-icon" />
                  <span>Use a password manager to securely store your passwords</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="security-reminder">
            <i className="fas fa-exclamation-triangle reminder-icon" />
            <div className="reminder-content">
              <h5 className="reminder-title">Important Reminder</h5>
              <p className="reminder-text">
                Your security is our priority. Following these tips will help protect your account 
                from unauthorized access and keep your information safe.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .security-settings-container {
          min-height: 100vh;
          background: #f5f7fa;
          padding-bottom: 40px;
        }

        /* Main Section */
        .security-settings-section {
          padding: 20px 15px;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Security Tips Card */
        .security-tips-card {
          background: white;
          border-radius: 20px;
          padding: 30px 25px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .tips-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f4ff;
        }

        .tips-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #f0f4ff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f2161;
          font-size: 24px;
        }

        .tips-title {
          color: #0f2161;
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }

        .tips-content {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .tip-category {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .category-title {
          color: #0f2161;
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          padding-left: 10px;
          border-left: 4px solid #0f2161;
        }

        .tips-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .tip-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px 15px;
          background: #f8f9ff;
          border-radius: 12px;
          border: 1px solid #f0f4ff;
          transition: all 0.2s ease;
        }

        .tip-item:hover {
          border-color: #0f2161;
          background: white;
          transform: translateX(5px);
        }

        .tip-icon {
          color: #2ecc71;
          font-size: 16px;
          margin-top: 2px;
          flex-shrink: 0;
        }

        .tip-item span {
          color: #7b8796;
          font-size: 14px;
          line-height: 1.5;
          font-weight: 500;
        }

        /* Security Reminder */
        .security-reminder {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 20px;
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          border-radius: 16px;
          margin-top: 30px;
          color: white;
        }

        .reminder-icon {
          font-size: 24px;
          color: #ffdd59;
          margin-top: 2px;
        }

        .reminder-content {
          flex: 1;
        }

        .reminder-title {
          color: white;
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .reminder-text {
          color: rgba(255, 255, 255, 0.9);
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .security-settings-section {
            padding: 15px 10px;
          }

          .security-tips-card {
            padding: 20px 15px;
          }

          .tips-header {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .tips-icon {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }

          .tips-title {
            font-size: 20px;
          }

          .tip-item {
            padding: 10px 12px;
          }

          .security-reminder {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
        }

        @media (min-width: 768px) {
          .security-settings-section {
            max-width: 600px;
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default SecuritySettings;