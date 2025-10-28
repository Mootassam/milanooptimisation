import React,{useEffect} from "react";
import "./styles/style.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import notificationListActions from "src/modules/notification/list/notificationListActions";
import notificationListSelectors from "src/modules/notification/list/notificationListSelectors";

function Header(props) {
  const {
    title,           // Title for sub-header mode
    detail,          // Detail text for sub-header mode  
    showBackButton = false, // Show back button for sub-header mode
    showLogo = true,        // Show logo for header mode
    showNotification = true // Show notification icon
  } = props;

  const dispatch = useDispatch();
  const history = useHistory();
  
  const selectCountUnread = useSelector(notificationListSelectors.selectCountUnread);
  const selectLoadingCount = useSelector(notificationListSelectors.selectLoadingCount);

  useEffect(() => {
    dispatch(notificationListActions.doCountUnread());
  }, [dispatch]);

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="header">
      {/* Left Section - Back Button or Logo */}
      <div className="header-left">
        {showBackButton ? (
          <div className="back-btn" onClick={goBack}>
            <i className="fas fa-arrow-left" />
          </div>
        ) : showLogo ? (
          <div className="logo">
            Mano<span>Mano</span>
          </div>
        ) : (
          <div></div> // Empty space for alignment
        )}
      </div>

      {/* Center Section - Title or Empty */}
      <div className="header-center">
        {title && (
          <div className="header-title">
            <h1>{title}</h1>
            {detail && <p>{detail}</p>}
          </div>
        )}
      </div>

      {/* Right Section - Notification Icon */}
      <div className="header-right">
        {showNotification && (
          <Link to="/notification" className="remove__ligne">
            <div className="header-icons">
              <div className="notification-icon-wrapper">
                <i className="fas fa-bell" />
                {selectCountUnread > 0 && !selectLoadingCount && (
                  <span className="notification-badga">
                    {selectCountUnread > 99 ? '99+' : selectCountUnread}
                  </span>
                )}
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;