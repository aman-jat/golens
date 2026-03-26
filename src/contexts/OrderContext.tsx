import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem } from './CartContext';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
  estimatedDelivery: string;
  address: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (items: CartItem[], total: number, address?: string) => Order;
}

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = localStorage.getItem('golens_orders');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('golens_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (items: CartItem[], total: number, address = '123 Main Street, New York, NY 10001'): Order => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items,
      total,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      address,
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within OrderProvider');
  return ctx;
}
