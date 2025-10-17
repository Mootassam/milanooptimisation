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
  rememberMe: yupFormSchemas.boolean(i18n("user.fields.rememberMe")),
});
function Signin() {
  const dispatch = useDispatch();

  const loading = useSelector(selectors.selectLoading);

  const [initialValues] = useState({
    email: "",
    password: "",
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

  const onSubmit = ({ email, password, rememberMe }) => {
    dispatch(actions.doSigninWithEmailAndPassword(email, password, rememberMe));
  };
  return (
    <div className="container">
      <div className="headers">
        <div className="logo">
          Mano<span>Mano</span>
        </div>
        <div className="tagline">DIY • Home • Garden</div>
      </div>
      <div className="form-container">
        <h1 className="welcome-text">Welcome Back</h1>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <InputFormItem
              label="Email Address"
              name="email"
              placeholder="Enter your email"
              iname="fas fa-envelope"
              type="text"
              externalErrorMessage={externalErrorMessage}
            />
            <InputFormItem
              label="Password"
              name="password"
              placeholder="Enter your password"
              iname="fas fa-lock"
              type="password"
            />
            <div className="remember-forgot">
              <div className="remember">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/LiveChat" className="forgot">
                Forgot Password?
              </Link>
            </div>
            <button disabled={loading} type="submit" className="login-btn">
              Log In
            </button>
          </form>
        </FormProvider>

        <div className="signup-link">
          Don't have an account?<Link to="/auth/signup"> <a>      Sign up now</a>    </Link>
        </div>

      </div>
      <div className="footer">
        <p>
          By logging in, you agree to our <a href="#">Terms of Servic
            e</a> and{" "}
          <a href="#">Privacy Policy</a>
        </p>
      </div>

      <style>{` 

 * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
    
        
        .container {
            width: 100%;
            max-width: 400px;
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
            padding: 25px 20px;
        }
        
        .welcome-text {
            text-align: center;
            color: #0f2161;
            font-size: 20px;
            margin-bottom: 20px;
            font-weight: 600;
        }
        
        .input-group {
            margin-bottom: 20px;
            position: relative;
        }
        
        .input-group label {
            display: block;
            color: #0f2161;
            margin-bottom: 8px;
            font-weight: 500;
            font-size: 14px;
        }
        
        .input-group input {
            width: 100%;
            padding: 16px 45px;
            border: 2px solid #e1e5eb;
            border-radius: 12px;
            font-size: 16px;
            color: #0f2161;
            transition: all 0.3s ease;
        }
        
        .input-group input:focus {
            border-color: #0f2161;
            outline: none;
        }
        
        .input-group i {
            position: absolute;
            left: 15px;
            color: #0f2161;
            font-size: 18px;
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
        
        .forgot {
            color: #0f2161;
            text-decoration: none;
            font-weight: 500;
        }
        
        .forgot:hover {
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
            transition: background 0.3s ease;
            margin-bottom: 20px;
        }
        
        .login-btn:hover {
            background: #1a387a;
        }
        
        .separator {
            display: flex;
            align-items: center;
            margin: 20px 0;
            color: #7b8796;
            font-size: 14px;
        }
        
        .separator::before,
        .separator::after {
            content: "";
            flex: 1;
            height: 1px;
            background: #e1e5eb;
        }
        
        .separator span {
            padding: 0 15px;
        }
        
        .social-login {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 25px;
        }
        
        .social-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f5f6f7;
            border: 1px solid #e1e5eb;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .social-btn:hover {
            background: #e8ecf3;
            transform: translateY(-2px);
        }
        
        .social-btn i {
            color: #0f2161;
            font-size: 20px;
        }
        
        .signup-link {
            text-align: center;
            font-size: 14px;
            color: #7b8796;
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
        
        @media (max-width: 340px) {
            .remember-forgot {
                flex-direction: column;
                align-items: flex-start;
                gap: 10px;
            }
            
            .social-login {
                flex-wrap: wrap;
            }

            
        }`}</style>
    </div>
  );
}

export default Signin;
