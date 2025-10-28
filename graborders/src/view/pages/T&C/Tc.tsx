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
      <SubHeader title="Terms & Conditions"  />
      
      <div className="tc-container">
        {/* Table of Contents */}
        <div className="tc-section">
          <div className="section-header">
            <i className="fas fa-list section-icon" />
            <h2 className="section-title">Table of Contents</h2>
          </div>
          <div className="section-content">
            <div className="toc-list">
              <a href="#acceptance" className="toc-item">
                <i className="fas fa-chevron-right toc-icon" />
                <span className="toc-text">Acceptance of Terms</span>
              </a>
              <a href="#account" className="toc-item">
                <i className="fas fa-chevron-right toc-icon" />
                <span className="toc-text">Account Registration</span>
              </a>
              <a href="#orders" className="toc-item">
                <i className="fas fa-chevron-right toc-icon" />
                <span className="toc-text">Orders & Payments</span>
              </a>
              <a href="#returns" className="toc-item">
                <i className="fas fa-chevron-right toc-icon" />
                <span className="toc-text">Returns & Refunds</span>
              </a>
              <a href="#intellectual" className="toc-item">
                <i className="fas fa-chevron-right toc-icon" />
                <span className="toc-text">Intellectual Property</span>
              </a>
              <a href="#liability" className="toc-item">
                <i className="fas fa-chevron-right toc-icon" />
                <span className="toc-text">Limitation of Liability</span>
              </a>
              <a href="#agency" className="toc-item">
                <i className="fas fa-chevron-right toc-icon" />
                <span className="toc-text">Agency Contract and Salary</span>
              </a>
              <a href="#changes" className="toc-item">
                <i className="fas fa-chevron-right toc-icon" />
                <span className="toc-text">Changes to Terms</span>
              </a>
            </div>
          </div>
        </div>

        {/* Acceptance of Terms */}
        <div id="acceptance" className="tc-section">
          <div className="section-header">
            <i className="fas fa-check-circle section-icon" />
            <h2 className="section-title">Acceptance of Terms</h2>
          </div>
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
            <div className="highlight-box">
              <i className="fas fa-exclamation-circle highlight-icon" />
              <div className="highlight-content">
                <strong>Important:</strong> You must be at least 18 years of age to use
                our services. By using ManoMano, you represent that you are at least 18
                years old.
              </div>
            </div>
          </div>
        </div>

        {/* Account Registration */}
        <div id="account" className="tc-section">
          <div className="section-header">
            <i className="fas fa-user-circle section-icon" />
            <h2 className="section-title">Account Registration</h2>
          </div>
          <div className="section-content">
            <p>
              To access certain features of our platform, you may be required to
              create an account. When creating your account, you must provide accurate
              and complete information.
            </p>
            <p>You are responsible for:</p>
            <ul className="content-list">
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
        <div id="orders" className="tc-section">
          <div className="section-header">
            <i className="fas fa-shopping-cart section-icon" />
            <h2 className="section-title">Orders & Payments</h2>
          </div>
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
            <ul className="content-list">
              <li>Credit/Debit Cards</li>
              <li>PayPal</li>
              <li>Bank Transfers</li>
              <li>Other payment methods as indicated on our platform</li>
            </ul>
            <div className="highlight-box">
              <i className="fas fa-info-circle highlight-icon" />
              <div className="highlight-content">
                <strong>Note:</strong> Your order is not confirmed until we send you a
                confirmation email. Until then, we reserve the right to cancel your
                order.
              </div>
            </div>
          </div>
        </div>

        {/* Returns & Refunds */}
        <div id="returns" className="tc-section">
          <div className="section-header">
            <i className="fas fa-undo-alt section-icon" />
            <h2 className="section-title">Returns & Refunds</h2>
          </div>
          <div className="section-content">
            <p>
              We offer a 30-day return policy for most items in their original
              condition. Some products may have different return policies as specified
              at the time of purchase.
            </p>
            <p>To be eligible for a return:</p>
            <ol className="content-list ordered">
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
        <div id="intellectual" className="tc-section">
          <div className="section-header">
            <i className="fas fa-copyright section-icon" />
            <h2 className="section-title">Intellectual Property</h2>
          </div>
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
        <div id="liability" className="tc-section">
          <div className="section-header">
            <i className="fas fa-exclamation-triangle section-icon" />
            <h2 className="section-title">Limitation of Liability</h2>
          </div>
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
            <div className="highlight-box">
              <i className="fas fa-exclamation-circle highlight-icon" />
              <div className="highlight-content">
                <strong>Important:</strong> Some jurisdictions do not allow the
                exclusion or limitation of liability for consequential or incidental
                damages, so the above limitations may not apply to you.
              </div>
            </div>
          </div>
        </div>

        {/* Agency Contract and Salary */}
        <div id="agency" className="tc-section">
          <div className="section-header">
            <i className="fas fa-handshake section-icon" />
            <h2 className="section-title">Agency Contract and Salary</h2>
          </div>
          <div className="section-content">
            <h3 className="subsection-title">How to Get Agency Monthly Salary</h3>
            <p>
              Manomano is looking for long-term partners to grow together. Here's how you can become an agent and earn monthly salary:
            </p>
            
            <div className="highlight-box">
              <i className="fas fa-bullhorn highlight-icon" />
              <div className="highlight-content">
                <strong>Requirements:</strong> Agent contract is required and the level reaches LV3, contact customer service to apply for monthly salary.
                Reach 20 effective users or more, please contact online customer service to apply for a valid Manomano agency contract.
              </div>
            </div>

            <h4 className="salary-tier-title">Agent Salary Tiers:</h4>
            <div className="salary-tiers">
              <div className="salary-tier">
                <div className="tier-header">
                  <i className="fas fa-user-graduate tier-icon" />
                  <span className="tier-name">Internship Agent</span>
                </div>
                <div className="tier-requirements">
                  Invite effective first-level users to reach 20 people
                </div>
                <div className="tier-salary">
                  Monthly Salary: <strong>168.88 USDT</strong>
                </div>
              </div>

              <div className="salary-tier">
                <div className="tier-header">
                  <i className="fas fa-user tier-icon" />
                  <span className="tier-name">Junior Agent</span>
                </div>
                <div className="tier-requirements">
                  Invite effective first-level users to reach 100 people
                </div>
                <div className="tier-salary">
                  Monthly Salary: <strong>1,600.88 USDT</strong>
                </div>
              </div>

              <div className="salary-tier">
                <div className="tier-header">
                  <i className="fas fa-user-friends tier-icon" />
                  <span className="tier-name">Intermediate Agent</span>
                </div>
                <div className="tier-requirements">
                  Invite effective first-level users to reach 500 people
                </div>
                <div className="tier-salary">
                  Monthly Salary: <strong>6,888.88 USDT</strong>
                </div>
              </div>

              <div className="salary-tier">
                <div className="tier-header">
                  <i className="fas fa-user-tie tier-icon" />
                  <span className="tier-name">Advance Agent</span>
                </div>
                <div className="tier-requirements">
                  Invite effective first-level users to reach 1,000 people
                </div>
                <div className="tier-salary">
                  Monthly Salary: <strong>16,888.88 USDT</strong>
                </div>
              </div>

              <div className="salary-tier">
                <div className="tier-header">
                  <i className="fas fa-crown tier-icon" />
                  <span className="tier-name">General Agent</span>
                </div>
                <div className="tier-requirements">
                  Invite effective first-level users to reach 5,000 people
                </div>
                <div className="tier-salary">
                  Monthly Salary: <strong>68,888.88 USDT</strong>
                </div>
              </div>
            </div>

            <div className="highlight-box success">
              <i className="fas fa-star highlight-icon" />
              <div className="highlight-content">
                <strong>Sign the contract:</strong> Internship Agent and above levels can sign the official Manomano agency contract and start earning monthly salary.
              </div>
            </div>
          </div>
        </div>

        {/* Changes to Terms */}
        <div id="changes" className="tc-section">
          <div className="section-header">
            <i className="fas fa-exchange-alt section-icon" />
            <h2 className="section-title">Changes to Terms</h2>
          </div>
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
        <div className="tc-section agreement-section">
          <div className="section-content">
            <p className="agreement-text">
              By using our platform, you acknowledge that you have read, understood, and
              agree to be bound by these Terms and Conditions.
            </p>
            <button className="agree-btn">
              <i className="fas fa-check btn-icon" />
              I Agree
            </button>
          </div>
        </div>

        {/* Contact Support */}
        <div className="tc-section support-section">
          <div className="section-content">
            <p className="support-text">
              Have questions about our Terms & Conditions?
            </p>
            <Link to="/LiveChat" className="support-btn">
              <i className="fas fa-headset btn-icon" />
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .tc-container {
          padding: 20px 0px;
          max-width: 500px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .tc-section {
          background: white;
          border-radius: 20px;
          padding: 25px 0px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          margin: 0 15px;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding: 0px 20px;
        }

        .section-icon {
          font-size: 24px;
          color: #0f2161;
          background: #f0f4ff;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-title {
          color: #0f2161;
          font-size: 20px;
          font-weight: 700;
          margin: 0;
        }

        .section-content {
          padding: 0px 20px;
          color: #7b8796;
          line-height: 1.6;
          font-size: 14px;
        }

        .section-content p {
          margin-bottom: 15px;
        }

        /* Table of Contents */
        .toc-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .toc-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 12px;
          text-decoration: none;
          color: #0f2161;
          transition: all 0.2s ease;
          border: 1px solid #f0f4ff;
        }

        .toc-item:hover {
          background: #f0f4ff;
          transform: translateY(-2px);
        }

        .toc-icon {
          color: #7b8796;
          font-size: 14px;
        }

        .toc-text {
          font-weight: 600;
          font-size: 14px;
        }

        /* Content Lists */
        .content-list {
          margin-left: 20px;
          margin-bottom: 15px;
        }

        .content-list li {
          margin-bottom: 8px;
          color: #5a6370;
        }

        .content-list.ordered {
          list-style-type: decimal;
        }

        .content-list:not(.ordered) {
          list-style-type: disc;
        }

        /* Highlight Box */
        .highlight-box {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: #fff8e1;
          border-radius: 12px;
          border-left: 4px solid #e6b400;
          margin: 20px 0;
        }

        .highlight-box.success {
          background: #e8f5e8;
          border-left-color: #26a17b;
        }

        .highlight-icon {
          color: #e6b400;
          font-size: 18px;
          margin-top: 2px;
        }

        .highlight-box.success .highlight-icon {
          color: #26a17b;
        }

        .highlight-content {
          flex: 1;
          color: #8d6e00;
          font-size: 14px;
          line-height: 1.5;
        }

        .highlight-box.success .highlight-content {
          color: #26a17b;
        }

        /* Agency Salary Section */
        .subsection-title {
          color: #0f2161;
          font-size: 18px;
          font-weight: 700;
          margin: 20px 0 15px 0;
        }

        .salary-tier-title {
          color: #0f2161;
          font-size: 16px;
          font-weight: 600;
          margin: 25px 0 15px 0;
        }

        .salary-tiers {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin: 20px 0;
        }

        .salary-tier {
          background: #f8f9ff;
          border-radius: 12px;
          padding: 18px;
          border: 1px solid #e8ecff;
          transition: all 0.2s ease;
        }

        .salary-tier:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(15, 33, 97, 0.1);
        }

        .tier-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .tier-icon {
          color: #0f2161;
          font-size: 16px;
          width: 20px;
        }

        .tier-name {
          color: #0f2161;
          font-weight: 700;
          font-size: 15px;
        }

        .tier-requirements {
          color: #7b8796;
          font-size: 13px;
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .tier-salary {
          color: #26a17b;
          font-weight: 600;
          font-size: 14px;
        }

        /* Agreement Section */
        .agreement-section {
          text-align: center;
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          color: white;
        }

        .agreement-section .section-content {
          color: white;
        }

        .agreement-text {
          margin-bottom: 20px;
          font-size: 15px;
          opacity: 0.9;
        }

        .agree-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 16px;
          padding: 14px 28px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          backdrop-filter: blur(10px);
        }

        .agree-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        /* Support Section */
        .support-section {
          text-align: center;
        }

        .support-text {
          margin-bottom: 15px;
          font-size: 15px;
        }

        .support-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f0f4ff;
          color: #0f2161;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 16px;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .support-btn:hover {
          background: #e8ecff;
          transform: translateY(-2px);
        }

        .btn-icon {
          font-size: 16px;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .tc-container {
            padding: 15px 0px;
          }

          .tc-section {
            padding: 20px 0px;
            margin: 0 10px;
          }

          .section-header {
            padding: 0px 15px;
          }

          .section-content {
            padding: 0px 15px;
          }

          .section-icon {
            width: 45px;
            height: 45px;
            font-size: 20px;
          }

          .section-title {
            font-size: 18px;
          }

          .subsection-title {
            font-size: 16px;
          }

          .salary-tier {
            padding: 15px;
          }

          .agree-btn,
          .support-btn {
            padding: 12px 20px;
            font-size: 15px;
          }
        }

        @media (min-width: 768px) {
          .tc-container {
            max-width: 500px;
            padding: 30px 0px;
          }
        }
      `}</style>
    </>
  );
}

export default Tc;