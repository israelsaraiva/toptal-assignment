import './RestaurantClients.scss';

import { User } from 'models/user.model';
import { useAppContext } from 'providers/app.provider';
import React, { useCallback, useEffect, useState } from 'react';
import { BsFillLockFill, BsFillUnlockFill } from 'react-icons/bs';
import useOrderService from 'services/order.service';
import useRestaurantService from 'services/restaurant.service';

export default function RestaurantClients() {
  const { showSnackbar } = useAppContext();

  const orderService = useOrderService();
  const restaurantService = useRestaurantService();

  const [clients, setClients] = useState<User[]>();
  const [blockedUsers, setBlockedUsers] = useState<number[]>([]);

  useEffect(() => {
    orderService.restaurantClients().then((res) => {
      setClients(res.data);
    });

    loadRestaurant();
  }, []);

  function loadRestaurant() {
    restaurantService.onByUser().then((res) => {
      setBlockedUsers(JSON.parse(res.data.blockUsers));
    });
  }

  const userBlocked = useCallback(
    (client: User) => {
      return blockedUsers.includes(client.id);
    },
    [blockedUsers]
  );

  function toggleBlockUser(user: User) {
    restaurantService.toggleBlockUser(user).then(() => {
      showSnackbar?.({ variant: 'success', message: 'The action was executed successfully!' });
      loadRestaurant();
    });
  }

  return (
    <div className="RestaurantClients">
      <h5>Restaurant Clients</h5>

      {!clients?.length && <div>No one found.</div>}

      {clients?.map((client) => (
        <div key={client.id} className="RestaurantClients-client-block">
          <div>{client.name}</div>
          <button
            type="button"
            className="btn"
            title="Lock client"
            onClick={() => toggleBlockUser(client)}>
            {!userBlocked(client) && <BsFillUnlockFill color="blue" />}
            {userBlocked(client) && <BsFillLockFill color="red" />}
          </button>
        </div>
      ))}
    </div>
  );
}
