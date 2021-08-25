import { User } from 'models/user.model';

import useHttpService from './http.service';

export default function useUserService() {
  const url = 'user';

  const genericFunctions = useHttpService<User>(url);

  return { ...genericFunctions };
}
