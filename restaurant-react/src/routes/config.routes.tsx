import React from 'react';
import { Route } from 'react-router-dom';

import AppPagesEnum from '../pages/pages.enum';

export interface RouteConfig {
  path: AppPagesEnum;
  component: any;
}

export function configRoutes(routes: Array<RouteConfig>, exact = true) {
  return routes.map((route) => <Route key={route.path} exact={exact} {...route} />);
}
