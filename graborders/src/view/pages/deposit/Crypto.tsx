import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SubHeader from "src/view/shared/Header/SubHeader";
import Message from "src/view/shared/message";
import actions from 'src/modules/deposit/form/depositFormActions';
import selector from "src/modules/deposit/form/depositFormSelectors";
import InputFormItem from "src/shared/form/InputFormItem";
import { i18n } from "../../../i18n";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import QRCode from "react-qr-code";
import Header from "src/view/layout/Header";
import CompanyListActions from "src/modules/company/list/companyListActions";
import companySelector from "src/modules/company/list/companyListSelectors";
// Validation Schema
const schema = yup.object().shape({
  amount: yupFormSchemas.decimal(
    i18n("deposit.fields.amount"),
    {
      required: true,
      min: 10 // Minimum deposit amount
    }
  ),
  txid: yupFormSchemas.string(
    i18n("deposit.fields.txid"),
    {
      required: true,
      min: 10 // Minimum transaction ID length
    }
  ),
});

function CryptoDeposit() {
  const dispatch = useDispatch();
  const qrCodeRef = useRef(null);

  const wallet = useSelector(companySelector.selectRows)

  // Redux selectors
  const showErrorModal = useSelector(selector.modalError);
  const record = useSelector(selector.selectRecord);
  const showModal = useSelector(selector.selectModal);
  const loading = useSelector(selector.selectSaveLoading); // Assuming you have loading selector




  useEffect(() => {
    dispatch(CompanyListActions.doFetch())


  }, [dispatch])



  // USDT Wallet data
  const usdtWallet = {
    symbol: "USDT",
    name: "Tether (TRC20)",
    address: wallet[0]?.trc20,
    icon: "fas fa-coins",
    color: "#26a17b",
    minDeposit: 10
  };

  // Form initialization
  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      amount: "",
      txid: "",
      paymentMethod: 'crypto'
    },
  });

  const onSubmit = (data) => {

    data.paymentMethod = 'crypto';
    dispatch(actions.doCreate(data));
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

  const closeSuccessModal = () => {
    dispatch(actions.closeModal());
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
      <Header
        title="USDT Deposit"
        showBackButton={true}
        showLogo={false}
        showNotification={true}
      />
      {/* Success Modal */}
      {showModal && record && (
        <div className="modal-overlay">
          <div className="modal-container success-modal">
            <div className="modal-header">
              <div className="modal-icon success">
                <i className="fas fa-check-circle" />
              </div>
              <h3 className="modal-title">Deposit Verified Successfully!</h3>
            </div>

            <div className="modal-content">
              <div className="verification-details">
                <div className="detail-item">
                  <span className="detail-label">Transaction ID:</span>
                  <span className="detail-value">{record.txid}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Amount:</span>
                  <span className="detail-value">{record.amount} USDT</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Sender:</span>
                  <span className="detail-value">{record.sender}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Receiver:</span>
                  <span className="detail-value">{record.receiver}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Network:</span>
                  <span className="detail-value">{record.contract_type}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value success-text">Confirmed</span>
                </div>
              </div>

              <div className="success-message">
                <i className="fas fa-info-circle" />
                Your deposit has been successfully verified and will be credited to your account shortly.
              </div>
            </div>

            <div className="modal-actions">
              <button className="modal-btn primary" onClick={closeSuccessModal}>
                <i className="fas fa-check" />
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="modal-overlay">
          <div className="modal-container error-modal">
            <div className="modal-header">
              <div className="modal-icon error">
                <i className="fas fa-exclamation-triangle" />
              </div>
              <h3 className="modal-title">Verification Failed</h3>
            </div>

            <div className="modal-content">
              <div className="error-message">
                <div className="suggestion-item">
                  <i className="fas fa-network-wired" />
                  <span>Ensure you're using TRC20 network</span>
                </div>
                <div className="suggestion-item">
                  <i className="fas fa-check-double" />
                  <span>Verify transaction is confirmed on blockchain</span>
                </div>
                <div className="suggestion-item">
                  <i className="fas fa-address-card" />
                  <span>Check if you sent to correct deposit address</span>
                </div>
                <div className="suggestion-item">
                  <i className="fas fa-coins" />
                  <span>Confirm minimum deposit amount is met</span>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="modal-btn secondary" onClick={closeSuccessModal}>
                <i className="fas fa-times" />
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
            <QRCode value={usdtWallet.address} />
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
      <FormProvider {...form}>
        <div className="form-section">
          <div className="section-title">
            <i className="fas fa-edit" />
            Deposit Details
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)}>

            <div style={
              { padding: '0px 15px' }
            }>
              <InputFormItem
                label="Amount (USDT) *"
                name="amount"
                placeholder={`Minimum ${usdtWallet.minDeposit} USDT`}
                iname="fas fa-coins"
                externalErrorMessage={null}
              />

              <InputFormItem
                label="Transaction ID (TXID) *"
                name="txid"
                placeholder="Enter your USDT transaction hash"
                type="text"
                iname="fas fa-receipt"
                externalErrorMessage={null}
              />
            </div>


            <button
              className="deposit-submit-btn"
              type="submit"
              disabled={loading}
            >
              <i className="fas fa-paper-plane" />
              {loading ? "Submitting..." : "Submit USDT Deposit"}
            </button>
          </form>
        </div>
      </FormProvider>

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
          max-height: 90vh;
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
          padding: 30px 25px 20px;
          text-align: center;
          border-bottom: 1px solid #f0f4ff;
        }
        
        .modal-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 40px;
        }
        
        .modal-icon.success {
          background: #e8f5e8;
          color: #26a17b;
        }
        
        .modal-icon.error {
          background: #ffe8e8;
          color: #e74c3c;
        }
        
        .modal-title {
          font-size: 22px;
          font-weight: 700;
          color: #0f2161;
          margin: 0;
        }
        
        .modal-content {
          padding: 25px;
        }
        
        .verification-details {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 20px;
        }
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e9ecef;
        }
        
        .detail-item:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        
        .detail-label {
          font-weight: 600;
          color: #7b8796;
          font-size: 13px;
          flex-shrink: 0;
          margin-right: 10px;
        }
        
        .detail-value {
          color: #0f2161;
          font-size: 13px;
          text-align: right;
          word-break: break-all;
          font-family: monospace;
        }
        
        .success-text {
          color: #26a17b;
          font-weight: 700;
        }
        
        .success-message {
          background: #e8f5e8;
          border: 1px solid #26a17b;
          border-radius: 10px;
          padding: 15px;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #26a17b;
          font-size: 13px;
        }
        
        .error-message {
          background: #ffe8e8;
          border: 1px solid #e74c3c;
          border-radius: 10px;
          padding: 15px;
          color: #e74c3c;
          font-size: 14px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 600;
        }
        
        .error-suggestions {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 20px;
        }
        
        .suggestion-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          color: #7b8796;
          font-size: 13px;
        }
        
        .suggestion-item:last-child {
          margin-bottom: 0;
        }
        
        .suggestion-item i {
          color: #0f2161;
          font-size: 14px;
          width: 16px;
        }
        
        .modal-actions {
          padding: 20px 25px 30px;
          display: flex;
          gap: 12px;
        }
        
        .modal-btn {
          flex: 1;
          padding: 15px;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
          font-size: 14px;
        }
        
        .modal-btn.primary {
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          color: white;
        }
        
        .modal-btn.secondary {
          background: #f8f9fa;
          color: #7b8796;
        }
        
        .modal-btn:active {
          transform: scale(0.98);
        }
        
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
        
        .deposit-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .deposit-submit-btn:active:not(:disabled) {
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
          
          .modal-container {
            margin: 10px;
          }
        }
      `}</style>
    </>
  );
}

export default CryptoDeposit;