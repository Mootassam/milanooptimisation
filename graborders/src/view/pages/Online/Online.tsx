import React, { useEffect } from "react";
import "../styles/styles.css";
import { useSelector, useDispatch } from "react-redux";
import actions from "src/modules/category/list/categoryListActions";
import selector from "src/modules/category/list/categoryListSelectors";
import LoadingModal from "src/shared/LoadingModal";
function Online() {
  const dispatch = useDispatch();
  const record = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);

  useEffect(() => {
    dispatch(actions.doFetch());
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <>
      {/* Page Title */}
      <h1 className="page-title">Customer Service</h1>
      <p className="page-subtitle">How can we help you today?</p>
      {/* Search Box */}
      <div className="search-box">
        <div className="search-container">
          <i className="fas fa-search" />
          <input type="text" placeholder="Search for help..." />
        </div>
      </div>
      {/* Help Categories */}
      <div className="help-categories">
        <h2 className="category-title">Help Categories</h2>
        <div className="category-grid">
          <div className="category-item">
            <div className="category-icon">
              <i className="fas fa-shopping-bag" />
            </div>
            <div className="category-name">Orders</div>
          </div>
          <div className="category-item">
            <div className="category-icon">
              <i className="fas fa-undo-alt" />
            </div>
            <div className="category-name">Returns</div>
          </div>
          <div className="category-item">
            <div className="category-icon">
              <i className="fas fa-truck" />
            </div>
            <div className="category-name">Delivery</div>
          </div>
          <div className="category-item">
            <div className="category-icon">
              <i className="fas fa-credit-card" />
            </div>
            <div className="category-name">Payments</div>
          </div>
        </div>
      </div>
      {/* FAQ Section */}
      <div className="faq-section">
        <h2 className="category-title">Frequently Asked Questions</h2>
        <div className="faq-item">
          <div className="faq-question">
            How do I track my order?
            <div className="faq-toggle">
              <i className="fas fa-chevron-down" />
            </div>
          </div>
          <div className="faq-answer">
            You can track your order by going to your account, selecting "My
            Orders", and clicking on the order you want to track. You'll see
            real-time updates on your delivery status.
          </div>
        </div>
        <div className="faq-item">
          <div className="faq-question">
            What is your return policy?
            <div className="faq-toggle">
              <i className="fas fa-chevron-down" />
            </div>
          </div>
          <div className="faq-answer">
            We offer a 30-day return policy for most items. Items must be in
            original condition with tags attached. Some exclusions apply for
            special items.
          </div>
        </div>
        <div className="faq-item">
          <div className="faq-question">
            How can I change my delivery address?
            <div className="faq-toggle">
              <i className="fas fa-chevron-down" />
            </div>
          </div>
          <div className="faq-answer">
            You can change your delivery address before your order is shipped by
            contacting our customer service team. Once shipped, address changes
            may not be possible.
          </div>
        </div>
      </div>
      {/* Contact Section */}
      <div className="contact-section">
        <h2 className="category-title">Contact Options</h2>
        <div className="contact-card">
          <h3 className="contact-title">Get in touch with us</h3>
          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-icon">
                <i className="fas fa-comment-dots" />
              </div>
              <div className="contact-info">
                <div className="contact-type">Live Chat</div>
                <div className="contact-details">Available 24/7</div>
              </div>
            </div>
            <div className="contact-method">
              <div className="contact-icon">
                <i className="fas fa-phone" />
              </div>
              <div className="contact-info">
                <div className="contact-type">Phone Support</div>
                <div className="contact-details">+1 (800) 123-4567</div>
              </div>
            </div>
            <div className="contact-method">
              <div className="contact-icon">
                <i className="fas fa-envelope" />
              </div>
              <div className="contact-info">
                <div className="contact-type">Email Us</div>
                <div className="contact-details">support@manomano.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <a href="#" className="nav-item">
          <i className="fas fa-home" />
          <span>Home</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fas fa-wallet" />
          <span>Recharge</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fas fa-hand-holding-usd" />
          <span>Grap</span>
        </a>
        <a href="#" className="nav-item">
          <i className="fas fa-shopping-cart" />
          <span>Order</span>
        </a>
        <a href="#" className="nav-item active">
          <i className="fas fa-user" />
          <span>Account</span>
        </a>
      </div>

      <style>{`        /* Page Title */
        .page-title {
            padding: 20px 15px 10px;
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
        }
        
        /* Search Box */
        .search-box {
            padding: 0 15px 20px;
        }
        
        .search-container {
            position: relative;
        }
        
        .search-container i {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #7b8796;
        }
        
        .search-container input {
            width: 100%;
            padding: 16px 16px 16px 45px;
            border: 2px solid #e1e5eb;
            border-radius: 12px;
            font-size: 16px;
            color: #0f2161;
        }
        
        .search-container input:focus {
            outline: none;
            border-color: #0f2161;
        }
        
        /* Help Categories */
        .help-categories {
            padding: 0 15px 20px;
        }
        
        .category-title {
            color: #0f2161;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 15px;
            padding-left: 5px;
        }
        
        .category-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
        }
        
        .category-item {
            background: white;
            border-radius: 12px;
            padding: 20px 15px;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            transition: all 0.2s ease;
        }
        
        .category-item:active {
            transform: scale(0.97);
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
        }
        
        .category-icon {
            width: 50px;
            height: 50px;
            background: #f0f4ff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 12px;
            color: #0f2161;
            font-size: 20px;
        }
        
        .category-name {
            color: #0f2161;
            font-weight: 600;
            font-size: 15px;
        }
        
        /* FAQ Section */
        .faq-section {
            padding: 0 15px 20px;
        }
        
        .faq-item {
            background: white;
            border-radius: 12px;
            margin-bottom: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .faq-question {
            padding: 18px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
            color: #0f2161;
            cursor: pointer;
        }
        
        .faq-answer {
            padding: 0 15px 18px;
            color: #5a6370;
            font-size: 15px;
            line-height: 1.5;
            display: none;
        }
        
        .faq-item.active .faq-answer {
            display: block;
        }
        
        .faq-item.active .faq-toggle i {
            transform: rotate(180deg);
        }
        
        .faq-toggle {
            transition: all 0.3s ease;
        }
        
        /* Contact Options */
        .contact-section {
            padding: 0 15px 20px;
        }
        
        .contact-card {
            background: white;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            margin-bottom: 20px;
        }
        
        .contact-title {
            color: #0f2161;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .contact-methods {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .contact-method {
            display: flex;
            align-items: center;
            padding: 15px;
            background: #f8f9ff;
            border-radius: 10px;
            transition: all 0.2s ease;
        }
        
        .contact-method:active {
            background: #e8eeff;
        }
        
        .contact-icon {
            width: 40px;
            height: 40px;
            background: #0f2161;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
            margin-right: 15px;
        }
        
        .contact-info {
            flex: 1;
        }
        
        .contact-type {
            font-weight: 600;
            color: #0f2161;
            margin-bottom: 4px;
        }
        
        .contact-details {
            color: #7b8796;
            font-size: 14px;
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
            .category-grid {
                grid-template-columns: 1fr;
            }
            
            .category-item {
                padding: 15px 10px;
            }
            
            .category-icon {
                width: 45px;
                height: 45px;
                font-size: 18px;
            }
        }`}</style>
    </>
  );
}

export default Online;
