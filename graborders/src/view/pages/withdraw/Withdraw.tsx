
import React, { useEffect, useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import authSelectors from "src/modules/auth/authSelectors";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import * as yup from "yup";
import { i18n } from "../../../i18n";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import InputFormItem from "src/shared/form/InputFormItem";
import actions from "src/modules/transaction/form/transactionFormActions";
import authActions from "src/modules/auth/authActions";
import selector from "src/modules/transaction/form/transactionFormSelectors";
import transactionFormActions from "src/modules/transaction/form/transactionFormActions";
import Header from "src/view/layout/Header";

const schema = yup.object().shape({
  amount: yupFormSchemas.integer(i18n("entities.transaction.fields.amount"), {
    required: true,
    min: 20,
  }),
  withdrawPassword: yupFormSchemas.string(
    i18n("user.fields.withdrawPassword"),
    {
      required: true,
    }
  ),
});

function Withdraw() {
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const dispatch = useDispatch();
  
  const WITHDRAWAL_CHARGE_RATE = 3.1; // 3.1% charge

  // Use Redux state for modal and loading
  const showModal = useSelector(selector.selectModal);
  const loading = useSelector(selector.selectSaveLoading);

  // State for modal display values
  const [modalValues, setModalValues] = useState({
    withdrawalAmount: 0,
    chargeAmount: 0,
    netAmount: 0
  });

  useEffect(() => { }, [currentUser]);

  const [initialValues] = useState({
    amount: "",
    withdrawPassword: "",
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  // Calculate net amount when withdrawal amount changes
  const calculateNetAmount = (amount) => {
    const amountNum = parseFloat(amount) || 0;
    const charge = (amountNum * WITHDRAWAL_CHARGE_RATE) / 100;
    const net = amountNum - charge;
    
    return { amountNum, charge, net };
  };

  // Watch the amount field for changes
  const watchedAmount = form.watch('amount');

  const onSubmit = async ({ amount, withdrawPassword }) => {
    const { amountNum, charge, net } = calculateNetAmount(amount);
    
    // Set modal values BEFORE dispatching the action
    setModalValues({
      withdrawalAmount: amountNum,
      chargeAmount: charge,
      netAmount: net
    });

    const values = {
      status: "pending",
      date: new Date(),
      user: currentUser ? currentUser.id : null,
      type: "withdraw",
      amount: net, // Submit the NET amount after fee deduction
      originalAmount: amountNum, // Keep original for reference
      chargeAmount: charge, // Fee amount
      chargeRate: WITHDRAWAL_CHARGE_RATE, // Fee rate
      vip: currentUser.vip,
      withdrawPassword: withdrawPassword,
      paymentMethod: 'crypto',
      walletAddress: currentUser.trc20
    };
    
    await dispatch(actions.doCreate(values));
    form.reset();
  };

  const handleCloseModal = () => {
    dispatch(transactionFormActions.doClose());
    // Reset modal values when modal closes
    setModalValues({
      withdrawalAmount: 0,
      chargeAmount: 0,
      netAmount: 0
    });
  };

  // Calculate current form values for display
  const { amountNum: currentAmount, charge: currentCharge, net: currentNet } = calculateNetAmount(watchedAmount);

  return (
    <div className="withdraw-page-container">
      <Header
        title="Withdraw"
        showBackButton={true}
        showLogo={false}
        showNotification={true}
      />
      <div className="withdraw-content-section">
        <div className="withdraw-main-card">
          {/* Header Section */}
          <div className="withdraw-header-section">
            <div className="withdraw-title-group">
              <i className="fas fa-money-bill-wave withdraw-main-icon" />
              <h3 className="withdraw-main-title">Withdraw Amount</h3>
            </div>
            <div className="withdraw-balance-info">
              <i className="fas fa-wallet balance-icon" />
              <span className="balance-text">
                Available balance: <strong>${currentUser?.balance?.toFixed(2) || 0} </strong>
              </span>
            </div>
          </div>

          {/* Form Section */}
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="withdraw-form">
              <div className="withdraw-form-content">

                <div style={{ padding: '0px 15px' }}>
                  {/* Amount Input */}
                  <InputFormItem
                    label="Withdrawal Amount *"
                    name="amount"
                    placeholder="Enter amount (minimum $20)"
                    iname="fas fa-coins"
                    type="number"
                    externalErrorMessage={null}
                    disabled={loading}
                  />

                  {/* Net Amount Display */}
                  {watchedAmount && parseFloat(watchedAmount) >= 20 && (
                    <div className="amount-calculation-section">
                      <div className="calculation-row">
                        <span className="calculation-label">Requested Amount:</span>
                        <span className="calculation-value original">${currentAmount.toFixed(2)}</span>
                      </div>
                      <div className="calculation-row">
                        <span className="calculation-label">Withdrawal Charge ({WITHDRAWAL_CHARGE_RATE}%):</span>
                        <span className="calculation-value charge">- ${currentCharge.toFixed(2)}</span>
                      </div>
                      <div className="calculation-row total">
                        <span className="calculation-label">Amount You Will Receive:</span>
                        <span className="calculation-value net-amount">${currentNet.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  {/* Withdraw Password Input */}
                  <InputFormItem
                    label="Withdrawal Password *"
                    name="withdrawPassword"
                    placeholder="Enter your withdrawal password"
                    iname="fas fa-lock"
                    type="password"
                    externalErrorMessage={null}
                    disabled={loading}
                  />
                </div>

                {/* Submit Button */}
                <div className="withdraw-actions">
                  {currentUser.withdraw ? (
                    <button
                      className={`withdraw-confirm-btn ${loading ? 'loading' : ''}`}
                      type="submit"
                      disabled={loading || !watchedAmount || parseFloat(watchedAmount) < 20}
                    >
                      {loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin btn-icon" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane btn-icon" />
                          Confirm Withdrawal
                        </>
                      )}
                    </button>
                  ) : (
                    <button className="withdraw-disabled-btn" disabled={true}>
                      <i className="fas fa-lock btn-icon" />
                      Withdrawal Disabled
                    </button>
                  )}
                </div>
              </div>
            </form>
          </FormProvider>
        </div>

        {/* Rules Section - Updated with charge info */}
        <div className="withdraw-rules-card">
          <div className="rules-header">
            <i className="fas fa-info-circle rules-icon" />
            <h3 className="rules-title">Rules Description</h3>
          </div>

          <ul className="rules-list">
            <li className="rules-list-item">
              <span className="rule-number">(1)</span>
              <span className="rule-text">Minimum withdrawal is $20</span>
            </li>
            <li className="rules-list-item">
              <span className="rule-number">(2)</span>
              <span className="rule-text">
                Withdrawal charge: {WITHDRAWAL_CHARGE_RATE}% applied on all withdrawals
              </span>
            </li>
            <li className="rules-list-item">
              <span className="rule-number">(3)</span>
              <span className="rule-text">
                The payment shall be made within 48 hours after withdrawal application is approved
              </span>
            </li>
            <li className="rules-list-item">
              <span className="rule-number">(4)</span>
              <span className="rule-text">
                Incomplete daily order submission is subjected to no withdrawal, all products must be submitted for withdrawal
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Success Modal - Now uses modalValues state */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Success Icon */}
            <div className="success-icon">
              <i className="fas fa-check-circle" />
            </div>

            {/* Modal Header */}
            <div className="modal-header">
              <h2 className="modal-title">Withdrawal Successful!</h2>
              <p className="modal-subtitle">
                Your withdrawal request has been submitted successfully
              </p>
            </div>

            {/* Amount Display */}
            <div className="amount-display">
              <div className="amount-breakdown">
                <div className="breakdown-row">
                  <span className="breakdown-label">Requested Amount:</span>
                  <span className="breakdown-value">${modalValues.withdrawalAmount.toFixed(2)}</span>
                </div>
                <div className="breakdown-row">
                  <span className="breakdown-label">Withdrawal Charge ({WITHDRAWAL_CHARGE_RATE}%):</span>
                  <span className="breakdown-value charge">- ${modalValues.chargeAmount.toFixed(2)}</span>
                </div>
                <div className="breakdown-row total">
                  <span className="breakdown-label">Amount You Will Receive:</span>
                  <span className="breakdown-value net-amount">${modalValues.netAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="modal-info">
              <div className="info-item">
                <i className="fas fa-clock info-icon" />
                <span className="info-text">Processing Time: 24-48 hours</span>
              </div>
              <div className="info-item">
                <i className="fas fa-wallet info-icon" />
                <span className="info-text">Payment Method: USDT (TRC20)</span>
              </div>
              <div className="info-item">
                <i className="fas fa-shield-alt info-icon" />
                <span className="info-text">Status: Pending Approval</span>
              </div>
              <div className="info-item">
                <i className="fas fa-map-marker-alt info-icon" />
                <span className="info-text">Wallet: {currentUser?.trc20 || 'Not provided'}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-info-circle info-icon" />
                <span className="info-text">Submitted Amount: ${modalValues.netAmount.toFixed(2)} (after fee)</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="modal-actions">
              <button
                className="modal-confirm-btn"
                onClick={handleCloseModal}
              >
                <i className="fas fa-check btn-icon" />
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .withdraw-page-container {
          min-height: 100vh;
          background: #f5f7fa;
          padding-bottom: 40px;
          position: relative;
        }

        /* Main Content Section */
        .withdraw-content-section {
          padding: 20px 0px;
          max-width: 500px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Main Card */
        .withdraw-main-card {
          background: white;
          border-radius: 20px;
          padding: 25px 0px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        /* Header Section */
        .withdraw-header-section {
          margin-bottom: 25px;
          padding: 0px 20px 20px;
          border-bottom: 1px solid #f0f4ff;
        }

        .withdraw-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 15px;
        }

        .withdraw-main-icon {
          font-size: 32px;
          color: #0f2161;
          background: #f0f4ff;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .withdraw-main-title {
          color: #0f2161;
          font-size: 22px;
          font-weight: 700;
          margin: 0;
        }

        .withdraw-balance-info {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: #f8f9ff;
          border-radius: 12px;
          border: 1px solid #e8ecff;
        }

        .balance-icon {
          color: #0f2161;
          font-size: 16px;
        }

        .balance-text {
          color: #0f2161;
          font-size: 14px;
          font-weight: 500;
        }

        .balance-text strong {
          color: #1a3a8f;
        }

        /* Form Styles */
        .withdraw-form-content {
          display: flex;
          flex-direction: column;
          gap: 0px;
        }

        /* Amount Calculation Section */
        .amount-calculation-section {
          background: #f8f9ff;
          border-radius: 12px;
          padding: 16px;
          margin: 15px 0;
          border: 1px solid #e8ecff;
        }

        .calculation-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
        }

        .calculation-row.total {
          border-top: 2px solid #e8ecff;
          margin-top: 8px;
          padding-top: 12px;
        }

        .calculation-label {
          color: #7b8796;
          font-size: 14px;
          font-weight: 500;
        }

        .calculation-value {
          font-size: 14px;
          font-weight: 600;
        }

        .calculation-value.original {
          color: #0f2161;
        }

        .calculation-value.charge {
          color: #e74c3c;
        }

        .calculation-value.net-amount {
          color: #27ae60;
          font-size: 16px;
        }

        /* Button Styles */
        .withdraw-actions {
          margin-top: 10px;
          padding: 0px 20px;
        }

        .withdraw-confirm-btn {
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          color: white;
          border: none;
          border-radius: 16px;
          padding: 16px 24px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          box-shadow: 0 4px 15px rgba(15, 33, 97, 0.2);
        }

        .withdraw-confirm-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(15, 33, 97, 0.3);
        }

        .withdraw-confirm-btn:active {
          transform: translateY(0);
        }

        .withdraw-confirm-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .withdraw-confirm-btn.loading {
          background: linear-gradient(135deg, #7b8796 0%, #9aa5b1 100%);
        }

        .withdraw-disabled-btn {
          background: #7b8796;
          color: white;
          border: none;
          border-radius: 16px;
          padding: 16px 24px;
          font-size: 16px;
          font-weight: 600;
          cursor: not-allowed;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          opacity: 0.7;
        }

        .btn-icon {
          font-size: 16px;
        }

        /* Rules Section */
        .withdraw-rules-card {
          background: white;
          border-radius: 20px;
          padding: 25px 20px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        .rules-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .rules-icon {
          font-size: 24px;
          color: #0f2161;
          background: #f0f4ff;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rules-title {
          color: #0f2161;
          font-size: 18px;
          font-weight: 700;
          margin: 0;
        }

        .rules-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
        }

        .rules-list-item {
          display: flex;
          gap: 8px;
          padding: 12px 0;
          border-bottom: 1px solid #f5f6f7;
        }

        .rules-list-item:last-child {
          border-bottom: none;
        }

        .rule-number {
          color: #0f2161;
          font-weight: 700;
          font-size: 14px;
          min-width: 30px;
        }

        .rule-text {
          color: #7b8796;
          font-size: 14px;
          line-height: 1.4;
          flex: 1;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 24px;
          padding: 30px;
          max-width: 400px;
          width: 100%;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          animation: modalSlideIn 0.3s ease-out;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .success-icon {
          font-size: 80px;
          color: #27ae60;
          margin-bottom: 20px;
          animation: successBounce 0.6s ease-out;
        }

        @keyframes successBounce {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .modal-header {
          margin-bottom: 25px;
        }

        .modal-title {
          color: #0f2161;
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .modal-subtitle {
          color: #7b8796;
          font-size: 14px;
          margin: 0;
          line-height: 1.4;
        }

        .amount-display {
          background: linear-gradient(135deg, #f8f9ff 0%, #e8ecff 100%);
          border-radius: 16px;
          padding: 20px;
          margin: 20px 0;
          border: 2px solid #f0f4ff;
        }

        .amount-breakdown {
          width: 100%;
        }

        .breakdown-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
        }

        .breakdown-row.total {
          border-top: 2px solid #e8ecff;
          margin-top: 10px;
          padding-top: 15px;
        }

        .breakdown-label {
          color: #7b8796;
          font-size: 14px;
          font-weight: 500;
        }

        .breakdown-value {
          font-size: 14px;
          font-weight: 600;
        }

        .breakdown-value.charge {
          color: #e74c3c;
        }

        .breakdown-value.net-amount {
          color: #27ae60;
          font-size: 18px;
          font-weight: 700;
        }

        .modal-info {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 20px;
          margin: 20px 0;
          text-align: left;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
        }

        .info-item:not(:last-child) {
          border-bottom: 1px solid #e9ecef;
        }

        .info-icon {
          color: #0f2161;
          font-size: 14px;
          width: 16px;
        }

        .info-text {
          color: #7b8796;
          font-size: 13px;
          font-weight: 500;
        }

        .modal-actions {
          margin-top: 25px;
        }

        .modal-confirm-btn {
          background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
          color: white;
          border: none;
          border-radius: 16px;
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
        }

        .modal-confirm-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(39, 174, 96, 0.4);
        }

        .modal-confirm-btn:active {
          transform: translateY(0);
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .withdraw-content-section {
            padding: 15px 10px;
          }

          .withdraw-main-card {
            padding: 20px 0px;
          }

          .withdraw-header-section {
            padding: 0px 15px 20px;
          }

          .withdraw-actions {
            padding: 0px 15px;
          }

          .withdraw-main-title {
            font-size: 20px;
          }

          .withdraw-main-icon {
            width: 50px;
            height: 50px;
            font-size: 24px;
          }

          .withdraw-confirm-btn,
          .withdraw-disabled-btn {
            padding: 14px 20px;
            font-size: 15px;
          }

          .modal-content {
            padding: 25px 20px;
            margin: 10px;
          }

          .modal-title {
            font-size: 22px;
          }

          .success-icon {
            font-size: 70px;
          }
        }

        @media (min-width: 768px) {
          .withdraw-content-section {
            max-width: 500px;
            padding: 30px 0px;
          }
        }
      `}</style>
    </div>
  );
}

export default Withdraw;