import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "./CartContext";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  address: string;
  paymentMethod: string;
  createdAt: string;
  status: string;
};

type OrderContextValue = {
  orders: Order[];
  placeOrder: (
    items: CartItem[],
    total: number,
    address: string,
    paymentMethod: string,
  ) => Order;
};

const OrderContext = createContext<OrderContextValue>({
  orders: [],
  placeOrder: () => ({}) as Order,
});

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const placeOrder = (
    items: CartItem[],
    total: number,
    address: string,
    paymentMethod: string,
  ): Order => {
    const order: Order = {
      id: Date.now().toString(),
      items: [...items],
      total,
      address,
      paymentMethod,
      createdAt: new Date().toLocaleString("pt-BR"),
      status: "Em preparo",
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
