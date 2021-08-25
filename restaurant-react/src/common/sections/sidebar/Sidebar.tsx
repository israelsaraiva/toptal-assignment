import './Sidebar.scss';

import { Role, useAuth } from 'providers/auth.provider';
import React, { useMemo } from 'react';

import OrderItems from './components/order-items/OrderItems';
import RestaurantClients from './components/restaurant-clients/RestaurantClients';

export default function Sidebar() {
  const { signOut, currentUser } = useAuth();

  const isRestaurantOwner = useMemo(
    () => currentUser?.roles.includes(Role.RestaurantOwner),
    [currentUser]
  );

  return (
    <aside className="Sidebar">
      <div className="Sidebar-top-bar">
        <div className="user-section">
          <div className="user-section-picture" />
          <div>
            <div className="user-section-name">{currentUser?.name}</div>
            <div
              tabIndex={0}
              className="user-section-sign-out"
              role="button"
              onClick={() => signOut?.()}
              onKeyDown={() => signOut?.()}>
              Sign out
            </div>
          </div>
        </div>
      </div>

      {!isRestaurantOwner && <OrderItems />}

      {isRestaurantOwner && <RestaurantClients />}
    </aside>
  );
}
