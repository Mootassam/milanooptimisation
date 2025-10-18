import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import DepositService from '../../services/depositService';

export default async (req, res, next) => {
  try {


    const depositStatus = req.body.data.status;
    const depositId = req.body.data.id;

    const payload = await new DepositService(req).updateTransactionStatus(depositId, depositStatus, req,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
