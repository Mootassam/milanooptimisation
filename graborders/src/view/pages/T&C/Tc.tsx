import React, { useEffect } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import actions from 'src/modules/company/list/companyListActions'
import selectors from 'src/modules/company/list/companyListSelectors' 
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'

function Tc() {
  const dispatch = useDispatch();

  const record = useSelector(selectors.selectRows); 
  const loading = useSelector(selectors.selectLoading);

  const doFetch = () => { 
    dispatch(actions.doFetch());
  };

  useEffect(() => {
    doFetch();
  }, [dispatch]);

  return (
<>
  <SubHeader title="Terms & Conditions" detail="Please read these terms carefully " />
  <div className="page-title"></div>


  {/* Table of Contents */}
  <div className="toc-container">
    <h2 className="toc-title">
      <i className="fas fa-list" />
      Table of Contents
    </h2>
    <ul className="toc-list">
      <li className="toc-item">
        <a href="#acceptance" className="toc-link">
          <i className="fas fa-chevron-right" />
          Acceptance of Terms
        </a>
      </li>
      <li className="toc-item">
        <a href="#account" className="toc-link">
          <i className="fas fa-chevron-right" />
          Account Registration
        </a>
      </li>
      <li className="toc-item">
        <a href="#orders" className="toc-link">
          <i className="fas fa-chevron-right" />
          Orders &amp; Payments
        </a>
      </li>
      <li className="toc-item">
        <a href="#returns" className="toc-link">
          <i className="fas fa-chevron-right" />
          Returns &amp; Refunds
        </a>
      </li>
      <li className="toc-item">
        <a href="#intellectual" className="toc-link">
          <i className="fas fa-chevron-right" />
          Intellectual Property
        </a>
      </li>
      <li className="toc-item">
        <a href="#liability" className="toc-link">
          <i className="fas fa-chevron-right" />
          Limitation of Liability
        </a>
      </li>
      <li className="toc-item">
        <a href="#changes" className="toc-link">
          <i className="fas fa-chevron-right" />
          Changes to Terms
        </a>
      </li>
    </ul>
  </div>
  {/* Acceptance of Terms */}
  <div id="acceptance" className="content-section">
    <h2 className="section-title">
      <i className="fas fa-check-circle" />
      Acceptance of Terms
    </h2>
    <div className="section-content">
      <p>
        By accessing or using the ManoMano platform, you agree to be bound by
        these Terms and Conditions and our Privacy Policy. If you do not agree
        to these terms, please do not use our services.
      </p>
      <p>
        These terms apply to all visitors, users, and others who access or use
        the Service.
      </p>
      <div className="highlight">
        <strong>Important:</strong> You must be at least 18 years of age to use
        our services. By using ManoMano, you represent that you are at least 18
        years old.
      </div>
    </div>
  </div>
  {/* Account Registration */}
  <div id="account" className="content-section">
    <h2 className="section-title">
      <i className="fas fa-user-circle" />
      Account Registration
    </h2>
    <div className="section-content">
      <p>
        To access certain features of our platform, you may be required to
        create an account. When creating your account, you must provide accurate
        and complete information.
      </p>
      <p>You are responsible for:</p>
      <ul>
        <li>Maintaining the confidentiality of your account credentials</li>
        <li>All activities that occur under your account</li>
        <li>Promptly notifying us of any unauthorized use of your account</li>
      </ul>
      <p>
        We reserve the right to suspend or terminate your account if any
        information provided during registration proves to be inaccurate, false,
        or misleading.
      </p>
    </div>
  </div>
  {/* Orders & Payments */}
  <div id="orders" className="content-section">
    <h2 className="section-title">
      <i className="fas fa-shopping-cart" />
      Orders &amp; Payments
    </h2>
    <div className="section-content">
      <p>
        All orders placed through ManoMano are subject to acceptance and product
        availability. We reserve the right to refuse or cancel any order for any
        reason at our discretion.
      </p>
      <p>
        Prices for products are subject to change without notice. We are not
        responsible for typographical errors regarding price or any other
        information.
      </p>
      <p>Accepted payment methods include:</p>
      <ul>
        <li>Credit/Debit Cards</li>
        <li>PayPal</li>
        <li>Bank Transfers</li>
        <li>Other payment methods as indicated on our platform</li>
      </ul>
      <div className="highlight">
        <strong>Note:</strong> Your order is not confirmed until we send you a
        confirmation email. Until then, we reserve the right to cancel your
        order.
      </div>
    </div>
  </div>
  {/* Returns & Refunds */}
  <div id="returns" className="content-section">
    <h2 className="section-title">
      <i className="fas fa-undo-alt" />
      Returns &amp; Refunds
    </h2>
    <div className="section-content">
      <p>
        We offer a 30-day return policy for most items in their original
        condition. Some products may have different return policies as specified
        at the time of purchase.
      </p>
      <p>To be eligible for a return:</p>
      <ol>
        <li>The item must be unused and in the same condition as received</li>
        <li>The item must be in the original packaging</li>
        <li>You must have the receipt or proof of purchase</li>
      </ol>
      <p>
        Refunds will be processed to the original method of payment within 7-10
        business days after we receive and inspect the returned item.
      </p>
    </div>
  </div>
  {/* Intellectual Property */}
  <div id="intellectual" className="content-section">
    <h2 className="section-title">
      <i className="fas fa-copyright" />
      Intellectual Property
    </h2>
    <div className="section-content">
      <p>
        The ManoMano platform and its original content, features, and
        functionality are owned by ManoMano and are protected by international
        copyright, trademark, patent, trade secret, and other intellectual
        property laws.
      </p>
      <p>
        You may not copy, reproduce, distribute, transmit, display, sell,
        license, or otherwise exploit any content from our platform without
        prior written consent from us.
      </p>
      <p>
        The ManoMano name and logo are trademarks of ManoMano. You may not use
        these marks without our prior written permission.
      </p>
    </div>
  </div>
  {/* Limitation of Liability */}
  <div id="liability" className="content-section">
    <h2 className="section-title">
      <i className="fas fa-exclamation-triangle" />
      Limitation of Liability
    </h2>
    <div className="section-content">
      <p>
        To the fullest extent permitted by law, ManoMano shall not be liable for
        any indirect, incidental, special, consequential, or punitive damages,
        including but not limited to loss of profits, data, use, goodwill, or
        other intangible losses.
      </p>
      <p>
        Our total liability to you for all claims arising out of or relating to
        these terms or your use of our services shall not exceed the amount you
        paid to us in the last six months.
      </p>
      <div className="highlight">
        <strong>Important:</strong> Some jurisdictions do not allow the
        exclusion or limitation of liability for consequential or incidental
        damages, so the above limitations may not apply to you.
      </div>
    </div>
  </div>
  {/* Changes to Terms */}
  <div id="changes" className="content-section">
    <h2 className="section-title">
      <i className="fas fa-exchange-alt" />
      Changes to Terms
    </h2>
    <div className="section-content">
      <p>
        We reserve the right, at our sole discretion, to modify or replace these
        Terms at any time. If a revision is material, we will provide at least
        30 days' notice prior to any new terms taking effect.
      </p>
      <p>
        What constitutes a material change will be determined at our sole
        discretion. By continuing to access or use our Service after those
        revisions become effective, you agree to be bound by the revised terms.
      </p>
      <p>
        We encourage you to review these Terms periodically for any changes.
      </p>
    </div>
  </div>
  {/* Agreement Section */}
  <div className="agreement-section">
    <p className="agreement-text">
      By using our platform, you acknowledge that you have read, understood, and
      agree to be bound by these Terms and Conditions.
    </p>
    <button className="agree-button">I Agree</button>
  </div>
  {/* Contact Support */}
  <div className="support-section">
    <p className="support-text">
      Have questions about our Terms &amp; Conditions?
    </p>
    <Link to="/LiveChat" href="#" className="support-button">
      Contact Support
    </Link>
  </div>
  {/* Back to Top Button */}
  <a href="#" className="back-to-top">
    <i className="fas fa-arrow-up" />
  </a>

  <style>{`       * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }
        
        body {
            background-color: #f5f6f7;
            color: #333;
            padding-bottom: 70px;
            max-width: 400px;
            margin: 0 auto;
            position: relative;
            overflow-x: hidden;
        }
        
        /* Header Styles */
        .header {
            background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
            color: white;
            padding: 18px 15px;
            text-align: center;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .back-btn {
            position: absolute;
            left: 15px;
            color: white;
            font-size: 20px;
        }
        
        .logo {
            font-size: 22px;
            font-weight: 800;
            letter-spacing: 0.5px;
        }
        
        .logo span {
            color: #ffde59;
        }
        
        /* Page Title */
        .page-title {
            padding: 25px 15px 15px;
            text-align: center;
            color: #0f2161;
            font-size: 24px;
            font-weight: 700;
        }
        
        .page-subtitle {
            text-align: center;
            color: #7b8796;
            font-size: 16px;
            margin-bottom: 20px;
            padding: 0 20px;
            line-height: 1.5;
        }
        
        /* Last Updated */
        .last-updated {
            text-align: center;
            color: #7b8796;
            font-size: 14px;
            margin-bottom: 20px;
            padding: 0 20px;
            font-style: italic;
        }
        
        /* TOC Navigation */
        .toc-container {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin: 0 15px 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .toc-title {
            color: #0f2161;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .toc-title i {
            margin-right: 10px;
        }
        
        .toc-list {
            list-style: none;
        }
        
        .toc-item {
            margin-bottom: 12px;
            padding-bottom: 12px;
            border-bottom: 1px solid #f0f4ff;
        }
        
        .toc-item:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        
        .toc-link {
            color: #0f2161;
            text-decoration: none;
            font-weight: 500;
            display: flex;
            align-items: center;
            transition: all 0.2s ease;
        }
        
        .toc-link:hover {
            color: #1a387a;
        }
        
        .toc-link i {
            margin-right: 10px;
            font-size: 14px;
            color: #7b8796;
        }
        
        /* Content Sections */
        .content-section {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin: 0 15px 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .section-title {
            color: #0f2161;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .section-title i {
            margin-right: 10px;
            background: #f0f4ff;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #0f2161;
        }
        
        .section-content {
            color: #5a6370;
            line-height: 1.6;
            font-size: 15px;
        }
        
        .section-content p {
            margin-bottom: 15px;
        }
        
        .section-content ul, .section-content ol {
            margin-left: 20px;
            margin-bottom: 15px;
        }
        
        .section-content li {
            margin-bottom: 8px;
        }
        
        .highlight {
            background: #f8f9ff;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #0f2161;
            margin: 15px 0;
            font-size: 14px;
        }
        
        /* Back to Top Button */
        .back-to-top {
            position: fixed;
            bottom: 80px;
            right: 15px;
            width: 50px;
            height: 50px;
            background: #0f2161;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            box-shadow: 0 2px 10px rgba(15, 33, 97, 0.3);
            z-index: 99;
            transition: all 0.3s ease;
        }
        
        .back-to-top:active {
            transform: scale(0.95);
        }
        
        /* Agreement Section */
        .agreement-section {
            background: #f8f9ff;
            border-radius: 12px;
            padding: 20px;
            margin: 0 15px 20px;
            text-align: center;
        }
        
        .agreement-text {
            color: #5a6370;
            margin-bottom: 15px;
            font-size: 15px;
            line-height: 1.5;
        }
        
        .agree-button {
            background: #0f2161;
            color: white;
            border: none;
            border-radius: 30px;
            padding: 12px 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .agree-button:active {
            transform: scale(0.95);
        }
        
        /* Contact Support */
        .support-section {
            text-align: center;
            padding: 20px 0px;
        }
        
        .support-text {
            color: #5a6370;
            margin-bottom: 15px;
            font-size: 15px;
        }
        
        .support-button {
            display: inline-block;
            background: #f0f4ff;
            color: #0f2161;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 30px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        
        .support-button:active {
            transform: scale(0.95);
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
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            max-width: 400px;
            margin: 0 auto;
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
        
        .nav-item.active {
            color: #0f2161;
        }
        
        .nav-item i {
            font-size: 20px;
            margin-bottom: 4px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 340px) {
            .section-title {
                font-size: 18px;
            }
            
            .section-title i {
                width: 32px;
                height: 32px;
                font-size: 14px;
            }
        }`}</style>
</>

  );
}

export default Tc;
