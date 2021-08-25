import AppPagesEnum from 'pages/pages.enum';
import { configRoutes, RouteConfig } from 'routes/config.routes';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const routes: RouteConfig[] = [
  { path: AppPagesEnum.Login, component: LoginPage },
  { path: AppPagesEnum.Register, component: RegisterPage }
];

const AccessRoutes = () => configRoutes(routes);

export default AccessRoutes;
