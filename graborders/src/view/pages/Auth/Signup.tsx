import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/modules/auth/authActions";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import yupFormSchemas from "src/modules/shared/yup/yupFormSchemas";
import { i18n } from "../../../i18n";
import { yupResolver } from "@hookform/resolvers/yup";
import InputFormItem from "src/shared/form/InputFormItem";
import selectors from "src/modules/auth/authSelectors";
import ButtonIcon from "src/shared/ButtonIcon";

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n("user.fields.username"), {
    required: true,
  }),
  password: yupFormSchemas.string(i18n("user.fields.password"), {
    required: true,
  }),
  newPasswordConfirmation: yupFormSchemas
    .string(i18n("user.fields.newPasswordConfirmation"), {
      required: true,
    })
    .oneOf([yup.ref("password"), null], i18n("auth.passwordChange.mustMatch")),
  phoneNumber: yupFormSchemas.string(i18n("user.fields.phoneNumber"), {
    required: true,
  }),
  withdrawPassword: yupFormSchemas.string(
    i18n("user.fields.withdrawPassword"),
    {
      required: true,
    }
  ),
  invitationcode: yupFormSchemas.string(i18n("user.fields.invitationcode"), {
    required: true,
  }),
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});

function Signup() {
  const dispatch = useDispatch();
  const loading = useSelector(selectors.selectLoading);

  const [initialValues] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    withdrawPassword: "",
    invitationcode: "",
    rememberMe: true,
  });

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: initialValues,
  });

  const externalErrorMessage = useSelector(selectors.selectErrorMessage);

  const onSubmit = ({
    email,
    password,
    phoneNumber,
    withdrawPassword,
    invitationcode,
  }) => {
    dispatch(
      actions.doRegisterEmailAndPassword(
        email,
        password,
        phoneNumber,
        withdrawPassword,
        invitationcode
      )
    );
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="headers">
          <div className="logo">
            Mano<span>Mano</span>
          </div>
          <div className="tagline">DIY • Home • Garden</div>
        </div>
        
        <div className="form-container">
          <h1 className="welcome-text">Create Account</h1>
          <p className="subtitle">Create an account so you can explore all the existing features</p>
          
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Email */}
              <div className="input-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <i className="fas fa-envelope"></i>
                  <InputFormItem
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    className="auth-input"
                    externalErrorMessage={externalErrorMessage}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="input-group">
                <label>Phone Number</label>
                <div className="input-wrapper">
                  <i className="fas fa-phone"></i>
                  <InputFormItem
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    className="auth-input"
                  />
                </div>
              </div>

              {/* Withdrawal Password */}
              <div className="input-group">
                <label>Withdrawal Password</label>
                <div className="input-wrapper">
                  <i className="fas fa-key"></i>
                  <InputFormItem
                    type="password"
                    name="withdrawPassword"
                    placeholder="Create withdrawal password"
                    className="auth-input"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="input-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <i className="fas fa-lock"></i>
                  <InputFormItem
                    type="password"
                    name="password"
                    placeholder="Create your password"
                    className="auth-input"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="input-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <i className="fas fa-lock"></i>
                  <InputFormItem
                    type="password"
                    name="newPasswordConfirmation"
                    placeholder="Confirm your password"
                    className="auth-input"
                  />
                </div>
              </div>

              {/* Invitation Code */}
              <div className="input-group">
                <label>Invitation Code</label>
                <div className="input-wrapper">
                  <i className="fas fa-user-plus"></i>
                  <InputFormItem
                    type="text"
                    name="invitationcode"
                    placeholder="Enter invitation code"
                    className="auth-input"
                    externalErrorMessage={externalErrorMessage}
                  />
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="remember-forgot">
                <div className="remember">
                  <input type="checkbox" id="terms" />
                  <label htmlFor="terms">
                    I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button disabled={loading} type="submit" className="login-btn">
                {loading ? (
                  <ButtonIcon loading={loading} />
                ) : (
                  <>
                    <i className="fas fa-user-plus" style={{marginRight: '8px'}}></i>
                    Create Account
                  </>
                )}
              </button>
            </form>
          </FormProvider>

          {/* Sign In Link */}
          <div className="signup-link">
            Already have an account? <Link to="/auth/signin">Sign in now</Link>
          </div>
        </div>

        <div className="footer">
          <p>
            By creating an account, you agree to our <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>
          </p>
        </div>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .page-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px;
        }
        
        .container {
          width: 100%;
          max-width: 450px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(15, 33, 97, 0.15);
          overflow: hidden;
        }
        
        .headers {
          background: #0f2161;
          padding: 25px 20px;
          text-align: center;
        }
        
        .logo {
          color: white;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }
        
        .logo span {
          color: #ffde59;
        }
        
        .tagline {
          color: rgba(255, 255, 255, 0.85);
          font-size: 14px;
          margin-top: 6px;
        }
        
        .form-container {
          padding: 30px 25px;
        }
        
        .welcome-text {
          text-align: center;
          color: #0f2161;
          font-size: 24px;
          margin-bottom: 8px;
          font-weight: 700;
        }
        
        .subtitle {
          text-align: center;
          color: #7b8796;
          font-size: 14px;
          margin-bottom: 25px;
          line-height: 1.4;
        }
        
        .input-group {
          margin-bottom: 20px;
        }
        
        .input-group label {
          display: block;
          color: #0f2161;
          margin-bottom: 8px;
          font-weight: 500;
          font-size: 14px;
        }
        
        .input-wrapper {
          position: relative;
        }
        
        .input-wrapper i {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #0f2161;
          font-size: 18px;
          z-index: 2;
        }
        
        .auth-input {
          width: 100%;
          padding: 16px 45px;
          border: 2px solid #e1e5eb;
          border-radius: 12px;
          font-size: 16px;
          color: #0f2161;
          transition: all 0.3s ease;
          background: white;
        }
        
        .auth-input:focus {
          border-color: #0f2161;
          outline: none;
          box-shadow: 0 0 0 3px rgba(15, 33, 97, 0.1);
        }
        
        .auth-input::placeholder {
          color: #a8b5c4;
        }
        
        .remember-forgot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          font-size: 14px;
        }
        
        .remember {
          display: flex;
          align-items: center;
          color: #0f2161;
        }
        
        .remember input {
          margin-right: 8px;
          accent-color: #0f2161;
        }
        
        .remember a {
          color: #0f2161;
          text-decoration: none;
          font-weight: 500;
        }
        
        .remember a:hover {
          text-decoration: underline;
        }
        
        .login-btn {
          width: 100%;
          padding: 16px;
          background: #0f2161;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .login-btn:hover:not(:disabled) {
          background: #1a387a;
          transform: translateY(-1px);
        }
        
        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .signup-link {
          text-align: center;
          font-size: 14px;
          color: #7b8796;
          margin-top: 10px;
        }
        
        .signup-link a {
          color: #0f2161;
          text-decoration: none;
          font-weight: 600;
        }
        
        .signup-link a:hover {
          text-decoration: underline;
        }
        
        .footer {
          text-align: center;
          padding: 20px;
          color: #7b8796;
          font-size: 12px;
          border-top: 1px solid #e1e5eb;
          margin-top: 15px;
        }
        
        .footer a {
          color: #0f2161;
          text-decoration: none;
        }
        
        .footer a:hover {
          text-decoration: underline;
        }
        
        @media (max-width: 480px) {
          .page-wrapper {
            padding: 15px;
          }
          
          .container {
            max-width: 100%;
            margin: 0;
          }
          
          .form-container {
            padding: 25px 20px;
          }
          
          .headers {
            padding: 20px 15px;
          }
          
          .logo {
            font-size: 24px;
          }
          
          .welcome-text {
            font-size: 22px;
          }
        }
        
        @media (max-width: 340px) {
          .remember-forgot {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          
          .form-container {
            padding: 20px 15px;
          }
        }
      `}</style>
    </div>
  );
}

export default Signup;