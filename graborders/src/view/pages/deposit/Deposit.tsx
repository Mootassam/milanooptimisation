import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import authSelectors from "src/modules/auth/authSelectors";
import Header from "src/view/layout/Header";
import SubHeader from "src/view/shared/Header/SubHeader";

function Deposit() {

  const currentUser = useSelector(authSelectors.selectCurrentUser);
  // Payment methods data
  const paymentMethods = [
    {
      id: 1,
      name: "Crypto",
      description: "BTC, ETH, USDT, and other cryptocurrencies",
      icon: "fas fa-coins",
      color: "#f7931a",
      path: "/deposit/crypto"
    },
    {
      id: 2,
      name: "Mobile Money",
      description: "MTN, Airtel, Telecel, Orange",
      icon: "fas fa-mobile-alt",
      color: "#0f2161",
      path: "/deposit/mobile-money"
    }
  ];

 




  return (
    <>
      {/* Header */}


      <Header
        title="Deposit Funds"
        showBackButton={true}
        showLogo={false}
        showNotification={true}
      />

      {/* Balance Overview */}
      <div className="balance-overview">
        <div className="balance-label">Available Balance</div>
        <div className="balance-amount">${currentUser?.balance.toFixed(0)}</div>
        <div className="balance-currency">USD</div>
      </div>

      {/* Payment Methods Section */}
      <div className="payment-section">
        <div className="section-title">
          <i className="fas fa-credit-card" />
          Select Payment Method
        </div>

        <div className="payment-methods">
          {paymentMethods.map((method) => (
            <Link
              key={method.id}
              to={method.path}
              className="payment-method"
            >
              <div className="method-left">
                <div
                  className="method-icon"
                  style={{ backgroundColor: `${method.color}20`, color: method.color }}
                >
                  <i className={method.icon} />
                </div>
                <div className="method-info">
                  <div className="method-name">{method.name}</div>
                  <div className="method-desc">{method.description}</div>
                </div>
              </div>
              <div className="method-arrow">
                <i className="fas fa-chevron-right" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}


      {/* Bottom Navigation */}


      <style>{`
        /* Header Styles */
        .deposit-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 15px 10px;
          background: white;
          border-bottom: 1px solid #f0f0f0;
        }
        
        .back-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f2161;
          text-decoration: none;
          font-size: 18px;
        }
        
        .deposit-title {
          font-size: 20px;
          font-weight: 700;
          color: #0f2161;
          margin: 0;
        }
        
        .header-placeholder {
          width: 40px;
        }
        
        /* Balance Overview */
        .balance-overview {
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          margin: 15px;
          padding: 25px 20px;
          border-radius: 20px;
          color: white;
          text-align: center;
          box-shadow: 0 10px 20px rgba(15, 33, 97, 0.15);
        }
        
        .balance-label {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 8px;
        }
        
        .balance-amount {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 5px;
          letter-spacing: 0.5px;
        }
        
        .balance-currency {
          font-size: 14px;
          opacity: 0.8;
        }
        
        /* Payment Methods */
        .payment-section {
          background: white;
          border-radius: 20px;
          margin: 20px 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        
        .section-title {
          padding: 20px 20px 15px;
          font-size: 18px;
          font-weight: 700;
          color: #0f2161;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid #f5f6f7;
        }
        
        .section-title i {
          color: #7b8796;
          font-size: 16px;
        }
        
        .payment-methods {
          padding: 10px 0;
        }
        
        .payment-method {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          border-bottom: 1px solid #f5f6f7;
          text-decoration: none;
          color: #333;
          transition: all 0.2s ease;
        }
        
        .payment-method:active {
          background: #f9f9f9;
        }
        
        .payment-method:last-child {
          border-bottom: none;
        }
        
        .method-left {
          display: flex;
          align-items: center;
          gap: 15px;
          flex: 1;
        }
        
        .method-icon {
          width: 50px;
          height: 50px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }
        
        .method-info {
          flex: 1;
        }
        
        .method-name {
          font-weight: 600;
          color: #0f2161;
          margin-bottom: 4px;
          font-size: 16px;
        }
        
        .method-desc {
          font-size: 13px;
          color: #7b8796;
        }
        
        .method-arrow {
          color: #7b8796;
          font-size: 14px;
        }
        
        /* Transactions Section */
        .transactions-section {
          background: white;
          border-radius: 20px;
          margin: 20px 15px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }
        
        .empty-state {
          padding: 40px 20px;
          text-align: center;
          color: #7b8796;
        }
        
        .empty-state i {
          font-size: 50px;
          margin-bottom: 15px;
          opacity: 0.5;
        }
        
        .empty-state p {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #0f2161;
        }
        
        .empty-state span {
          font-size: 14px;
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
        }
        
        .nav-item i {
          font-size: 20px;
          margin-bottom: 4px;
        }
        
        /* Responsive Design */
        @media (max-width: 340px) {
          .balance-amount {
            font-size: 28px;
          }
          
          .method-icon {
            width: 45px;
            height: 45px;
            font-size: 20px;
          }
          
          .method-name {
            font-size: 15px;
          }
        }
      `}</style>
    </>
  );
}

export default Deposit;