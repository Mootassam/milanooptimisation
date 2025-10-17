import React, { useEffect, useRef } from "react";
import "../styles/styles.css";
import { useSelector, useDispatch } from "react-redux";
import actions from "src/modules/category/list/categoryListActions";
import selector from "src/modules/category/list/categoryListSelectors";
import LoadingModal from "src/shared/LoadingModal";
import SubHeader from "src/view/shared/Header/SubHeader";
import { i18n } from "../../../i18n";

declare global {
  interface Window {
    $crisp: any[];
    CRISP_WEBSITE_ID: string;
  }
}

// Global flag to track Crisp initialization
let crispInitialized = false;

function LiveChat() {
  const dispatch = useDispatch();
  const record = useSelector(selector.selectRows);
  const loading = useSelector(selector.selectLoading);
  const crispShown = useRef(false);

  useEffect(() => {
    dispatch(actions.doFetch());
  }, [dispatch]);

  useEffect(() => {
    const initializeCrisp = () => {
      // Initialize Crisp only once
      if (!crispInitialized) {
        window.$crisp = [];
        window.CRISP_WEBSITE_ID = "9334600b-db8a-45e0-84df-3892e749ff86";

        const script = document.createElement('script');
        script.src = 'https://client.crisp.chat/l.js';
        script.async = true;
        script.id = 'crisp-chat-script';

        script.onload = () => {
          crispInitialized = true;
          showCrispChat();
        };

        document.head.appendChild(script);
      } else {
        // If already initialized, just show it
        showCrispChat();
      }
    };

    const showCrispChat = () => {
      if (window.$crisp && window.$crisp.push && !crispShown.current) {
        try {
          window.$crisp.push(["do", "chat:show"]);
          window.$crisp.push(["do", "chat:open"]);
          crispShown.current = true;
        } catch (error) {
          console.log("Showing Crisp chat...");
        }
      }
    };

    const hideCrispChat = () => {
      if (window.$crisp && window.$crisp.push) {
        try {
          window.$crisp.push(["do", "chat:hide"]);
          window.$crisp.push(["do", "chat:close"]);
          crispShown.current = false;
        } catch (error) {
          console.log("Hiding Crisp chat...");
        }
      }
    };

    // Initialize and show Crisp
    initializeCrisp();

    // Hide Crisp when leaving the page
    return () => {
      hideCrispChat();
    };
  }, []);


  return (
    <div className="customer-service-container">

    </div>
  );
}

export default LiveChat;