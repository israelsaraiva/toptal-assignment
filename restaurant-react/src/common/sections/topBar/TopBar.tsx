import './TopBar.scss';

import GenericForm from 'common/GenericForm';
import AppPagesEnum from 'pages/pages.enum';
import { useAppContext } from 'providers/app.provider';
import { Role, useAuth } from 'providers/auth.provider';
import React, { useMemo } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';

import Input from '../../input/Input';

export default function TopBar() {
  const { pathname } = useLocation();
  const { toggleMenu } = useAppContext();
  const { currentUser } = useAuth();

  const isRestaurantOwner = useMemo(
    () => currentUser?.roles.includes(Role.RestaurantOwner),
    [currentUser]
  );

  const pageTitle = useMemo(() => {
    switch (pathname) {
      case AppPagesEnum.Restaurants:
        return 'Restaurants';

      case AppPagesEnum.OrderList:
        return isRestaurantOwner ? 'Restaurant Orders' : 'My Orders';

      case AppPagesEnum.RestaurantMeals:
        return 'Meals';

      case AppPagesEnum.OrderPlaced:
        return 'Order Placed';

      case AppPagesEnum.Order:
        return 'Order Summary';

      case AppPagesEnum.MyRestaurant:
        return 'My Restaurant';

      default:
        return '';
    }
  }, [pathname]);

  return (
    <header className="TopBar">
      <div className="TopBar-left-section">
        <div
          role="button"
          tabIndex={0}
          className="TopBar-left-section-button"
          onClick={() => toggleMenu?.()}
          onKeyDown={() => toggleMenu?.()}>
          <FiMenu />
        </div>

        <h4>{pageTitle}</h4>
      </div>

      <GenericForm onValidate={() => {}}>
        <Input name="search" placeholder="Search" inputType="search" />
      </GenericForm>
    </header>
  );
}
