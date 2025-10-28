import React, { useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import * as yup from "yup";
import { i18n } from "../../../i18n";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/modules/auth/authActions";
import InputFormItem from "src/shared/form/InputFormItem";
import selector from "src/modules/auth/authSelectors";
import Header from "src/view/layout/Header";

const schema = yup.object().shape({
  trc20: yupFormSchemas.string(i18n("user.fields.trc20"), {
    required: true,
  }),
});

function Wallet() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selector.selectCurrentUser);

  const [initialValues] = useState(() => {
    return {
      trc20:  currentUser.trc20,
      erc20:currentUser.erc20,
      walletname:  currentUser.walletname,
      usernamewallet: currentUser.usernamewallet,
      balance: currentUser?.balance
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const onSubmit = ({ erc20, trc20, walletname, usernamewallet }) => {
    const values = {
      erc20: erc20,
      trc20: trc20,
      walletname: walletname,
      usernamewallet: usernamewallet,
      balance: currentUser.balance
    };
    dispatch(actions.doUpdateProfile(values));
  };

  return (
    <div className="wallet-settings-container">
       <Header
        title="Wallet"
        showBackButton={true}
        showLogo={false}
        showNotification={true}
      />
      <div className="wallet-settings-section">
        <div className="wallet-settings-card">
          {/* Header Section */}
          <div className="wallet-settings-header">
            <div className="wallet-header-icon">
              <i className="fas fa-wallet" />
            </div>
            <div className="wallet-header-content">
              <h3 className="wallet-main-title">Withdrawal Method Information</h3>
              <p className="wallet-subtitle">Update your wallet details for withdrawals</p>
            </div>
          </div>

          {/* Form Section */}
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="wallet-settings-form">
              <div className="wallet-form-content">
                <div style={{ padding: '0px 15px' }}>
                  {/* Username Input */}
                  <InputFormItem
                    label="Username *"
                    name="usernamewallet"
                    placeholder="Enter your username"
                    iname="fas fa-user"
                    type="text"
                    externalErrorMessage={null}
                  />

                  {/* Wallet Name Input */}
                  <InputFormItem
                    label="Wallet Name *"
                    name="walletname"
                    placeholder="Enter wallet name"
                    iname="fas fa-wallet"
                    type="text"
                    externalErrorMessage={null}
                  />

                  {/* Wallet Address Input */}
                  <InputFormItem
                    label="Wallet Address *"
                    name="trc20"
                    placeholder="Enter your wallet address"
                    iname="fas fa-address-card"
                    type="text"
                    externalErrorMessage={null}
                  />
                </div>

                {/* Submit Button */}
                <div className="wallet-actions">
                  <button className="wallet-submit-btn" type="submit">
                    <i className="fas fa-save btn-icon" />
                    Update Wallet Information
                  </button>
                  
                  <div className="wallet-note">
                    <i className="fas fa-exclamation-triangle note-icon" />
                    <span className="note-text">
                      <b>Note:</b> The above provided details cannot be modified, so please ensure you fill it out correctly.
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>

        {/* Current Balance Display */}
        <div className="wallet-balance-card">
          <div className="balance-header">
            <i className="fas fa-chart-line balance-icon" />
            <h4 className="balance-title">Current Balance</h4>
          </div>
          <div className="balance-amount">
            {currentUser?.balance?.toFixed(2) || "0.00"} USDT
          </div>
          <div className="balance-info">
            Available for withdrawal after setting up your wallet
          </div>
        </div>
      </div>

      <style>{`
        .wallet-settings-container {
          min-height: 100vh;
          background: #f5f7fa;
          padding-bottom: 40px;
        }

        /* Main Section */
        .wallet-settings-section {
          padding: 20px 0px;
          max-width: 500px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Main Card */
        .wallet-settings-card {
          background: white;
          border-radius: 20px;
          padding: 25px 0px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        /* Header Section */
        .wallet-settings-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          padding: 0px 20px 20px;
          border-bottom: 1px solid #f0f4ff;
        }

        .wallet-header-icon {
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

        .wallet-header-content {
          flex: 1;
        }

        .wallet-main-title {
          color: #0f2161;
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 5px 0;
        }

        .wallet-subtitle {
          color: #7b8796;
          font-size: 14px;
          margin: 0;
        }

        /* Form Styles */
        .wallet-settings-form {
          width: 100%;
        }

        .wallet-form-content {
          display: flex;
          flex-direction: column;
          gap: 0px;
        }

        /* Button Styles */
        .wallet-actions {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
          padding: 0px 20px;
          margin-top: 10px;
        }

        .wallet-submit-btn {
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

        .wallet-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(15, 33, 97, 0.3);
        }

        .wallet-submit-btn:active {
          transform: translateY(0);
        }

        .btn-icon {
          font-size: 16px;
        }

        /* Note Section */
        .wallet-note {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 16px;
          background: #fff8e1;
          border-radius: 12px;
          border: 1px solid #ffeaa7;
          width: 100%;
        }

        .note-icon {
          color: #e6b400;
          font-size: 16px;
          margin-top: 2px;
        }

        .note-text {
          color: #8d6e00;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.4;
        }

        /* Balance Card */
        .wallet-balance-card {
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          border-radius: 20px;
          padding: 25px 20px;
          color: white;
          text-align: center;
          box-shadow: 0 5px 15px rgba(15, 33, 97, 0.15);
        }

        .balance-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .balance-icon {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.9);
        }

        .balance-title {
          color: white;
          font-size: 16px;
          font-weight: 600;
          margin: 0;
        }

        .balance-amount {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 8px;
          color: #ffdd59;
        }

        .balance-info {
          font-size: 13px;
          opacity: 0.9;
          color: rgba(255, 255, 255, 0.8);
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .wallet-settings-section {
            padding: 15px 10px;
          }

          .wallet-settings-card {
            padding: 20px 0px;
          }

          .wallet-settings-header {
            padding: 0px 15px 20px;
          }

          .wallet-actions {
            padding: 0px 15px;
          }

          .wallet-main-title {
            font-size: 20px;
          }

          .wallet-header-icon {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }

          .wallet-submit-btn {
            padding: 14px 20px;
            font-size: 15px;
          }

          .balance-amount {
            font-size: 28px;
          }
        }

        @media (min-width: 768px) {
          .wallet-settings-section {
            max-width: 500px;
            padding: 30px 0px;
          }
        }
      `}</style>
    </div>
  );
}

export default Wallet;