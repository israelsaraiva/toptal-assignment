import './OrderListPage.scss';

import { Order, OrderStatus } from 'models/order.model';
import AppPagesEnum from 'pages/pages.enum';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useOrderService from 'services/order.service';

export default function OrderListPage() {
  const orderService = useOrderService();
  const { push } = useHistory();

  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    orderService.all().then((res) => {
      setOrders(res.data);
    });
  }, []);

  const tabs = [
    { status: 'active', label: 'Active Orders' },
    { status: 'completed', label: 'Completed Orders' },
    { status: 'canceled', label: 'Canceled Orders' }
  ];

  const tabsContainer = useMemo(() => {
    return tabs.map((tab, index) => (
      <li key={tab.status} className="nav-item">
        <div
          role="button"
          tabIndex={index}
          className={`nav-link ${tab.status === activeTab ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.status)}
          onKeyDown={() => setActiveTab(tab.status)}>
          {tab.label}
        </div>
      </li>
    ));
  }, [activeTab]);

  const ordersFiltered = useMemo(() => {
    switch (activeTab) {
      case 'canceled':
        return orders.filter((order) => order.status === OrderStatus.Canceled);

      case 'completed':
        return orders.filter((order) =>
          [OrderStatus.Delivered, OrderStatus.Received].includes(order.status)
        );

      default:
        return orders.filter((order) =>
          [OrderStatus.Placed, OrderStatus.Processing, OrderStatus.InRoute].includes(order.status)
        );
    }
  }, [activeTab, orders]);

  function viewOrder(order: Order) {
    push({ pathname: AppPagesEnum.Order, state: { order } });
  }

  const tableContainer = useMemo(() => {
    return (
      <table>
        <thead>
          <tr>
            <th>Order Id #</th>
            <th>Restaurant</th>
            <th>Total Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {ordersFiltered?.map((order) => (
            <tr key={order.id} onClick={() => viewOrder(order)}>
              <td>#{order.id}</td>
              <td>{order.restaurant?.name}</td>
              <td>${order.totalAmount}</td>
              <td>
                <span className="badge bg-primary">{order.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }, [ordersFiltered]);

  return (
    <div className="OrderListPage">
      <ul className="nav nav-tabs">{tabsContainer}</ul>
      <div className="OrderListPage-table">{tableContainer}</div>
      {!ordersFiltered.length && <p>No orders found!</p>}
    </div>
  );
}
