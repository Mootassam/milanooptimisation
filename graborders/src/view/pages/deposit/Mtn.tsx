import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "src/view/layout/Header";
import SubHeader from "src/view/shared/Header/SubHeader";
import Message from "src/view/shared/message";

function MobileMoneyDeposit() {
    const [amount, setAmount] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [selectedProvider, setSelectedProvider] = useState("mtn");

    // Mobile Money Providers
    const providers = [
        {
            id: "mtn",
            name: "MTN Mobile Money",
            icon: "fas fa-sim-card",
            color: "#ffcc00",
            description: "Deposit using your MTN mobile money",
            minDeposit: 5,
            maxDeposit: 5000
        },
        {
            id: "airtel",
            name: "Airtel Money",
            icon: "fas fa-wifi",
            color: "#e60000",
            description: "Deposit using your Airtel money",
            minDeposit: 5,
            maxDeposit: 5000
        },
        {
            id: "telecel",
            name: "Telecel Money",
            icon: "fas fa-broadcast-tower",
            color: "#00aaff",
            description: "Deposit using your Telecel money",
            minDeposit: 5,
            maxDeposit: 5000
        },
        {
            id: "orange",
            name: "Orange Money",
            icon: "fas fa-bolt",
            color: "#ff6600",
            description: "Deposit using your Orange money",
            minDeposit: 5,
            maxDeposit: 5000
        }
    ];

    const currentProvider = providers.find(provider => provider.id === selectedProvider);

    const handleDeposit = () => {
        if (!amount || !phoneNumber) {
            Message.error("Please fill in all required fields");
            return;
        }

        const minAmount = currentProvider.minDeposit;
        const maxAmount = currentProvider.maxDeposit;
        const depositAmount = parseFloat(amount);

        if (depositAmount < minAmount) {
            Message.error(`Minimum deposit is $${minAmount}`);
            return;
        }

        if (depositAmount > maxAmount) {
            Message.error(`Maximum deposit is $${maxAmount}`);
            return;
        }

        // Phone number validation (basic)
        if (phoneNumber.length < 10) {
            Message.error("Please enter a valid phone number");
            return;
        }

        // Here you would typically dispatch an action to process the deposit
        Message.success(`Deposit request submitted for $${amount}! You will receive a prompt on your ${currentProvider.name}.`);

        // Reset form
        setAmount("");
        setPhoneNumber("");
    };


    return (
        <>

 <Header
        title="Mobile Money Deposit"
        showBackButton={true}
        showLogo={false}
        showNotification={true}
      />
        

            {/* Provider Selection */}
            <div className="provider-section">
                <div className="section-title">
                    <i className="fas fa-mobile-alt" />
                    Select Mobile Money Provider
                </div>
                <div className="provider-options">
                    {providers.map((provider) => (
                        <div
                            key={provider.id}
                            className={`provider-option ${selectedProvider === provider.id ? 'active' : ''}`}
                            onClick={() => setSelectedProvider(provider.id)}
                        >
                            <div
                                className="provider-icon"
                                style={{ backgroundColor: `${provider.color}20`, color: provider.color }}
                            >
                                <i className={provider.icon} />
                            </div>
                            <div className="provider-info">
                                <div className="provider-name">{provider.name}</div>
                                <div className="provider-desc">{provider.description}</div>
                            </div>
                            <div className="provider-check">
                                {selectedProvider === provider.id && (
                                    <i className="fas fa-check-circle" style={{ color: provider.color }} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Deposit Form Section */}
            <div className="form-section">
                <div className="section-title">
                    <i className="fas fa-edit" />
                    Deposit Details - {currentProvider.name}
                </div>

                <div className="form-group">
                    <label className="form-label">
                        Phone Number *
                    </label>
                    <div className="input-container">
                        <input
                            type="tel"
                            className="form-input"
                            placeholder="Enter your mobile money number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="input-hint">
                        Enter the phone number linked to your {currentProvider.name} account
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">
                        Amount (USD) *
                    </label>
                    <div className="input-container">
                        <input
                            type="number"
                            className="form-input"
                            placeholder={`Enter amount ($${currentProvider.minDeposit} - $${currentProvider.maxDeposit})`}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            step="any"
                        />
                    </div>
                    <div className="input-hint">
                        Minimum: ${currentProvider.minDeposit} | Maximum: ${currentProvider.maxDeposit}
                    </div>
                </div>

                <button
                    className="deposit-submit-btn"
                    onClick={handleDeposit}
                >
                    <i className="fas fa-paper-plane" />
                    Deposit with {currentProvider.name}
                </button>
            </div>

            {/* Instructions Section */}
            <div className="instructions-section">
                <div className="section-title">
                    <i className="fas fa-info-circle" />
                    How to Deposit
                </div>
                <div className="instructions-list">
                    <div className="instruction-step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            Enter your phone number and deposit amount
                        </div>
                    </div>
                    <div className="instruction-step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            Click "Deposit" to initiate the transaction
                        </div>
                    </div>
                    <div className="instruction-step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            You will receive a prompt on your phone
                        </div>
                    </div>
                    <div className="instruction-step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                            Enter your Mobile Money PIN to confirm
                        </div>
                    </div>
                    <div className="instruction-step">
                        <div className="step-number">5</div>
                        <div className="step-content">
                            Funds will be added to your account instantly
                        </div>
                    </div>
                </div>
            </div>

            {/* Important Notices */}
            <div className="notices-section">
                <div className="notice-item">
                    <i className="fas fa-shield-alt" />
                    <div className="notice-text">
                        <strong>Security:</strong> Your transaction is secured with SSL encryption
                    </div>
                </div>
                <div className="notice-item">
                    <i className="fas fa-bolt" />
                    <div className="notice-text">
                        <strong>Instant Processing:</strong> Deposits are processed instantly after confirmation
                    </div>
                </div>
                <div className="notice-item">
                    <i className="fas fa-phone" />
                    <div className="notice-text">
                        <strong>Requirements:</strong> Ensure your mobile money account is active and has sufficient funds
                    </div>
                </div>
            </div>

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
        
        /* Section Common Styles */
        .provider-section,
        .form-section,
        .instructions-section,
        .notices-section {
          background: white;
          border-radius: 20px;
          margin: 15px;
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
        
        /* Provider Selection */
        .provider-options {
          padding: 15px 0;
        }
        
        .provider-option {
          display: flex;
          align-items: center;
          padding: 15px 20px;
          border-bottom: 1px solid #f5f6f7;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .provider-option:active {
          background: #f9f9f9;
        }
        
        .provider-option:last-child {
          border-bottom: none;
        }
        
        .provider-option.active {
          background: #f0f4ff;
        }
        
        .provider-icon {
          width: 50px;
          height: 50px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-right: 15px;
        }
        
        .provider-info {
          flex: 1;
        }
        
        .provider-name {
          font-weight: 700;
          color: #0f2161;
          margin-bottom: 4px;
          font-size: 16px;
        }
        
        .provider-desc {
          font-size: 13px;
          color: #7b8796;
        }
        
        .provider-check {
          color: #26a17b;
          font-size: 20px;
        }
        
        /* Form Section */
        .form-group {
          padding: 15px 20px;
          border-bottom: 1px solid #f5f6f7;
        }
        
        .form-group:last-child {
          border-bottom: none;
        }
        
        .form-label {
          display: block;
          font-weight: 600;
          color: #0f2161;
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .input-container {
          margin-bottom: 8px;
        }
        
        .form-input {
          width: 100%;
          padding: 15px;
          border: 2px solid #f0f4ff;
          border-radius: 12px;
          font-size: 16px;
          background: white;
          transition: all 0.2s ease;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #0f2161;
        }
        
        .input-hint {
          font-size: 12px;
          color: #7b8796;
        }
        
        .deposit-submit-btn {
          width: calc(100% - 40px);
          margin: 20px;
          padding: 18px;
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(15, 33, 97, 0.2);
        }
        
        .deposit-submit-btn:active {
          transform: scale(0.98);
        }
        
        /* Instructions Section */
        .instructions-list {
          padding: 20px;
        }
        
        .instruction-step {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .instruction-step:last-child {
          margin-bottom: 0;
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
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
        }
        
        .step-content {
          flex: 1;
          font-size: 14px;
          color: #7b8796;
          line-height: 1.4;
          padding-top: 5px;
        }
        
        /* Notices Section */
        .notices-section {
          padding: 20px;
        }
        
        .notice-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 15px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 12px;
        }
        
        .notice-item:last-child {
          margin-bottom: 0;
        }
        
        .notice-item i {
          color: #0f2161;
          margin-top: 2px;
          font-size: 16px;
        }
        
        .notice-text {
          flex: 1;
          font-size: 13px;
          color: #7b8796;
          line-height: 1.4;
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
        }
        
        .nav-item i {
          font-size: 20px;
          margin-bottom: 4px;
        }
        
        /* Responsive Design */
        @media (max-width: 340px) {
          .provider-icon {
            width: 45px;
            height: 45px;
            font-size: 20px;
          }
          
          .provider-name {
            font-size: 15px;
          }
          
          .step-content {
            font-size: 13px;
          }
        }
      `}</style>
        </>
    );
}

export default MobileMoneyDeposit;