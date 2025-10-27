import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userSelectors from 'src/modules/user/userSelectors';
import selectors from 'src/modules/user/list/userListSelectors';
import actions from 'src/modules/user/list/userListActions';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import Pagination from 'src/view/shared/table/Pagination';
import Spinner from 'src/view/shared/Spinner';
import TableColumnHeader from 'src/view/shared/table/TableColumnHeader';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Roles from 'src/security/roles';
import UserStatusView from 'src/view/user/view/UserStatusView';
import Avatar from 'src/view/shared/Avatar';
import TableWrapper from 'src/view/shared/styles/TableWrapper';
import recordListActions from 'src/modules/record/list/recordListActions';
import selectorTaskdone from 'src/modules/record/list/recordListSelectors';
import UserService from 'src/modules/user/userService';

function UserTable() {
  const dispatch = useDispatch();
  const [recordIdToDestroy, setRecordIdToDestroy] = useState(null);
  const [totalTask, setTotalTasks] = useState('');
  const tasksdone = useSelector(selectorTaskdone.selectCountRecord);
  const LoadingTasksDone = useSelector(selectorTaskdone.selectLoading);
  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(selectors.selectPagination);
  const selectedKeys = useSelector(selectors.selectSelectedKeys);
  const [showTask, setShowTask] = useState(false);
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(selectors.selectIsAllSelected);
  const hasPermissionToEdit = useSelector(userSelectors.selectPermissionToEdit);
  const hasPermissionToDestroy = useSelector(userSelectors.selectPermissionToDestroy);

  const doDestroy = (id) => {
    setRecordIdToDestroy(null);
    dispatch(actions.doDestroy(id));
  };

  const doChangeSort = (field) => {
    const order = sorter.field === field && sorter.order === 'ascend' ? 'descend' : 'ascend';
    dispatch(actions.doChangeSort({ field, order }));
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
  };

  const showThecurrentRecord = async (id, totaltask?) => {
    setShowTask(true);
    await dispatch(recordListActions.doTasksDone(id));
    setTotalTasks(totaltask);
  };

  useEffect(() => { }, [dispatch, tasksdone]);

  const oneClick = async (id) => {
    await UserService.doOneClickLogin(id);
  };

  return (
    <div className="user-list-container">
      <div className="table-responsive">
        <table className="user-list-table">
          <thead className="table-header">
            <tr>
              <th className="checkbox-column">
                {hasRows && (
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={Boolean(isAllSelected)}
                      onChange={doToggleAllSelected}
                    />
                  </div>
                )}
              </th>
              <th className="sortable-header" onClick={() => doChangeSort('email')}>
                {i18n('user.fields.email')}
                {sorter.field === 'email' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="sortable-header" onClick={() => doChangeSort('phoneNumber')}>
                {i18n('user.fields.phoneNumber')}
                {sorter.field === 'phoneNumber' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="sortable-header" onClick={() => doChangeSort('invitationcode')}>
                {i18n('user.fields.invitationcode')}
                {sorter.field === 'invitationcode' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
              <th className="sortable-header" onClick={() => doChangeSort('refcode')}>
                {i18n('user.fields.refcode')}
                {sorter.field === 'refcode' && (
                  <span className="sort-icon">
                    {sorter.order === 'ascend' ? '↑' : '↓'}
                  </span>
                )}
              </th>
           
              <th className="table-header">
                {i18n('user.fields.balance')}
              </th>
              <th className="table-header text-center">
                {i18n('user.fields.status')}
              </th>
              <th className="table-header text-center">
                {i18n('user.fields.country')}
              </th>
              <th className="actions-header">Actions</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {loading && (
              <tr>
                <td colSpan={10} className="loading-cell">
                  <div className="loading-container">
                    <Spinner />
                    <span className="loading-text">
                      Loading data...
                    </span>
                  </div>
                </td>
              </tr>
            )}
            {!loading && !hasRows && (
              <tr>
                <td colSpan={10} className="no-data-cell">
                  <div className="no-data-content">
                    <i className="fas fa-database no-data-icon"></i>
                    <p>{i18n('table.noData')}</p>
                  </div>
                </td>
              </tr>
            )}
            {!loading &&
              rows.map((row) => (
                <tr key={row.id} className="table-row">
                  <td className="checkbox-column">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={selectedKeys.includes(row.id)}
                        onChange={() => doToggleOneSelected(row.id)}
                      />
                    </div>
                  </td>
                  <td className="table-cell">{row.email}</td>
                  <td className="table-cell">{row.phoneNumber}</td>
                  <td className="table-cell">{row.invitationcode}</td>
                  <td className="table-cell">{row.refcode}</td>
                  <td className="table-cell">
                  ${row.balance.toFixed(2)}
                  </td>
                  <td className="table-cell text-center">
                    <UserStatusView value={row.status} />
                  </td>
                  <td className="table-cell text-center">
                    <span>{row.country} <br />{row.ipAddress}</span>
                  </td>
                  <td className="actions-cell">
                    <div className='buttons-container'

                    >
                      <button
                        className="btn-action primary"
                        onClick={() => oneClick(row.id)}
                      >
                        <i className="fas fa-sign-in-alt"></i>
                        Login
                      </button>

                      <button
                        className="btn-action success"
                        onClick={() => showThecurrentRecord(row.id, row?.vip?.dailyorder)}
                      >
                        <i className="fas fa-tasks"></i>
                        Tasks
                      </button>

                      <Link
                        className="btn-action info"
                        to={`/password-reset/${row.id}`}
                      >
                        <i className="fas fa-key"></i>
                        Password
                      </Link>

                      <Link
                        className="btn-action warning"
                        to={`/user/${row.id}`}
                      >
                        <i className="fas fa-eye"></i>
                        View
                      </Link>

                      {hasPermissionToEdit && (
                        <Link
                          className="btn-action primary"
                          to={`/user/${row.id}/edit`}
                        >
                          <i className="fas fa-edit"></i>
                          Edit
                        </Link>
                      )}

                      {hasPermissionToDestroy && (
                        <button
                          className="btn-action danger"
                          onClick={() => setRecordIdToDestroy(row.id)}
                        >
                          <i className="fas fa-lock"></i>
                          Freeze
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <Pagination
          onChange={doChangePagination}
          disabled={loading}
          pagination={pagination}
        />
      </div>

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => setRecordIdToDestroy(null)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}

      {!LoadingTasksDone && showTask && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="modal-title">
                <i className="fas fa-tasks"></i>
                Task Progress
              </h3>
              <button className="modal-close" onClick={() => setShowTask(false)}>
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              <div className="payment-details-grid">
                <div className="detail-section">
                  <div className="detail-row">
                    <span className="detail-label">Completed Tasks:</span>
                    <span className="detail-value amount">
                      {tasksdone} / {totalTask}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-action primary" onClick={() => setShowTask(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .user-list-container {
          width: 100%;
        }

        .sort-icon {
          margin-left: 8px;
          font-size: 12px;
        }

        .checkbox-column {
          width: 40px;
          padding: 16px 8px !important;
        }

        .checkbox-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-checkbox {
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .table-header {
          background: #f8fafc;
          border-bottom: 2px solid #e2e8f0;
        }

        .table-header th {
          padding: 16px 12px;
          font-weight: 600;
          color: #475569;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 2px solid #e2e8f0;
        }

        .sortable-header {
          cursor: pointer;
          transition: background-color 0.2s ease;
          user-select: none;
        }

        .sortable-header:hover {
          background: #f1f5f9;
        }

        .table-body {
          background: white;
        }

        .table-row {
          transition: background-color 0.2s ease;
          border-bottom: 1px solid #f1f5f9;
        }

        .table-row:hover {
          background: #f8fafc;
        }

        .table-cell {
          padding: 16px 12px;
          font-size: 14px;
          color: #475569;
          vertical-align: middle;
        }

        .text-center {
          text-align: center;
        }

        .loading-cell {
          text-align: center;
          padding: 40px !important;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .loading-text {
          color: #6c757d;
          font-size: 14px;
        }

        .no-data-cell {
          text-align: center;
          padding: 60px 20px !important;
        }

        .no-data-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: #6c757d;
        }

        .no-data-icon {
          font-size: 48px;
          color: #adb5bd;
        }

        .no-data-content p {
          margin: 0;
          font-size: 14px;
        }

        .actions-header {
          width: 200px;
        }

        .actions-cell {
          padding: 8px 12px !important;
        }

        .actions-container {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          align-items: center;
        }

        .btn-action {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 6px 10px;
          border: none;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          white-space: nowrap;
        }

        .btn-action.primary {
          background: #007bff;
          color: white;
        }

        .btn-action.primary:hover {
          background: #0056b3;
        }

        .btn-action.success {
          background: #28a745;
          color: white;
        }

        .btn-action.success:hover {
          background: #218838;
        }

        .btn-action.info {
          background: #17a2b8;
          color: white;
        }

        .btn-action.info:hover {
          background: #138496;
        }

        .btn-action.warning {
          background: #ffc107;
          color: #212529;
        }

        .btn-action.warning:hover {
          background: #e0a800;
        }

        .btn-action.danger {
          background: #dc3545;
          color: white;
        }

        .btn-action.danger:hover {
          background: #c82333;
        }

        .btn-action i {
          font-size: 10px;
        }

        /* Pagination Styles */
        .pagination-container {
          margin-top: 20px;
          display: flex;
          justify-content: center;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-container {
          background: white;
          border-radius: 8px;
          max-width: 400px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .modal-header {
          padding: 20px;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-title {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #495057;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-close {
          background: none;
          border: none;
          font-size: 18px;
          color: #6c757d;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .modal-close:hover {
          background-color: #f8f9fa;
        }

        .modal-content {
          padding: 20px;
        }

        .payment-details-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .detail-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
        }

        .detail-label {
          color: #6c757d;
          font-size: 14px;
          font-weight: 500;
        }

        .detail-value {
          color: #495057;
          font-size: 14px;
          font-weight: 500;
        }

        .detail-value.amount {
          font-size: 18px;
          font-weight: 700;
          color: #28a745;
        }

        .modal-actions {
          padding: 20px;
          border-top: 1px solid #e9ecef;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .actions-container {
            flex-direction: column;
            align-items: stretch;
          }
          
          .btn-action {
            justify-content: center;
            padding: 8px 12px;
          }
          
          .modal-container {
            margin: 10px;
            max-width: calc(100vw - 20px);
          }
          
          .detail-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }
          
          .detail-value {
            text-align: left;
          }
        }


        .buttons-container {
        display: flex;
        gap: 6px;
        align-items: center;
        }
      `}</style>
    </div>
  );
}

export default UserTable;