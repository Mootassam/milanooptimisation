import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import UserRepository from '../../database/repositories/userRepository';

export default async (req, res) => {
  try {
  // new PermissionChecker(req).validateHas(
  //     Permissions.values.categoryRead,
  //   );

    const userId = req.body.data;
   console.log(userId);
   
    
    const payload = await UserRepository.getUserReferralNetworkAllLevels
      (
        req,
        userId
      );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
