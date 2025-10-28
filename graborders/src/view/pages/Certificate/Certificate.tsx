import React, { useEffect } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";
import actions from "src/modules/company/list/companyListActions";
import selectors from "src/modules/company/list/companyListSelectors";
import { useDispatch, useSelector } from "react-redux";
import LoadingModal from "src/shared/LoadingModal";
import Header from "src/view/layout/Header";

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
    <div>


         <Header
        title="Certificate"
        showBackButton={true}
        showLogo={false}
        showNotification={true}
      />

        <div className="page-title"></div>

      <div className="detaill__company" style={{ whiteSpace: "pre-line" }}>
        <img src="/images/certificate.jpg"  />
      </div>
    </div>
  );
}

export default Tc;
