import React from "react";
import SubHeader from "src/view/shared/Header/SubHeader";

function HelpSupport() {
  return (
    <div className="help-support-container">
      <SubHeader title="Help & Support" path="/profile" />
      
      <div className="help-support-section">
        {/* Main Help Card */}
        <div className="help-main-card">
          <div className="help-header">
            <div className="help-header-icon">
              <i className="fas fa-headset" />
            </div>
            <div className="help-header-content">
              <h3 className="help-main-title">Help & Support Center</h3>
              <p className="help-subtitle">
                We're here to help you. Find answers to common questions or contact our support team.
              </p>
            </div>
          </div>

          {/* Quick Help Options */}
          <div className="quick-help-grid">
            <div className="help-option-card">
              <div className="help-option-icon">
                <i className="fas fa-question-circle" />
              </div>
              <h4 className="help-option-title">FAQ</h4>
              <p className="help-option-desc">
                Find answers to frequently asked questions
              </p>
            </div>

            <div className="help-option-card">
              <div className="help-option-icon">
                <i className="fas fa-book" />
              </div>
              <h4 className="help-option-title">User Guide</h4>
              <p className="help-option-desc">
                Step-by-step instructions for all features
              </p>
            </div>

            <div className="help-option-card">
              <div className="help-option-icon">
                <i className="fas fa-comments" />
              </div>
              <h4 className="help-option-title">Live Chat</h4>
              <p className="help-option-desc">
                Chat with our support team in real-time
              </p>
            </div>

            <div className="help-option-card">
              <div className="help-option-icon">
                <i className="fas fa-envelope" />
              </div>
              <h4 className="help-option-title">Email Support</h4>
              <p className="help-option-desc">
                Send us an email and we'll respond within 24 hours
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <div className="section-header">
            <i className="fas fa-question-circle section-icon" />
            <h3 className="section-title">Frequently Asked Questions</h3>
          </div>

          <div className="faq-list">
            <div className="faq-item">
              <div className="faq-question">
                <i className="fas fa-q faq-icon" />
                <span>How do I reset my password?</span>
              </div>
              <div className="faq-answer">
                <i className="fas fa-a faq-icon" />
                <span>
                  To reset your password, go to Settings → Security → Change Password. 
                  You'll need to enter your current password and then set a new one. 
                  Make sure your new password is strong and unique.
                </span>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <i className="fas fa-q faq-icon" />
                <span>What is the minimum withdrawal amount?</span>
              </div>
              <div className="faq-answer">
                <i className="fas fa-a faq-icon" />
                <span>
                  The minimum withdrawal amount is 20 USDT. Withdrawals are processed 
                  within 24-48 hours after approval. Please ensure your wallet address 
                  is correct before submitting a withdrawal request.
                </span>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <i className="fas fa-q faq-icon" />
                <span>How can I update my personal information?</span>
              </div>
              <div className="faq-answer">
                <i className="fas fa-a faq-icon" />
                <span>
                  You can update your personal information in the Profile section. 
                  Some information like your registered email may require verification 
                  before changes take effect.
                </span>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <i className="fas fa-q faq-icon" />
                <span>Why is my transaction pending?</span>
              </div>
              <div className="faq-answer">
                <i className="fas fa-a faq-icon" />
                <span>
                  Transactions may be pending due to network congestion, security 
                  verification, or incomplete required information. Most transactions 
                  are processed within a few hours. If it takes longer, contact support.
                </span>
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                <i className="fas fa-q faq-icon" />
                <span>How do I enable two-factor authentication?</span>
              </div>
              <div className="faq-answer">
                <i className="fas fa-a faq-icon" />
                <span>
                  Go to Security Settings → Two-Factor Authentication and follow 
                  the setup instructions. You'll need an authenticator app like 
                  Google Authenticator or Authy to complete the setup.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="contact-section">
          <div className="section-header">
            <i className="fas fa-phone-alt section-icon" />
            <h3 className="section-title">Contact Information</h3>
          </div>

          <div className="contact-grid">
            <div className="contact-method">
              <div className="contact-icon">
                <i className="fas fa-envelope" />
              </div>
              <div className="contact-info">
                <h5 className="contact-title">Email Support</h5>
                <p className="contact-detail">support@yourapp.com</p>
                <p className="contact-response">Response time: Within 24 hours</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <i className="fas fa-comment-dots" />
              </div>
              <div className="contact-info">
                <h5 className="contact-title">Live Chat</h5>
                <p className="contact-detail">Available 24/7</p>
                <p className="contact-response">Instant response during business hours</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <i className="fas fa-phone" />
              </div>
              <div className="contact-info">
                <h5 className="contact-title">Phone Support</h5>
                <p className="contact-detail">+1 (555) 123-4567</p>
                <p className="contact-response">Mon-Fri, 9AM-6PM EST</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">
                <i className="fas fa-file-alt" />
              </div>
              <div className="contact-info">
                <h5 className="contact-title">Documentation</h5>
                <p className="contact-detail">User Guides & Tutorials</p>
                <p className="contact-response">Comprehensive help resources</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Tips */}
        <div className="support-tips-card">
          <div className="tips-header">
            <i className="fas fa-lightbulb tips-icon" />
            <h4 className="tips-title">Quick Support Tips</h4>
          </div>
          <ul className="tips-list">
            <li className="tip-item">
              <i className="fas fa-check tip-icon" />
              <span>Have your account information ready when contacting support</span>
            </li>
            <li className="tip-item">
              <i className="fas fa-check tip-icon" />
              <span>Check our FAQ section first - your question might already be answered</span>
            </li>
            <li className="tip-item">
              <i className="fas fa-check tip-icon" />
              <span>For faster resolution, include relevant transaction IDs or error codes</span>
            </li>
            <li className="tip-item">
              <i className="fas fa-check tip-icon" />
              <span>Take screenshots of any error messages you encounter</span>
            </li>
          </ul>
        </div>
      </div>

      <style>{`
        .help-support-container {
          min-height: 100vh;
          background: #f5f7fa;
          padding-bottom: 40px;
        }

        /* Main Section */
        .help-support-section {
          padding: 20px 0px;
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Main Help Card */
        .help-main-card {
          background: white;
          border-radius: 20px;
          padding: 25px 20px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .help-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
        }

        .help-header-icon {
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

        .help-header-content {
          flex: 1;
        }

        .help-main-title {
          color: #0f2161;
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 5px 0;
        }

        .help-subtitle {
          color: #7b8796;
          font-size: 14px;
          margin: 0;
          line-height: 1.4;
        }

        /* Quick Help Grid */
        .quick-help-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }

        .help-option-card {
          background: #f8f9ff;
          border: 2px solid #f0f4ff;
          border-radius: 16px;
          padding: 20px 0px;
          text-align: center;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .help-option-card:hover {
          border-color: #0f2161;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(15, 33, 97, 0.1);
        }

        .help-option-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #0f2161;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin: 0 auto 12px;
        }

        .help-option-title {
          color: #0f2161;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 8px 0;
        }

        .help-option-desc {
          color: #7b8796;
          font-size: 13px;
          margin: 0;
          line-height: 1.4;
        }

        /* Section Styles */
        .faq-section,
        .contact-section {
          background: white;
          border-radius: 20px;
          padding: 25px 20px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f4ff;
        }

        .section-icon {
          color: #0f2161;
          font-size: 20px;
        }

        .section-title {
          color: #0f2161;
          font-size: 20px;
          font-weight: 700;
          margin: 0;
        }

        /* FAQ List */
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .faq-item {
          background: #f8f9ff;
          border-radius: 12px;
          overflow: hidden;
        }

        .faq-question {
          background: #0f2161;
          color: white;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
        }

        .faq-answer {
          padding: 20px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          line-height: 1.6;
        }

        .faq-icon {
          font-size: 14px;
          font-weight: bold;
          margin-top: 2px;
        }

        .faq-question .faq-icon {
          color: #ffdd59;
        }

        .faq-answer .faq-icon {
          color: #2ecc71;
        }

        .faq-answer span {
          color: #7b8796;
          flex: 1;
        }

        /* Contact Grid */
        .contact-grid {
          display: grid;
          gap: 20px;
        }

        .contact-method {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          padding: 20px;
          background: #f8f9ff;
          border-radius: 12px;
          border: 1px solid #f0f4ff;
        }

        .contact-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: #0f2161;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .contact-info {
          flex: 1;
        }

        .contact-title {
          color: #0f2161;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 5px 0;
        }

        .contact-detail {
          color: #7b8796;
          font-size: 14px;
          font-weight: 500;
          margin: 0 0 4px 0;
        }

        .contact-response {
          color: #7b8796;
          font-size: 12px;
          margin: 0;
          opacity: 0.8;
        }

        /* Support Tips */
        .support-tips-card {
          background: white;
          border-radius: 20px;
          padding: 25px 20px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .tips-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .tips-icon {
          color: #0f2161;
          font-size: 20px;
        }

        .tips-title {
          color: #0f2161;
          font-size: 18px;
          font-weight: 700;
          margin: 0;
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
          gap: 10px;
          padding: 12px 0;
        }

        .tip-icon {
          color: #2ecc71;
          font-size: 14px;
          margin-top: 2px;
        }

        .tip-item span {
          color: #7b8796;
          font-size: 14px;
          line-height: 1.4;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .help-support-section {
            padding: 15px 10px;
          }

          .help-main-card,
          .faq-section,
          .contact-section,
          .support-tips-card {
            padding: 20px 0px;
          }

          .quick-help-grid,
          .contact-grid {
            grid-template-columns: 1fr;
          }

          .help-header {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .help-header-icon {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }

          .contact-method {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }
        }

        @media (min-width: 768px) {
          .help-support-section {
            max-width: 600px;
            padding: 30px 0px;
          }
        }
      `}</style>
    </div>
  );
}

export default HelpSupport;