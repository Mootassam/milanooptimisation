import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import SubHeader from "src/view/shared/Header/SubHeader";
import Message from "src/view/shared/message";

function CryptoDeposit() {
  const [amount, setAmount] = useState("");
  const [txid, setTxid] = useState("");
  const qrCodeRef = useRef(null);

  // USDT Wallet data
  const usdtWallet = {
    symbol: "USDT",
    name: "Tether (TRC20)",
    address: "TXYZ1234567890abcdefghijklmnopqrstuvw",
    icon: "fas fa-coins",
    color: "#26a17b",
    minDeposit: 10
  };

  const copyToClipboard = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          Message.success("Copied to clipboard!");
        })
        .catch((error) => {
          console.error("Error copying to clipboard:", error);
        });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      Message.success("Copied to clipboard!");
    }
  };

  const handleDeposit = () => {
    if (!amount || !txid) {
      Message.error("Please fill in all required fields");
      return;
    }

    const minAmount = usdtWallet.minDeposit;
    if (parseFloat(amount) < minAmount) {
      Message.error(`Minimum deposit is ${minAmount} ${usdtWallet.symbol}`);
      return;
    }

    // Here you would typically dispatch an action to process the deposit
    Message.success("Deposit request submitted! Waiting for confirmation.");
    // Reset form
    setAmount("");
    setTxid("");
  };

  // Bottom Navigation Items
  const navItems = [
    {
      path: "/",
      name: "Home",
      icon: "fas fa-home"
    },
    {
      path: "/recharge",
      name: "Recharge",
      icon: "fas fa-wallet"
    },
    {
      path: "/grap",
      name: "Grap",
      icon: "fas fa-hand-holding-usd"
    },
    {
      path: "/order",
      name: "Order",
      icon: "fas fa-shopping-cart"
    },
    {
      path: "/account",
      name: "Account",
      icon: "fas fa-user"
    }
  ];

  return (
    <>
      {/* Header */}



      <SubHeader title="USDT Deposit" />

      {/* USDT Only Notice */}
      <div className="usdt-notice">
        <div className="usdt-badge">
          <i className="fas fa-check-circle" />
          Only USDT Accepted
        </div>
        <div className="usdt-message">
          We currently only support USDT (TRC20) deposits. Please do not send any other cryptocurrency to this address.
        </div>
      </div>

      {/* Wallet Address Section */}
      <div className="wallet-section">
        <div className="section-title">
          <i className="fas fa-wallet" />
          USDT Deposit Address
        </div>
        
        <div className="qr-code-container">
          <div className="qr-code-placeholder">
            <i className="fas fa-qrcode" />
            <span>USDT QR Code</span>
          </div>
        </div>

        <div className="address-container">
          <div className="address-label">Your USDT (TRC20) Address</div>
          <div className="address-value" ref={qrCodeRef}>
            {usdtWallet.address}
          </div>
          <button 
            className="copy-btn"
            onClick={() => copyToClipboard(usdtWallet.address)}
          >
            <i className="fas fa-copy" />
            Copy Address
          </button>
        </div>

        <div className="deposit-notice">
          <i className="fas fa-exclamation-triangle" />
          <div className="notice-content">
            <strong>Important:</strong> Send only <strong>USDT (TRC20)</strong> to this address. 
            Sending any other cryptocurrency (BTC, ETH, etc.) will result in permanent loss of funds.
          </div>
        </div>
      </div>

      {/* Deposit Form Section */}
      <div className="form-section">
        <div className="section-title">
          <i className="fas fa-edit" />
          Deposit Details
        </div>

        <div className="form-group">
          <label className="form-label">
            Amount (USDT) *
          </label>
          <div className="input-container">
            <input
              type="number"
              className="form-input"
              placeholder={`Minimum ${usdtWallet.minDeposit} USDT`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              step="any"
            />
          </div>
          <div className="input-hint">
            Minimum deposit: {usdtWallet.minDeposit} USDT
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Transaction ID (TXID) *
          </label>
          <div className="input-container">
            <input
              type="text"
              className="form-input"
              placeholder="Enter your USDT transaction hash"
              value={txid}
              onChange={(e) => setTxid(e.target.value)}
            />
          </div>
          <div className="input-hint">
            Find this in your wallet's USDT transaction history
          </div>
        </div>

        <button 
          className="deposit-submit-btn"
          onClick={handleDeposit}
        >
          <i className="fas fa-paper-plane" />
          Submit USDT Deposit
        </button>
      </div>

      {/* Important Notices */}
      <div className="notices-section">
        <div className="notice-item">
          <i className="fas fa-shield-alt" />
          <div className="notice-text">
            <strong>Network Confirmations:</strong> USDT requires 12 confirmations (≈ 20 minutes)
          </div>
        </div>
        <div className="notice-item">
          <i className="fas fa-clock" />
          <div className="notice-text">
            <strong>Processing Time:</strong> USDT deposits usually within 30 minutes after confirmations
          </div>
        </div>
        <div className="notice-item">
          <i className="fas fa-network-wired" />
          <div className="notice-text">
            <strong>Network:</strong> Make sure to use <strong>TRC20 network only</strong> when sending USDT
          </div>
        </div>
        <div className="notice-item">
          <i className="fas fa-ban" />
          <div className="notice-text">
            <strong>Restriction:</strong> We do NOT accept USDT on ERC20, BEP20, or any other networks
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
        
        /* USDT Only Notice */
        .usdt-notice {
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          margin: 15px;
          padding: 20px;
          border-radius: 16px;
          color: white;
          box-shadow: 0 5px 15px rgba(15, 33, 97, 0.2);
        }
        
        .usdt-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 10px;
        }
        
        .usdt-badge i {
          font-size: 18px;
        }
        
        .usdt-message {
          font-size: 14px;
          opacity: 0.9;
          line-height: 1.4;
        }
        
        /* Section Common Styles */
        .wallet-section,
        .form-section,
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
        
        /* Wallet Address Section */
        .qr-code-container {
          padding: 30px 20px;
          display: flex;
          justify-content: center;
          border-bottom: 1px solid #f5f6f7;
        }
        
        .qr-code-placeholder {
          width: 200px;
          height: 200px;
          background: #f8f9fa;
          border: 2px dashed #dee2e6;
          border-radius: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #7b8796;
          font-size: 14px;
        }
        
        .qr-code-placeholder i {
          font-size: 50px;
          margin-bottom: 10px;
        }
        
        .address-container {
          padding: 20px;
          border-bottom: 1px solid #f5f6f7;
        }
        
        .address-label {
          font-size: 14px;
          color: #7b8796;
          margin-bottom: 10px;
          font-weight: 600;
        }
        
        .address-value {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 12px;
          font-family: monospace;
          font-size: 14px;
          word-break: break-all;
          margin-bottom: 15px;
          border: 1px solid #e9ecef;
          color: #0f2161;
        }
        
        .copy-btn {
          width: 100%;
          padding: 15px;
          background: #0f2161;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
        }
        
        .copy-btn:active {
          transform: scale(0.98);
          background: #1a3a8f;
        }
        
        .deposit-notice {
          padding: 15px 20px;
          background: #fff8e1;
          border-radius: 10px;
          margin: 15px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          border-left: 4px solid #e6b400;
        }
        
        .deposit-notice i {
          color: #e6b400;
          margin-top: 2px;
        }
        
        .notice-content {
          flex: 1;
          font-size: 13px;
          color: #8a6d3b;
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
          .qr-code-placeholder {
            width: 180px;
            height: 180px;
          }
          
          .address-value {
            font-size: 12px;
          }
          
          .usdt-message {
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
}

export default CryptoDeposit;