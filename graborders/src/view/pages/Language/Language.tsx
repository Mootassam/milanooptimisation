import React, { useState } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import { useDispatch, useSelector } from "react-redux";
import actions from "src/modules/auth/authActions";
import { i18n } from "../../../i18n";
import I18nSelect from "src/view/layout/I18nSelect";

function Language() {
  const dispatch = useDispatch();


  return (
    <div className="language-settings-container">
      <SubHeader title="Language Settings" path="/profile" />
      
<I18nSelect />

      <style>{`
        .language-settings-container {
          min-height: 100vh;
          background: #f5f7fa;
          padding-bottom: 40px;
        }

        /* Main Section */
        .language-settings-section {
          padding: 20px 15px;
          max-width: 500px;
          margin: 0 auto;
        }

        /* Main Card */
        .language-settings-card {
          background: white;
          border-radius: 20px;
          padding: 25px 20px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }

        /* Header Section */
        .language-settings-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f0f4ff;
        }

        .language-header-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #f0f4ff;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f2161;
          font-size: 24px;
        }

        .language-header-content {
          flex: 1;
        }

        .language-main-title {
          color: #0f2161;
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 5px 0;
        }

        .language-subtitle {
          color: #7b8796;
          font-size: 14px;
          margin: 0;
          line-height: 1.4;
        }

        /* Current Language Section */
        .current-language-section {
          background: linear-gradient(135deg, #0f2161 0%, #1a3a8f 100%);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 25px;
          color: white;
        }

        .current-language-label {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 8px;
        }

        .current-language-display {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .current-language-flag {
          font-size: 24px;
        }

        .current-language-name {
          font-size: 18px;
          font-weight: 600;
          flex: 1;
        }

        .current-language-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          backdrop-filter: blur(5px);
        }

        /* Language List Section */
        .language-list-section {
          margin-bottom: 25px;
        }

        .language-list-title {
          color: #0f2161;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 15px;
          padding-left: 5px;
        }

        .language-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .language-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          border-radius: 12px;
          border: 2px solid #f0f4ff;
          background: #fafbfc;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .language-item:hover {
          border-color: #0f2161;
          background: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(15, 33, 97, 0.1);
        }

        .language-item.active {
          border-color: #0f2161;
          background: #f0f4ff;
        }

        .language-item:active {
          transform: scale(0.98);
        }

        .language-item-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .language-flag {
          font-size: 20px;
          width: 30px;
          text-align: center;
        }

        .language-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgba(15, 33, 97, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f2161;
          font-size: 14px;
        }

        .language-info {
          flex: 1;
        }

        .language-name {
          color: #0f2161;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .language-native {
          color: #7b8796;
          font-size: 13px;
        }

        .language-item-right {
          display: flex;
          align-items: center;
        }

        .language-active-indicator {
          color: #0f2161;
          font-size: 18px;
        }

        .language-select-arrow {
          color: #7b8796;
          font-size: 14px;
        }

        /* Help Section */
        .language-help-section {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: #f8f9ff;
          border-radius: 12px;
          border: 1px solid #e8ecff;
        }

        .language-help-icon {
          color: #0f2161;
          font-size: 18px;
          margin-top: 2px;
        }

        .language-help-content {
          flex: 1;
        }

        .language-help-title {
          color: #0f2161;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .language-help-text {
          color: #7b8796;
          font-size: 13px;
          line-height: 1.4;
        }

        /* Responsive Design */
        @media (max-width: 480px) {
          .language-settings-section {
            padding: 15px 10px;
          }

          .language-settings-card {
            padding: 20px 15px;
          }

          .language-main-title {
            font-size: 20px;
          }

          .language-header-icon {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }

          .current-language-section {
            padding: 16px;
          }

          .current-language-display {
            flex-wrap: wrap;
            gap: 8px;
          }

          .language-item {
            padding: 14px;
          }

          .language-item-left {
            gap: 10px;
          }

          .language-flag {
            font-size: 18px;
            width: 25px;
          }

          .language-icon {
            width: 32px;
            height: 32px;
            font-size: 12px;
          }
        }

        @media (min-width: 768px) {
          .language-settings-section {
            max-width: 500px;
            padding: 30px 20px;
          }
        }

        /* Animation for language change */
        @keyframes languageChange {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }

        .language-item:active {
          animation: languageChange 0.2s ease;
        }
      `}</style>
    </div>
  );
}

export default Language;