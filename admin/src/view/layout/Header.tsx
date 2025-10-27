import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import layoutActions from 'src/modules/layout/layoutActions';
import { getHistory } from 'src/modules/store';
import I18nSelect from 'src/view/layout/I18nSelect';
import HeaderWrapper from 'src/view/layout/styles/HeaderWrapper';
import Avatar from 'src/view/shared/Avatar';
import config from 'src/config';

function Header(props) {
  const dispatch = useDispatch();

  const doToggleMenu = () => {
    dispatch(layoutActions.doToggleMenu());
  };

  const userText = useSelector(
    authSelectors.selectCurrentUserNameOrEmailPrefix,
  );
  const userAvatar = useSelector(
    authSelectors.selectCurrentUserAvatar,
  );
  const currentTenant = useSelector(
    authSelectors.selectCurrentTenant,
  );

  const doSignout = () => {
    dispatch(authActions.doSignout());
  };

  const doNavigateToProfile = () => {
    getHistory().push('/profile');
  };
  const doNavigateToAuditLog = () => {
    getHistory().push('/audit-logs');
  };
  const doNavigateToSettings = () => {
    getHistory().push('/settings');
  };

  const doNavigateToPasswordChange = () => {
    getHistory().push('/password-change');
  };

  const doNavigateToTenants = () => {
    getHistory().push('/tenant');
  };

  // Mock data for counts - replace with actual data from your state
  const withdrawCount = 5; // Example count
  const depositCount = 12; // Example count

  return (
    <HeaderWrapper className="navbar sticky-top navbar-light bg-white border-bottom">
      <button
        type="button"
        onClick={doToggleMenu}
        className="menu-toggle-button"
      >
        <i className="fas fa-bars" />
      </button>

      <div style={{
        display: 'flex',
        gap: '15px',
        alignItems: 'center'
      }}>

        <div className='header-buttons'>
          {/* Deposit Button */}
          <div 
            className="header-button deposit-button"
            onClick={() => getHistory().push('/deposit')}
          >
            <div className="button-content">
              <i className="fas fa-arrow-down button-icon"></i>
              <span className="button-text">Deposit</span>
              <span className="count-badge">{depositCount}</span>
            </div>
          </div>

          {/* Withdraw Button */}
          <div 
            className="header-button withdraw-button"
            onClick={() => getHistory().push('/withdraw')}
          >
            <div className="button-content">
              <i className="fas fa-arrow-up button-icon"></i>
              <span className="button-text">Withdraw</span>
              <span className="count-badge">{withdrawCount}</span>
            </div>
          </div>
        </div>

        {/* <span className="i18n-select">
          <I18nSelect />
        </span> */}

        <div className="dropdown">
          <span
            className="user-dropdown"
            data-toggle="dropdown"
          >
            <div className="user-dropdown-content">
              <span className="user-dropdown-avatar">
                <Avatar
                  size="small"
                  src={userAvatar || undefined}
                  alt="avatar"
                />
              </span>
              <span className="user-dropdown-text">
                <span>{userText}</span>
                {['multi', 'multi-with-subdomain'].includes(
                  config.tenantMode,
                ) && (
                    <span className="user-dropdown-text-tenant">
                      {currentTenant && currentTenant.name}
                    </span>
                  )}
              </span>
            </div>
          </span>
          <div className="dropdown-menu dropdown-menu-right">
            <button
              onClick={doNavigateToProfile}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-user" />
              {i18n('auth.profile.title')}
            </button>
            <button
              onClick={doNavigateToPasswordChange}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-lock" />
              {i18n('auth.passwordChange.title')}
            </button>
            {['multi', 'multi-with-subdomain'].includes(
              config.tenantMode,
            ) && (
                <button
                  onClick={doNavigateToTenants}
                  className="dropdown-item"
                  type="button"
                >
                  <i className="fas fa-th-large" />
                  {i18n('auth.tenants')}
                </button>
              )}

            <button
              onClick={doNavigateToAuditLog}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-book" />
              {i18n('auditLog.menu')}
            </button>

            <button
              onClick={doSignout}
              className="dropdown-item"
              type="button"
            >
              <i className="fas fa-sign-out-alt" />
              {i18n('auth.signout')}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .header-buttons {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .header-button {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 1px solid transparent;
          background: #f8f9fa;
          position: relative;
        }

        .header-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .deposit-button:hover {
          background: #e7f3ff;
          border-color: #007bff;
        }

        .withdraw-button:hover {
          background: #fff5f5;
          border-color: #dc3545;
        }

        .button-content {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 500;
        }

        .button-icon {
          font-size: 14px;
        }

        .deposit-button .button-icon {
          color: #007bff;
        }

        .withdraw-button .button-icon {
          color: #dc3545;
        }

        .button-text {
          font-size: 14px;
          color: #495057;
          white-space: nowrap;
        }

        .count-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
          height: 20px;
          padding: 0 6px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 600;
          color: white;
        }

        .deposit-button .count-badge {
          background: #007bff;
        }

        .withdraw-button .count-badge {
          background: #dc3545;
        }

        /* Pulse animation for counts */
        .count-badge {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .header-buttons {
            gap: 8px;
          }
          
          .header-button {
            padding: 6px 12px;
          }
          
          .button-text {
            font-size: 12px;
          }
          
          .button-content {
            gap: 6px;
          }
          
          .count-badge {
            min-width: 20px;
            height: 18px;
            font-size: 10px;
          }
        }

        @media (max-width: 576px) {
          .button-text {
            display: none;
          }
          
          .header-button {
            padding: 8px;
          }
          
          .button-content {
            gap: 4px;
          }
        }
      `}</style>
    </HeaderWrapper>
  );
}

export default Header;