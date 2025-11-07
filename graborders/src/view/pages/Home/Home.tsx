import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Vipactions from "src/modules/vip/list/vipListActions";
import selector from "src/modules/vip/list/vipListSelectors";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/auth/authActions";
import listactions from "src/modules/company/list/companyListActions";
import selectors from "src/modules/company/list/companyListSelectors";
import { log } from "node:console";

function Home() {
  const dispatch = useDispatch();
  const record = useSelector(selector.selectRows);

  const logorecord = useSelector(selectors.selectRows);
  const loadingImage = useSelector(selectors?.selectLoading);
  const [timemodal, setBigModal] = useState(true);
  const loading = useSelector(selector.selectLoading);
  const [Modal, setShowModal] = useState(false);
  interface VipItem {
    id: string;
    title: string;
    photo: Array<{ downloadUrl: string }>;
    comisionrate: string;
    dailyorder: string;
    levellimit: string;
    withdrawperday: string;
    setperday: string;
  }
  const [selectedVip, setSelectedVip] = useState<VipItem | null>(null);
  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const searchAllCoins = async () => { };
  interface DataItem {
    image: string;
    title: string;
    Entrylimit: string;
    levellimit: string;
    dailyorder: string;
    comisionrate: string;
  }
  const [selectedItem, setItems] = useState<DataItem | null>(null);

  const currentDate = () => {
    const californiaTimezone = "America/Los_Angeles";
    const options = { timeZone: californiaTimezone };
    const currentDateTime = new Date().toLocaleString("en-US", options);
    return currentDateTime;
  };

  const dolistCompany = () => {
    dispatch(listactions.doFetch());
  };

  const currentVip = (Id) => {
    if (currentUser?.vip?.id === Id) {
      return "Current Plan";
    }
    return "Upgrade";
  }
  useEffect(() => {
    dolistCompany();
    searchAllCoins();
    dispatch(Vipactions.doFetch());
    currentDate();
    // eslint-disable-next-line
  }, [dispatch]);

  const hideModal = () => {
    setShowModal(false);
    setSelectedVip(null);
  };

  const showModal = (item) => {
    setItems(item);
    setShowModal(true);
  };

  const showVipModal = (vipItem) => {
    setSelectedVip(vipItem);
  };

  const button__action = [
    {
      icon: "fa-regular fa-building",
      text: "About",
      link: "/about",
    },
    {
      icon: "fa-solid fa-file-contract",
      text: "T&C",
      link: "/tc",
    },
    {
      icon: "fa fa-certificate",
      text: "Certificate",
      link: "/Certificate",
    },
    {
      icon: "fa fa-user-plus",
      text: "Invitation",
      link: "/invitation",
    },
  ];

  const submit = (item) => {
    const data = {
      vip: item,
    };
    dispatch(actions.doUpdateProfileMobile(data));
    hideModal();
  };

  const NewsTicker = () => {
    return (
      <div className="news-ticker-container">
        <div className="news-ticker">
          <span>🚀 New VIP benefits starting next month! Upgrade now to enjoy higher commission rates. 🎉</span>
        </div>
      </div>
    );
  };

  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "https://cdn.manomano.com/media/campaign-manager/mobile_948b5dd6-7dc5-11f0-b77c-9afd618f43bc_2240024a-6e0d-4499-a120-e8f13f9f5b61_c15e080d3cd1851ad53d9f3f472c3ec671c16e71.jpg?w=656&h=200&fit=cover&format=webp",
    "https://cdn.manomano.com/media/campaign-manager/desktop_8ff5f021-c68e-11ee-9740-6eb461f55887_4c7e935c-c03a-41d4-8cf0-40a522210e37_623a2496bbf44209838b49b177e33c4bd34df0a1.jpg?format=webp",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  ];

  return (
    <div className="home-container">

      {/* Image Slider */}
      <section className="slider-section">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={5000}
          className="main-slider"
        >
          {images.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </section>

      {/* News Ticker */}
      <NewsTicker />

      {/* Quick Actions - All in one line */}
      <section className="quick-actions">
        <div className="action-grid">

          {button__action.map((item, index) => (
            <Link to={item.link} key={index}>
              <div className="action-item">
                <div className="action-icon">
                  <i className={item.icon}></i>
                </div>
                <span className="action-label">{item.text}</span>
              </div>
            </Link>
          ))}

        </div>
      </section>

      {/* VIP Section - Vertical List */}
      <section className="vip-section">
        <div className="section-header">
          <h2><i className="fas fa-crown"></i> VIP Membership Levels</h2>
        </div>

        <div className="vip-list">

          {record.map((item, index) => (
            <div className="vip-list-item" key={item._id}>
              <div className="vip-image-placeholder">
                <img src={item?.photo[0]?.downloadUrl} alt={item.title} />
              </div>
              <div className="vip-content">
                <div className="vip-header">
                  <h3>{item?.title}</h3>
                  <span className="vip-status current">{currentVip(item.id)}</span>
                </div>
                <div className="vip-details">
                  <div className="vip-detail">
                    <i className="fas fa-tasks"></i>
                    <span>{item?.dailyorder} tasks/set</span>
                  </div>
                  <div className="vip-detail">
                    <i className="fas fa-wallet"></i>
                    <span>Min. ${item?.levellimit} deposit</span>
                  </div>
                  <div className="vip-detail">
                    <i className="fas fa-money-bill-wave"></i>
                    <span>{item.comisionrate}% commission per product</span>
                  </div>
                </div>
                <button
                  className="upgrade-btn"
                  onClick={() => showVipModal(item)}
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Additional News Section */}


      {/* VIP Upgrade Modal */}
      {selectedVip && (
        <div className="modal-overlay" onClick={hideModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Upgrade to {selectedVip.title}</h2>
              <button className="modal-close" onClick={hideModal}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="modal-body">
              <div className="vip-modal-image">
                <img src={selectedVip?.photo[0]?.downloadUrl} alt={selectedVip.title} />
              </div>

              <div className="contact-support-message">
                <div className="support-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <h3>Contact Customer Support</h3>
                <p>To upgrade your VIP level, please contact our customer support team who will assist you with the upgrade process.</p>
              </div>

              <div className="benefits-list">
                <h3>Benefits:</h3>
                <div className="benefit-item">
                  <i className="fas fa-check-circle"></i>
                  <span><strong>Commission Rate:</strong> {selectedVip.comisionrate}% per product</span>
                </div>
                <div className="benefit-item">
                  <i className="fas fa-check-circle"></i>
                  <span><strong>tasks per set:</strong> {selectedVip.dailyorder} task</span>
                </div>
                <div className="benefit-item">
                  <i className="fas fa-check-circle"></i>
                  <span><strong>Minimum Deposit:</strong> ${selectedVip.levellimit}</span>
                </div>
                <div className="benefit-item">
                  <i className="fas fa-check-circle"></i>
                  <span><strong>Withdrawals per Day:</strong> {selectedVip.withdrawperday}</span>
                </div>
              </div>

              <div className="modal-actions">
                <button className="cancel-btn" onClick={hideModal}>
                  Cancel
                </button>
                <Link to="/Online" className="contact-support-btn">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Base styles */
        .home-container {
          max-width: 480px;
          margin: 0 auto;
          background: linear-gradient(135deg, #f5f7ff 0%, #e6e9ff 100%);
          min-height: 100vh;
          padding-bottom: 80px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        /* Header */
        .app-header {
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          color: white;
          padding: 16px 20px;
          border-radius: 0 0 20px 20px;
          box-shadow: 0 4px 20px rgba(15, 33, 97, 0.2);
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .app-logo {
          font-size: 24px;
          font-weight: 800;
          margin: 0;
        }
        
        .header-actions {
          display: flex;
          gap: 16px;
        }
        
        .header-actions i {
          font-size: 20px;
          cursor: pointer;
        }
        
        /* Slider Section */
        .slider-section {
          margin: 16px 0;
          padding: 0 10px;
        }
        
        .main-slider {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        
        .main-slider img {
          height: 200px;
          object-fit: cover;
        }
        
        /* News Ticker */
        .news-ticker-container {
          background: #0f2161;
          color: white;
          padding: 12px 0;
          margin: 0 10px 20px;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 4px 12px rgba(15, 33, 97, 0.2);
        }
        
        .news-ticker {
          white-space: nowrap;
          animation: ticker 20s linear infinite;
          padding: 0 20px;
        }
        
        .news-ticker span {
          font-size: 14px;
          display: inline-block;
          padding-left: 100%;
        }
        
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        
        /* Quick Actions - All in one line */
        .quick-actions {
          padding: 0 10px;
          margin-bottom: 20px;
        }
        
        .action-grid {
          display: flex;
          justify-content: space-around;
          overflow-x: auto;
          padding: 10px 5px;
          scrollbar-width: none;
          gap: 8px;
        }

        
        .action-grid::-webkit-scrollbar {
          display: none;
        }
        
        .action-item {
          flex: 0 0 auto;
          background: white;
          border-radius: 12px;
          padding: 12px 8px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          min-width: 70px;
          transition: transform 0.2s;
        }
        
        .action-item:active {
          transform: scale(0.97);
        }
        
        .action-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f0f4ff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 8px;
          color: #0f2161;
          font-size: 16px;
        }
        
        .action-label {
          color: #0f2161;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }
        
        /* VIP Section - Vertical List */
        .vip-section {
          padding: 0 20px;
          margin-bottom: 24px;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .section-header h2 {
          color: #0f2161;
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .section-header h2 i {
          color: #ffde59;
        }
        
        .vip-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .vip-list-item {
          background: white;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }
        
        .vip-image-placeholder {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          background: #f0f4ff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          flex-shrink: 0;
          overflow: hidden;
        }
        
        .vip-image-placeholder img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .vip-content {
          flex: 1;
        }
        
        .vip-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        
        .vip-header h3 {
          color: #0f2161;
          font-size: 18px;
          margin: 0;
        }
        
        .vip-status {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 4px;
        }
        
        .vip-status.current {
          background: #e6f4ea;
          color: #0f9d58;
        }
        
        .vip-status.recommended {
          background: #fff8e1;
          color: #e6b400;
        }
        
        .vip-details {
          margin-bottom: 12px;
        }
        
        .vip-detail {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .vip-detail i {
          color: #0f2161;
          width: 20px;
          margin-right: 8px;
          font-size: 14px;
        }
        
        .vip-detail span {
          color: #7b8796;
          font-size: 14px;
        }
        
        .upgrade-btn {
          padding: 8px 16px;
          border-radius: 8px;
          border: none;
          background: #f0f4ff;
          color: #1a3a8f;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
          width: 100%;
          transition: all 0.3s ease;
        }
        
        .upgrade-btn:hover {
          background: #e1e8ff;
        }
        
        .upgrade-btn.primary {
          background: #ffde59;
          color: #0f2161;
        }
        
        /* News Section */
        .news-section {
          padding: 0 20px;
          margin-bottom: 30px;
        }
        
        .news-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .news-item {
          background: white;
          border-radius: 16px;
          padding: 16px;
          display: flex;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        .news-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #f0f4ff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          color: #0f2161;
          font-size: 20px;
          flex-shrink: 0;
        }
        
        .news-content h3 {
          color: #0f2161;
          font-size: 16px;
          margin: 0 0 8px;
        }
        
        .news-content p {
          color: #7b8796;
          font-size: 14px;
          margin: 0;
        }
        
        /* VIP Modal Styles */
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
          z-index: 1000;
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
        
        .modal-header h2 {
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
        }
        
        .vip-modal-image {
          width: 120px;
          height: 120px;
          border-radius: 16px;
          margin: 0 auto 20px;
          overflow: hidden;
          background: #f0f4ff;
        }
        
        .vip-modal-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        /* Contact Support Message */
        .contact-support-message {
          text-align: center;
          margin-bottom: 20px;
          padding: 16px;
          background: #f0f8ff;
          border-radius: 12px;
          border-left: 4px solid #0f2161;
        }
        
        .support-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #0f2161;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px;
          font-size: 24px;
        }
        
        .contact-support-message h3 {
          color: #0f2161;
          font-size: 18px;
          margin: 0 0 8px;
        }
        
        .contact-support-message p {
          color: #7b8796;
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
        }
        
        .benefits-list {
          margin-bottom: 24px;
        }
        
        .benefits-list h3 {
          color: #0f2161;
          font-size: 18px;
          margin-bottom: 16px;
          text-align: center;
        }
        
        .benefit-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 12px;
          padding: 12px;
          background: #f8faff;
          border-radius: 8px;
        }
        
        .benefit-item i {
          color: #0f9d58;
          margin-right: 12px;
          font-size: 16px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        
        .benefit-item span {
          color: #0f2161;
          font-size: 14px;
          line-height: 1.4;
        }
        
        .benefit-item strong {
          color: #0f2161;
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
        
        .contact-support-btn {
          flex: 2;
          padding: 14px;
          border: none;
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          color: white;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s ease;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        
        .contact-support-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(15, 33, 97, 0.4);
          color: white;
        }
        
        /* Bottom Navigation */
        .bottom-navigation {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          display: flex;
          justify-content: space-around;
          padding: 12px 0;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
          z-index: 100;
        }
        
        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: #7b8796;
          font-size: 12px;
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
          .action-item {
            min-width: 60px;
            padding: 10px 6px;
          }
          
          .action-icon {
            width: 32px;
            height: 32px;
            font-size: 14px;
          }
          
          .action-label {
            font-size: 11px;
          }
          
          .modal-content {
            margin: 10px;
            max-height: 85vh;
          }
          
          .modal-body {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;