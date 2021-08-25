import { User } from 'components/user/user.entity';

export interface IAuthInfoRequest extends Request {
  user: User;
}
