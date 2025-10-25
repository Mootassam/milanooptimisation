import { createSelector } from 'reselect';

const selectRaw = (state) => state.deposit.form;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);
const selectModal = createSelector(
  [selectRaw],
  (raw) => raw.showModal,
);


const modalError = createSelector(
  [selectRaw],
  (raw) => raw.showErrorModal,
);




const selectInitLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.initLoading),
);

const selectSaveLoading = createSelector(
  [selectRaw],
  (raw) => Boolean(raw.saveLoading),
);

const couponsFormSelectors = {
  selectInitLoading,
  selectSaveLoading,
  selectRecord,
  selectModal,
  modalError,
  selectRaw,
};

export default couponsFormSelectors;