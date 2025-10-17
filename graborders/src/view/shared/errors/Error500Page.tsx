import { i18n } from "../../../i18n";
import { Link } from "react-router-dom";

function Error500Page() {
  return (
    <div className="app__error">
      <div className="error__content">
        <div className="error-illustration">
          <div className="error-code">500</div>
        </div>
        <h1>Server Error</h1>
        <div className="desc">
          {i18n("errors.500") || "Something went wrong on our end. Our team has been notified and we're working to fix it."}
        </div>
        
        <Link to="/">
          <button className="btn btn-primary" type="button">
            <i className="fas fa-home"></i>
            {i18n("errors.backToHome") || "Back to Home"}
          </button>
        </Link>
        
        <div className="support-text">
          If the problem persists, contact our support team
        </div>
      </div>

      {/* Bottom Navigation */}


      <style>{`
        .app__error {
          background: linear-gradient(135deg, #f5f9ff 0%, #f0f4ff 100%);
          color: #333;
          min-height: 100vh;
          padding-bottom: 80px;
          max-width: 400px;
          margin: 0 auto;
          position: relative;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Header Styles */
        .header {
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          color: white;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 4px 12px rgba(15, 33, 97, 0.2);
          border-radius: 0 0 16px 16px;
        }

        .logo {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 0.5px;
        }

        .logo span {
          color: #ffde59;
        }

        /* Error Content */
        .error__content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          text-align: center;
        }

        .error-illustration {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
          position: relative;
          box-shadow: 0 10px 30px rgba(15, 33, 97, 0.2);
        }

        .error-code {
          width: 150px;
          height: 150px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          color: #0f2161;
          font-weight: bold;
        }

        .error__content h1 {
          color: #0f2161;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .desc {
          color: #7b8796;
          font-size: 16px;
          line-height: 1.5;
          margin-bottom: 30px;
          max-width: 300px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          color: white;
          border: none;
          border-radius: 16px;
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(15, 33, 97, 0.2);
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.2s ease;
          margin-bottom: 20px;
          text-decoration: none;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(15, 33, 97, 0.3);
        }

        .btn-primary:active {
          transform: translateY(0);
        }

        .support-text {
          color: #7b8796;
          font-size: 14px;
          margin-top: 10px;
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

        .nav-item.active i {
          transform: scale(1.2);
          color: #0f2161;
        }

        .nav-item i {
          font-size: 20px;
          margin-bottom: 4px;
          transition: all 0.2s ease;
        }

        /* Responsive adjustments */
        @media (max-width: 340px) {
          .error-illustration {
            width: 150px;
            height: 150px;
          }
          
          .error-code {
            width: 120px;
            height: 120px;
            font-size: 36px;
          }
          
          .error__content h1 {
            font-size: 24px;
          }
          
          .desc {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}

export default Error500Page;