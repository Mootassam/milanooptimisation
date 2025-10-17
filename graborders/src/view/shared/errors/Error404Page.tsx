import { i18n } from "../../../i18n";
import { Link } from "react-router-dom";

function Error403Page() {
  return (
    <div className="error-403-container">
      <div className="error-403-content">
        {/* Error Icon */}
        <div className="error-403-icon">
          <i className="fas fa-ban" />
        </div>

        {/* Error Message */}
        <div className="error-403-text">
          <h1 className="error-403-title">Access Denied</h1>
          <p className="error-403-description">
            Sorry, you don't have permission to access this page. 
            This area is restricted to authorized users only.
          </p>
          <p className="error-403-subtext">
            If you believe this is an error, please contact your administrator 
            or check your account permissions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="error-403-actions">
          <Link to="/" className="error-primary-btn">
            <i className="fas fa-home" />
            {i18n("errors.backToHome")}
          </Link>
          <Link to="/profile" className="error-secondary-btn">
            <i className="fas fa-user" />
            Go to Profile
          </Link>
          <button 
            className="error-tertiary-btn"
            onClick={() => window.history.back()}
          >
            <i className="fas fa-arrow-left" />
            Go Back
          </button>
        </div>

      </div>

      <style>{`
        .error-403-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .error-403-content {
          background: white;
          border-radius: 24px;
          padding: 50px 40px;
          box-shadow: 0 20px 60px rgba(15, 33, 97, 0.1);
          text-align: center;
          max-width: 500px;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .error-403-content::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
        }

        /* Error Icon */
        .error-403-icon {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 30px;
          color: white;
          font-size: 48px;
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
        }

        /* Error Text */
        .error-403-text {
          margin-bottom: 40px;
        }

        .error-403-title {
          color: #0f2161;
          font-size: 32px;
          font-weight: 800;
          margin: 0 0 16px 0;
          line-height: 1.2;
        }

        .error-403-description {
          color: #7b8796;
          font-size: 16px;
          line-height: 1.6;
          margin: 0 0 12px 0;
          font-weight: 500;
        }

        .error-403-subtext {
          color: #a8b5c4;
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
        }

        /* Action Buttons */
        .error-403-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 30px;
        }

        .error-primary-btn,
        .error-secondary-btn,
        .error-tertiary-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 24px;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .error-primary-btn {
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(15, 33, 97, 0.2);
        }

        .error-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(15, 33, 97, 0.3);
        }

        .error-secondary-btn {
          background: #f0f4ff;
          color: #0f2161;
          border: 2px solid #e8ecff;
        }

        .error-secondary-btn:hover {
          background: #0f2161;
          color: white;
          border-color: #0f2161;
          transform: translateY(-2px);
        }

        .error-tertiary-btn {
          background: transparent;
          color: #7b8796;
          border: 2px solid #f0f4ff;
        }

        .error-tertiary-btn:hover {
          background: #f8f9ff;
          color: #0f2161;
          border-color: #0f2161;
        }

        /* Support Info */
        .error-403-support {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px;
          background: #f8f9ff;
          border-radius: 16px;
          border: 1px solid #e8ecff;
          text-align: left;
        }

        .support-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: #0f2161;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .support-info {
          flex: 1;
        }

        .support-info h4 {
          color: #0f2161;
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 4px 0;
        }

        .support-info p {
          color: #7b8796;
          font-size: 14px;
          margin: 0 0 8px 0;
          line-height: 1.4;
        }

        .support-link {
          color: #0f2161;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .support-link:hover {
          color: #1a3a8f;
          text-decoration: underline;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .error-403-container {
            padding: 15px;
          }

          .error-403-content {
            padding: 40px 25px;
          }

          .error-403-icon {
            width: 100px;
            height: 100px;
            font-size: 40px;
            margin-bottom: 25px;
          }

          .error-403-title {
            font-size: 28px;
          }

          .error-403-description {
            font-size: 15px;
          }

          .error-403-support {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .error-primary-btn,
          .error-secondary-btn,
          .error-tertiary-btn {
            padding: 14px 20px;
            font-size: 15px;
          }
        }

        @media (max-width: 340px) {
          .error-403-content {
            padding: 30px 20px;
          }

          .error-403-title {
            font-size: 24px;
          }

          .error-403-icon {
            width: 80px;
            height: 80px;
            font-size: 32px;
          }
        }

        /* Animation */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .error-403-content {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Error403Page;