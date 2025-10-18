import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import WithdrawService from '../../services/withdrawService';

export default async (req, res, next) => {
  try {


    const withdrawStatus = req.body.data.status;
    const withdrawId = req.body.data.id;

    const payload = await new WithdrawService(req).updateTransactionStatus(withdrawId, withdrawStatus, req,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
