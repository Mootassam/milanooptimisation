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

  useEffect(() => { }, [currentUser]);

  const onSubmit = ({ amount, withdrawPassword }) => {
    const values = {
      status: "pending",
      date: new Date(),
      user: currentUser ? currentUser.id : null,
      type: "withdraw",
      amount: amount,
      vip: currentUser,
      withdrawPassword: withdrawPassword,
    };
    dispatch(authActions.doRefreshCurrentUser());
    dispatch(actions.doCreate(values));
  };

  const [initialValues] = useState({
    amount: "",
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  return (
    <div className="withdraw-page-container">
      <SubHeader title="Withdraw" path="/" />

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
                {/* Amount Input */}
                <div className="withdraw-input-group">
                  <div className="withdraw-input-label">
                    <span className="required-asterisk">*</span>
                    <span className="label-text">Withdrawal Amount </span>
                  </div>
                  <InputFormItem
                    type="number"
                    name="amount"
                    placeholder="Enter amount (minimum $20 )"
                    className="withdraw-input-field"
                  />
                </div>

                {/* Withdraw Password Input */}
                <div className="withdraw-input-group">
                  <div className="withdraw-input-label">
                    <span className="required-asterisk">*</span>
                    <span className="label-text">Withdrawal Password</span>
                  </div>
                  <InputFormItem
                    type="password"
                    name="withdrawPassword"
                    placeholder="Enter your withdrawal password"
                    className="withdraw-input-field"
                  />
                </div>

                {/* Submit Button */}
                <div className="withdraw-actions">
                  {currentUser.withdraw ? (
                    <button className="withdraw-confirm-btn" type="submit">
                      <i className="fas fa-paper-plane btn-icon" />
                      Confirm Withdrawal
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

        {/* Rules Section */}
        <div className="withdraw-rules-card">
          <div className="rules-header">
            <i className="fas fa-info-circle rules-icon" />
            <h3 className="rules-title">Rules Description</h3>
          </div>

          <ul className="rules-list">
            <li className="rules-list-item">
              <span className="rule-number">(1)</span>
              <span className="rule-text">Minimum withdrawal is $20 </span>
            </li>
            <li className="rules-list-item">
              <span className="rule-number">(2)</span>
              <span className="rule-text">
                The payment shall be made within 48 hours after withdrawal application is approved
              </span>
            </li>
            <li className="rules-list-item">
              <span className="rule-number">(3)</span>
              <span className="rule-text">
                Incomplete daily order submission is subjected to no withdrawal, all products must be submitted for withdrawal
              </span>
            </li>
          </ul>
        </div>
      </div>

      <style>{`
        .withdraw-page-container {
          min-height: 100vh;
          background: #f5f7fa;
          padding-bottom: 40px;
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
          padding: 25px 20px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        /* Header Section */
        .withdraw-header-section {
          margin-bottom: 25px;
          padding-bottom: 20px;
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
          gap: 20px;
        }

        .withdraw-input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .withdraw-input-label {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .required-asterisk {
          color: #e81f1f;
          font-weight: bold;
        }

        .label-text {
          color: #0f2161;
          font-size: 14px;
          font-weight: 600;
        }

        .withdraw-input-field {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #f0f4ff;
          border-radius: 12px;
          background: #fafbfc;
          font-size: 14px;
          transition: all 0.2s ease;
          color: #0f2161;
        }

        .withdraw-input-field:focus {
          outline: none;
          border-color: #0f2161;
          background: white;
          box-shadow: 0 0 0 3px rgba(15, 33, 97, 0.1);
        }

        .withdraw-input-field::placeholder {
          color: #a8b5c4;
        }

        /* Button Styles */
        .withdraw-actions {
          margin-top: 10px;
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

        .withdraw-confirm-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(15, 33, 97, 0.3);
        }

        .withdraw-confirm-btn:active {
          transform: translateY(0);
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
          // gap: 12px;
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

        /* Responsive Design */
        @media (max-width: 480px) {
          .withdraw-content-section {
            padding: 15px 10px;
          }

          .withdraw-main-card,
          .withdraw-rules-card {
            padding: 20px 0px;
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