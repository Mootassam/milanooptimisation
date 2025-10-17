import React, { useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import * as yup from "yup";
import { i18n } from "../../../i18n";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import actions from 'src/modules/auth/authActions';
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";
import ButtonIcon from "src/shared/ButtonIcon";

const schema = yup.object().shape({
  oldPassword: yupFormSchemas.string(i18n("user.fields.oldPassword"), {
    required: true,
  }),
  newPassword: yupFormSchemas.string(i18n("user.fields.newPassword"), {
    required: true,
  }),
  newPasswordConfirmation: yupFormSchemas
    .string(i18n("user.fields.newPasswordConfirmation"), {
      required: true,
    })
    .oneOf(
      [yup.ref("newPassword"), null],
      i18n("auth.passwordChange.mustMatch")
    ),
});

function ChangePassword() {
  const dispatch = useDispatch();
  const [initialValues] = useState(() => ({
    oldPassword: "",
    newPassword: "",
    newPasswordConfirmation: "",
  }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: initialValues,
  });

  const saveLoading = useSelector(selectors.selectLoadingPasswordChange);

  const onSubmit = (values) => {
    dispatch(actions.doChangePassword(values.oldPassword, values.newPassword));
  };

  return (
    <div className="change-password-container">
      <SubHeader title="Change password" path="/profile" />
      
      <div className="change-password-section">
        <div className="change-password-card">
          <div className="change-password-header">
            <i className="fas fa-lock change-password-icon" />
            <h3 className="change-password-title">Change Password</h3>
            <p className="change-password-subtitle">Update your account password</p>
          </div>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="change-password-form">
              <div className="change-password-fields">
                <div className="change-password-group">
                  <div className="change-password-label">
                    <span className="required-asterisk">*</span>
                    <span className="label-text">Old Password</span>
                  </div>
                  <div className="change-password-input">
                    <InputFormItem
                      type="password"
                      name="oldPassword"
                      autoComplete="old-password"
                      placeholder="Enter your current password"
                      className="password-input-field"
                    />
                  </div>
                </div>

                <div className="change-password-group">
                  <div className="change-password-label">
                    <span className="required-asterisk">*</span>
                    <span className="label-text">New Password</span>
                  </div>
                  <div className="change-password-input">
                    <InputFormItem
                      type="password"
                      name="newPassword"
                      autoComplete="new-password"
                      placeholder="Enter your new password"
                      className="password-input-field"
                    />
                  </div>
                </div>

                <div className="change-password-group">
                  <div className="change-password-label">
                    <span className="required-asterisk">*</span>
                    <span className="label-text">Confirm Password</span>
                  </div>
                  <div className="change-password-input">
                    <InputFormItem
                      type="password"
                      name="newPasswordConfirmation"
                      autoComplete="new-password"
                      placeholder="Confirm your new password"
                      className="password-input-field"
                    />
                  </div>
                </div>
              </div>

              <div className="change-password-actions">
                <button 
                  className="change-password-submit-btn"
                  disabled={saveLoading}
                  type="submit"
                >
                  <ButtonIcon
                    loading={saveLoading}
                    iconClass="far fa-save"
                  />
                  &nbsp;Update Password
                </button>
                
                <div className="change-password-note">
                  <i className="fas fa-info-circle note-icon" />
                  <span className="note-text">
                    <b>Note:</b> Please fill out this information carefully
                  </span>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>

      <style>{`
        .change-password-container {
          min-height: 100vh;
          background: #f5f7fa;
          padding-bottom: 40px;
        }

        /* Change Password Section */
        .change-password-section {
          padding: 20px 15px;
        }

        .change-password-card {
          background: white;
          border-radius: 20px;
          padding: 25px 20px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          max-width: 500px;
          margin: 0 auto;
        }

        .change-password-header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f0f4ff;
        }

        .change-password-icon {
          font-size: 48px;
          color: #0f2161;
          margin-bottom: 15px;
          background: #f0f4ff;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
        }

        .change-password-title {
          color: #0f2161;
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .change-password-subtitle {
          color: #7b8796;
          font-size: 14px;
          margin: 0;
        }

        /* Form Styles */
        .change-password-form {
          width: 100%;
        }

        .change-password-fields {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 30px;
        }

        .change-password-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .change-password-label {
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

        .change-password-input {
          width: 100%;
        }

        .password-input-field {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #f0f4ff;
          border-radius: 12px;
          background: #fafbfc;
          font-size: 14px;
          transition: all 0.2s ease;
          color: #0f2161;
        }

        .password-input-field:focus {
          outline: none;
          border-color: #0f2161;
          background: white;
          box-shadow: 0 0 0 3px rgba(15, 33, 97, 0.1);
        }

        .password-input-field::placeholder {
          color: #a8b5c4;
        }

        /* Button Styles */
        .change-password-actions {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: center;
        }

        .change-password-submit-btn {
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
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
          max-width: 300px;
          box-shadow: 0 4px 15px rgba(15, 33, 97, 0.2);
        }

        .change-password-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(15, 33, 97, 0.3);
        }

        .change-password-submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .change-password-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        /* Note Section */
        .change-password-note {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          background: #fff8e1;
          border-radius: 12px;
          border: 1px solid #ffeaa7;
          width: 100%;
        }

        .note-icon {
          color: #e6b400;
          font-size: 16px;
        }

        .note-text {
          color: #8d6e00;
          font-size: 13px;
          font-weight: 500;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .change-password-card {
            padding: 20px 15px;
            margin: 0 10px;
          }

          .change-password-title {
            font-size: 20px;
          }

          .change-password-icon {
            font-size: 40px;
            width: 70px;
            height: 70px;
          }

          .change-password-submit-btn {
            padding: 14px 24px;
            font-size: 15px;
          }
        }

        @media (min-width: 768px) {
          .change-password-section {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default ChangePassword;