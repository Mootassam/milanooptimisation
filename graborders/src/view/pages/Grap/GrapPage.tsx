import React, { useState, useEffect, useCallback } from "react";
import "../styles/styles.css";
import { useDispatch, useSelector } from "react-redux";
import authSelectors from "src/modules/auth/authSelectors";
import actions from "src/modules/product/list/productListActions";
import selector from "src/modules/product/list/productListSelectors";
import LoadingModal from "src/shared/LoadingModal";
import Dates from "src/view/shared/utils/Dates";
import recordActions from "src/modules/record/form/recordFormActions";
import recordListAction from "src/modules/record/list/recordListActions";
import recordSelector from "src/modules/record/list/recordListSelectors";
import Image from "src/shared/Images";
import { useHistory } from "react-router-dom";
import authActions from "src/modules/auth/authActions";
import Amount from "src/shared/Amount";
import productListSelectors from "src/modules/product/list/productListSelectors";
import productListActions from "src/modules/product/list/productListActions";
import GrapModal from "./GrapModal";

const Grappage = () => {

  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [lodingRoll, setLoadingRoll] = useState(false);

  const currentUser = useSelector(authSelectors.selectCurrentUser);
  const history = useHistory();
  const dispatch = useDispatch();

  // Selectors
  const items = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);
  const showModals = useSelector(productListSelectors.showModal);
  const checkLoading = useSelector(recordSelector.selectCheckLoading);
  const selectCountRecord = useSelector(recordSelector.selectCountRecord);
  const error = useSelector(recordSelector.selectError);

  const [number] = useState(Dates.Number());

  // Check if button should be disabled
  const disableButton = currentUser?.balance <= 0 ||
    !currentUser?.grab ||
    currentUser?.tasksDone >= currentUser?.vip?.dailyorder;

  const handleStartClick = async () => {
    if (disableButton || lodingRoll) return;

    setLoadingRoll(true);
    try {
      await rollAll();
      // The modal will be shown based on the response from rollAll
    } catch (error) {
      console.log("Error starting grab:", error);
    } finally {
      setLoadingRoll(false);
    }
  };

  const handleCloseModal = () => {
    dispatch(productListActions.doCloseModal());
  };

  const refreshItems = useCallback(async () => {
    await dispatch(recordListAction.doFetch());
    await dispatch(authActions.doRefreshCurrentUser());
  }, [dispatch]);

  const rollAll = async () => {
    try {

      const result = await dispatch(actions.doFetch());



      return result;
    } catch (error) {
      console.log("Roll all error:", error);
      throw error;
    } finally {
      setLoadingRoll(false);
    }
  };

  const hideModal = () => {
    dispatch(productListActions.doCloseModal());
  };

  useEffect(() => {
    dispatch(recordListAction.doCount());
  }, [dispatch, showModals, checkLoading]);

  const calcule__total = (price, comission) => {
    const total = (parseFloat(comission) / 100) * parseFloat(price);
    return total.toFixed(3);
  };

  const submit = async () => {
    if (!items) return;

    const values = {
      number: number,
      product: items?.id,
      status: items?.combo ? "pending" : "completed",
      user: currentUser.id,
    };

    try {
      await dispatch(recordActions.doCreate(values));

    } catch (error) {
      console.log("Submit error:", error);
    }
  };

  const goto = (param) => {
    history.push(param);
  };

  return (
    <>
      {/* Loading Modal */}
      {(loading || lodingRoll) && <LoadingModal />}



      {/* Grap Modal */}
      {showModals && !loading && (
        <GrapModal
          show={showModals}
          onClose={handleCloseModal}
          items={items}
          number={number}
          submit={submit}
        />
      )}

      {/* Page Content */}
      <div className="page-content">
        {/* Commission Section */}
        <div className="commission-section">
          <h2 className="section-title">
            <i className="fas fa-chart-line" />
            Commission Rate
          </h2>
          <div className="commission-rate">{currentUser?.vip?.comisionrate}%</div>
          <p className="commission-desc">
            Exclusive channel for exclusive members. Higher VIP levels unlock
            better commission rates and more order opportunities.
          </p>
          <button
            className={`start-button ${lodingRoll ? "loading" : ""} ${disableButton ? "disabled" : ""}`}
            onClick={handleStartClick}
            disabled={disableButton || lodingRoll}
          >
            {lodingRoll ? "Processing..." : "Start"}
          </button>

          {/* Show disabled reasons */}
          {disableButton && (
            <div className="disabled-reasons">
              {currentUser?.balance <= 0 && <p>Insufficient balance</p>}
              {!currentUser?.grab && <p>Grab feature not available</p>}
              {currentUser?.tasksDone >= currentUser?.vip?.dailyorder && (
                <p>Daily order limit reached</p>
              )}
            </div>
          )}
        </div>

        {/* Achievements Section */}
        <div className="achievements-section">
          <h2 className="section-title">
            <i className="fas fa-trophy" />
            Today's Achievements
          </h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{currentUser?.vip?.comisionrate}%</div>
              <div className="stat-label">Commission</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{currentUser?.balance?.toFixed(2)}</div>
              <div className="stat-label">Available Balance (USDT)</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{currentUser?.tasksDone}</div>
              <div className="stat-label">Orders Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{currentUser?.tasksDone}/{currentUser?.vip?.dailyorder}</div>
              <div className="stat-label">Total Orders</div>
            </div>
          </div>
          <div className="info-note">
            A higher rank member can unlock more orders and get more
            commission. Upgrade your VIP level to increase your earning
            potential.
          </div>
        </div>

        {/* Rules Section */}
        <div className="rules-section">
          <h2 className="section-title">
            <i className="fas fa-info-circle" />
            Rules Description
          </h2>
          <ul className="rules-list">
            <li>
              <div className="rule-number">1</div>
              <div className="rule-text">
                Every user in the platform should be able to submit all daily
                orders before withdrawal
              </div>
            </li>
            <li>
              <div className="rule-number">2</div>
              <div className="rule-text">
                Commissions depends on the VIP level
              </div>
            </li>
            <li>
              <div className="rule-number">3</div>
              <div className="rule-text">
                The system automatically dispatch's the products through the
                cloud after submission
              </div>
            </li>
            <li>
              <div className="rule-number">4</div>
              <div className="rule-text">
                If the order is not submitted, the user will not be able to
                continue with the next product. The user need to submit the
                previous product to continue with the task
              </div>
            </li>
          </ul>
        </div>
      </div>

      <style>{`
        /* Page Content */
        .page-content {
            padding: 20px 0px;
        }
        
        .section-title {
            color: #0f2161;
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 20px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .section-title i {
            color: #ffde59;
        }
        
        /* Commission Section */
        .commission-section {
            background: white;
            border-radius: 20px;
            padding: 25px 20px;
            margin-bottom: 25px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
            text-align: center;
            position: relative;
        }
        
        .commission-rate {
            font-size: 32px;
            font-weight: 800;
            color: #0f2161;
            margin: 15px 0;
        }
        
        .commission-desc {
            color: #7b8796;
            margin-bottom: 25px;
            font-size: 15px;
            line-height: 1.5;
        }
        
        .start-button {
            background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
            color: white;
            border: none;
            border-radius: 50px;
            padding: 16px 40px;
            font-size: 18px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(15, 33, 97, 0.3);
            width: 100%;
            max-width: 200px;
        }
        
        .start-button:hover:not(.disabled):not(.loading) {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(15, 33, 97, 0.4);
        }
        
        .start-button:active:not(.disabled):not(.loading) {
            transform: scale(0.97);
        }
        
        .start-button.loading {
            background: linear-gradient(135deg, #7b8796 0%, #a0aec0 100%);
            cursor: not-allowed;
            opacity: 0.7;
        }
        
        .start-button.disabled {
            background: #cbd5e0;
            cursor: not-allowed;
            opacity: 0.6;
            box-shadow: none;
        }
        
        .disabled-reasons {
            margin-top: 10px;
            font-size: 12px;
            color: #e53e3e;
        }
        
        .disabled-reasons p {
            margin: 2px 0;
        }
        
        /* Achievements Section */
        .achievements-section {
            background: white;
            border-radius: 20px;
            padding: 25px 20px;
            margin-bottom: 25px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .stat-card {
            background: #f0f4ff;
            border-radius: 15px;
            padding: 20px;
            text-align: center;
        }
        
        .stat-value {
            color: #0f2161;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 5px;
        }
        
        .stat-label {
            color: #7b8796;
            font-size: 14px;
        }
        
        .info-note {
            background: #fff8e1;
            border-radius: 12px;
            padding: 15px;
            font-size: 14px;
            color: #7b8796;
            line-height: 1.5;
            border-left: 4px solid #ffde59;
        }
        
        /* Rules Section */
        .rules-section {
            background: white;
            border-radius: 20px;
            padding: 25px 20px;
            margin-bottom: 25px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }
        
        .rules-list {
            list-style-type: none;
        }
        
        .rules-list li {
            padding: 15px 0;
            border-bottom: 1px solid #f0f4ff;
            display: flex;
            align-items: flex-start;
            gap: 15px;
        }
        
        .rules-list li:last-child {
            border-bottom: none;
        }
        
        .rule-number {
            background: #0f2161;
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            flex-shrink: 0;
        }
        
        .rule-text {
            color: #7b8796;
            font-size: 15px;
            line-height: 1.5;
        }
        
        /* Responsive adjustments */
        @media (max-width: 340px) {
            .stats-grid {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
    </>
  );
};

export default Grappage;