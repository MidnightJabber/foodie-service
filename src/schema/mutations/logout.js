import UserType from '../types/user';
import { logout as AuthServiceLogout } from 'services/auth';

const logout = {
  type: UserType,
  resolve(parentValue, args, req) {
    return AuthServiceLogout({ req });
  }
};

export default logout;
