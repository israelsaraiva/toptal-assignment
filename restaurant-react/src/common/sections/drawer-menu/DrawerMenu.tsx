import './DrawerMenu.scss';

import { Drawer } from '@material-ui/core';
import AppPagesEnum from 'pages/pages.enum';
import { useAppContext } from 'providers/app.provider';
import { Role, useAuth } from 'providers/auth.provider';
import React, { useEffect, useState } from 'react';
import { BsHouse } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

export default function DrawerMenu() {
  const { push } = useHistory();
  const { menuOpen, toggleMenu } = useAppContext();
  const { currentUser } = useAuth();

  const menuOptions = [
    {
      id: 0,
      label: 'My Account',
      icon: <FiUser className="menu-icon" />,
      onClick: () => {}
    }
  ];

  const [options, setOptions] = useState(menuOptions);

  useEffect(() => {
    const isRestaurantOwner = currentUser?.roles.includes(Role.RestaurantOwner);

    if (isRestaurantOwner) {
      options.push({
        id: 1,
        label: 'Restaurant Orders',
        onClick: () => navigateTo(AppPagesEnum.OrderList),
        icon: <HiOutlineDocumentDuplicate className="menu-icon" />
      });

      options.push({
        id: 2,
        label: 'My Restaurant',
        onClick: () => navigateTo(AppPagesEnum.MyRestaurant),
        icon: <BsHouse className="menu-icon" />
      });
    } else {
      options.push({
        id: 1,
        label: 'Restaurants',
        onClick: () => navigateTo(AppPagesEnum.Restaurants),
        icon: <IoFastFoodOutline className="menu-icon" />
      });

      options.push({
        id: 2,
        label: 'My Orders',
        onClick: () => navigateTo(AppPagesEnum.OrderList),
        icon: <HiOutlineDocumentDuplicate className="menu-icon" />
      });
    }

    setOptions([...options]);
  }, [currentUser]);

  function navigateTo(page: AppPagesEnum) {
    toggleMenu?.(false);
    push(page);
  }

  return (
    <Drawer anchor="left" open={menuOpen} onClose={() => toggleMenu?.(false)}>
      <div className="DrawerMenu">
        <ul>
          {options.map((option) => (
            <li key={option.id}>
              <button type="button" onClick={() => option.onClick?.()}>
                {option.icon} <div>{option.label}</div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Drawer>
  );
}
