import './App.scss';

import DrawerMenu from 'common/sections/drawer-menu/DrawerMenu';
import React, { useMemo } from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { Role, useAuth } from 'providers/auth.provider';
import Sidebar from './common/sections/sidebar/Sidebar';
import TopBar from './common/sections/topBar/TopBar';
import AppPagesEnum from './pages/pages.enum';
import AppRoutes from './routes/app.routes';

function App() {
  const { currentUser } = useAuth();

  const defaultUrl = useMemo(() => {
    return currentUser?.roles?.includes(Role.RestaurantOwner)
      ? AppPagesEnum.OrderList
      : AppPagesEnum.Restaurants;
  }, [currentUser]);

  return (
    <div className="App">
      <div className="App-page-content">
        <DrawerMenu />

        <TopBar />

        <div className="App-page-content-body">
          <Switch>
            {AppRoutes()}
            <Redirect path="*" to={defaultUrl} />
          </Switch>
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
