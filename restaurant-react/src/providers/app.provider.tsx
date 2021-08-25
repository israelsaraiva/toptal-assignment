import { Meal } from 'models/meal.model';
import { OrderItem } from 'models/order-item.model';
import { SnackbarProps, useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';

interface SnackData {
  variant: 'success' | 'error' | 'info' | 'warning';
  problem?: 'NETWORK_ERROR';
  message?: string;
}

interface IOrderContext {
  addMealToCart: (restaurantId: number, meal: Meal) => void;
  changeOrderItemUnit: (mealId: number, action: 'sum' | 'subtract') => void;
  showSnackbar(snackData: SnackData): void;
  clearCart(): void;
}

interface IMenuContext {
  toggleMenu(option?: boolean): void;
  menuOpen: boolean;
}

interface IAppContext extends IOrderContext, IMenuContext {
  orderItems: OrderItem[];
  orderRestaurantId: number;
}

const AppContext = React.createContext<Partial<IAppContext>>({});

export function useAppContext() {
  return useContext(AppContext);
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: AuthProviderProps) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const orderLSKey = 'user-order';

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderRestaurantId, setOrderRestaurantId] = useState<number>();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const orderLSData = localStorage.getItem(orderLSKey);

    if (orderLSData) {
      const { restaurantId, items } = JSON.parse(orderLSData);

      setOrderRestaurantId(restaurantId);
      setOrderItems(items || []);
    }
  }, []);

  function updateActiveOrder() {
    const data = {
      items: orderItems,
      restaurantId: orderRestaurantId
    };

    localStorage.setItem(orderLSKey, JSON.stringify(data));
    setOrderItems([...orderItems]);
  }

  function addMealToCart(restaurantId: number, meal: Meal) {
    setOrderRestaurantId(restaurantId);

    const usingSameRestaurant = orderRestaurantId === restaurantId;

    if (orderItems.length === 0 || usingSameRestaurant) {
      orderItems.push({ id: orderItems.length + 1, meal, amount: 1 });
      updateActiveOrder();
    } else {
      showSnackbar({
        variant: 'warning',
        message: 'It is not allowed to add two meals from different restaurants'
      });
    }
  }

  function changeOrderItemUnit(mealId: number, action: 'sum' | 'subtract') {
    const itemIndex = orderItems.findIndex((item) => item.meal.id === mealId);

    if (orderItems[itemIndex]) {
      if (action === 'sum') {
        orderItems[itemIndex].amount += 1;
      } else if (orderItems[itemIndex].amount === 1) {
        orderItems.splice(itemIndex, 1);
      } else {
        orderItems[itemIndex].amount -= 1;
      }

      updateActiveOrder();
    }
  }

  function clearCart() {
    setOrderItems([]);
    setOrderRestaurantId(undefined);
    localStorage.setItem(orderLSKey, JSON.stringify({}));
  }

  function showSnackbar(snackData: SnackData) {
    const { variant, problem, message } = snackData;

    if (enqueueSnackbar) {
      const showSnackbar = (msg?: string) => {
        const sb: any = enqueueSnackbar(msg, {
          open: true,
          variant,
          anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
          onClick: () => closeSnackbar && closeSnackbar(sb)
        } as SnackbarProps);
      };

      switch (problem) {
        case 'NETWORK_ERROR':
          showSnackbar('Network Error!');
          break;

        default:
          if (!message && variant === 'error') {
            showSnackbar('Sorry! The action could not be executed.');
            return;
          }

          showSnackbar(message);
          break;
      }
    }
  }

  function toggleMenu(option?: boolean) {
    if (option !== undefined) {
      setMenuOpen(option);
    } else {
      setMenuOpen(!menuOpen);
    }
  }

  const value = {
    orderItems,
    orderRestaurantId,
    addMealToCart,
    changeOrderItemUnit,
    showSnackbar,
    clearCart,
    toggleMenu,
    menuOpen
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
