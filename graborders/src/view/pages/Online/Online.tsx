import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import { useSelector, useDispatch } from "react-redux";
import actions from "src/modules/category/list/categoryListActions";
import selector from "src/modules/category/list/categoryListSelectors";
import LoadingModal from "src/shared/LoadingModal";
import { Link } from "react-router-dom";

function Online() {
  const dispatch = useDispatch();
  const record = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    dispatch(actions.doFetch());
    // eslint-disable-next-line
  }, [dispatch]);

  const openContactModal = (contact) => {
    setSelectedContact(contact);
  };

  const closeContactModal = () => {
    setSelectedContact(null);
  };

  const handleContactClick = (contact) => {
    if (contact.type === "whatsApp") {
      // Format phone number for WhatsApp
      const phoneNumber = contact.number.replace(/\D/g, '');
      const whatsappUrl = `https://wa.me/${phoneNumber}`;
      window.open(whatsappUrl, '_blank');
    } else if (contact.type === "telegram") {
      // Format username for Telegram
      const username = contact.number.replace('@', '');
      const telegramUrl = `https://t.me/${username}`;
      window.open(telegramUrl, '_blank');
    }
    closeContactModal();
  };

  const openLiveChat = () => {
    // Here you can integrate with your live chat service
    alert("Live Chat is opening...");
    // For example: window.open('your-live-chat-url', '_blank');
  };

  if (loading) {
    return <LoadingModal />;
  }

  return (
    <div className="online-support-container">
      {/* Header */}
     
      {/* Hero Section */}
      <div className="support-hero">
        <div className="hero-icon">
          <i className="fas fa-headset"></i>
        </div>
        <h2>We're Here to Help You!</h2>
        <p>Contact our support team through any of the following channels</p>
      </div>

      {/* Contact Methods */}
      <div className="contact-methods">
        <h3 className="section-title">Available Support Channels</h3>
        
        {record.map((contact) => (
          <div 
            key={contact.id} 
            className="contact-card"
            onClick={() => openContactModal(contact)}
          >
            <div className="contact-icon">
              {contact.type === "whatsApp" ? (
                <i className="fab fa-whatsapp"></i>
              ) : contact.type === "telegram" ? (
                <i className="fab fa-telegram"></i>
              ) : (
                <i className="fas fa-comments"></i>
              )}
            </div>
            <div className="contact-info">
              <h4>{contact.name}</h4>
              <p>{contact.number}</p>
              <span className="contact-type">
                {contact.type === "whatsApp" ? "WhatsApp" : "Telegram"}
              </span>
            </div>
            <div className="contact-arrow">
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        ))}
      </div>

      {/* Support Information */}
      <div className="support-info">
        <div className="info-card">
          <div className="info-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="info-content">
            <h4>24/7 Support</h4>
            <p>Our team is available around the clock to assist you</p>
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <i className="fas fa-shield-alt"></i>
          </div>
          <div className="info-content">
            <h4>Secure & Safe</h4>
            <p>All your conversations are encrypted and secure</p>
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <i className="fas fa-rocket"></i>
          </div>
          <div className="info-content">
            <h4>Quick Response</h4>
            <p>Get instant responses from our support team</p>
          </div>
        </div>
      </div>

      {/* Floating Live Chat Button */}
      <Link className="live-chat-button remove_blue" to="/Chat">
        <div className="chat-icon">
          <i className="fas fa-comment-dots"></i>
        </div>
        <span className="pulse-dot"></span>
      </Link>

      {/* Contact Modal */}
      {selectedContact && (
        <div className="modal-overlay" onClick={closeContactModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Contact {selectedContact.name}</h3>
              <button className="modal-close" onClick={closeContactModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="contact-modal-icon">
                {selectedContact.type === "whatsApp" ? (
                  <i className="fab fa-whatsapp"></i>
                ) : (
                  <i className="fab fa-telegram"></i>
                )}
              </div>
              
              <div className="contact-details">
                <h4>{selectedContact.name}</h4>
                <p className="contact-number">{selectedContact.number}</p>
                <span className="contact-badge">
                  {selectedContact.type === "whatsApp" ? "WhatsApp" : "Telegram"}
                </span>
              </div>

              <p className="contact-instruction">
                {selectedContact.type === "whatsApp" 
                  ? "You'll be redirected to WhatsApp to start a conversation with our support team."
                  : "You'll be redirected to Telegram to start a conversation with our support team."
                }
              </p>

              <div className="modal-actions">
                <button className="cancel-btn" onClick={closeContactModal}>
                  Cancel
                </button>
                <button 
                  className={`confirm-btn ${selectedContact.type}`}
                  onClick={() => handleContactClick(selectedContact)}
                >
                  Open {selectedContact.type === "whatsApp" ? "WhatsApp" : "Telegram"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .online-support-container {
          max-width: 480px;
          margin: 0 auto;
          background: linear-gradient(135deg, #f5f7ff 0%, #e6e9ff 100%);
          min-height: 100vh;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* Header */
        .support-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .back-button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: #0f2161;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .back-button:hover {
          transform: translateX(-2px);
        }

        .support-header h1 {
          color: #0f2161;
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }

        .header-placeholder {
          width: 40px;
        }

        /* Hero Section */
        .support-hero {
          text-align: center;
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          color: white;
          padding: 30px 20px;
          border-radius: 20px;
          margin-bottom: 30px;
          box-shadow: 0 8px 25px rgba(15, 33, 97, 0.2);
        }

        .hero-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          font-size: 36px;
        }

        .support-hero h2 {
          font-size: 24px;
          margin: 0 0 8px;
          font-weight: 700;
        }

        .support-hero p {
          font-size: 16px;
          margin: 0;
          opacity: 0.9;
        }

        /* Contact Methods */
        .contact-methods {
          margin-bottom: 30px;
        }

        .section-title {
          color: #0f2161;
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 20px;
          text-align: center;
        }

        .contact-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .contact-card:hover {
          transform: translateY(-2px);
          border-color: #0f2161;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .contact-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          font-size: 24px;
          flex-shrink: 0;
                background-color: #25D366;
          color: white;
        }

        .contact-card:nth-child(1) .contact-icon {
          background-color: #25D366;
          color: white;
        }

        .contact-card:nth-child(2) .contact-icon {
          background: #0088cc;
          color: white;
        }

        .contact-info {
          flex: 1;
        }

        .contact-info h4 {
          color: #0f2161;
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 4px;
        }

        .contact-info p {
          color: #7b8796;
          font-size: 16px;
          margin: 0 0 6px;
        }

        .contact-type {
          background: #f0f4ff;
          color: #0f2161;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .contact-arrow {
          color: #7b8796;
          font-size: 16px;
        }

        /* Support Information */
        .support-info {
          margin-bottom: 30px;
        }

        .info-card {
          background: white;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .info-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #f0f4ff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          color: #0f2161;
          font-size: 20px;
          flex-shrink: 0;
        }

        .info-content h4 {
          color: #0f2161;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px;
        }

        .info-content p {
          color: #7b8796;
          font-size: 14px;
          margin: 0;
        }

        /* Live Chat Button */
        .live-chat-button {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
          cursor: pointer;
          z-index: 1000;
          transition: all 0.3s ease;
          animation: float 3s ease-in-out infinite;
        }

        .live-chat-button:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 35px rgba(37, 211, 102, 0.6);
        }

        .chat-icon {
          font-size: 28px;
        }

        .pulse-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ff4444;
          animation: pulse 2s infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
          100% { transform: scale(0.8); opacity: 1; }
        }

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
          z-index: 2000;
          padding: 20px;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          width: 100%;
          max-width: 400px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
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
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px 16px;
          border-bottom: 1px solid #e8eaf0;
        }

        .modal-header h3 {
          color: #0f2161;
          font-size: 20px;
          font-weight: 700;
          margin: 0;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 20px;
          color: #7b8796;
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .modal-close:hover {
          background: #f0f4ff;
        }

        .modal-body {
          padding: 24px;
          text-align: center;
        }

        .contact-modal-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 32px;
          color: white;
        }

        .contact-modal-icon.fa-whatsapp {
          background: #25D366;
        }

        .contact-modal-icon.fa-telegram {
          background: #0088cc;
        }

        .contact-details h4 {
          color: #0f2161;
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 8px;
        }

        .contact-number {
          color: #7b8796;
          font-size: 18px;
          margin: 0 0 12px;
        }

        .contact-badge {
          background: #f0f4ff;
          color: #0f2161;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
        }

        .contact-instruction {
          color: #7b8796;
          font-size: 14px;
          line-height: 1.5;
          margin: 20px 0;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .cancel-btn {
          flex: 1;
          padding: 14px;
          border: 2px solid #e8eaf0;
          background: white;
          color: #7b8796;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
        }

        .cancel-btn:hover {
          background: #f5f7ff;
          border-color: #0f2161;
        }

        .confirm-btn {
          flex: 2;
          padding: 14px;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
          color: white;
        }

        .confirm-btn.whatsApp {
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
        }

        .confirm-btn.telegram {
          background: linear-gradient(135deg, #0088cc 0%, #005c8a 100%);
        }

        .confirm-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 340px) {
          .online-support-container {
            padding: 15px;
          }

          .support-header h1 {
            font-size: 20px;
          }

          .support-hero {
            padding: 20px 15px;
          }

          .support-hero h2 {
            font-size: 20px;
          }

          .contact-card {
            padding: 16px;
          }

          .contact-icon {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }

          .live-chat-button {
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
          }

          .chat-icon {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}

export default Online;