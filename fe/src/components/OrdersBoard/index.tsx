import { useState } from "react";
import { toast } from "react-toastify";
import { OrderModal } from "../../OrderModal";
import { Order } from "../../types/Order";
import { api } from "../../utils/api";
import { Board, OrderContainer } from "./styles";

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder(orderId: string): void
}

export function OrdersBoard({icon, title, orders, onCancelOrder}: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleCancelOrder() {
    setIsLoading(true);

    console.log('wait 3 seconds');
    // await new Promise(resolve => setTimeout(resolve, 3000));
    await api.delete(`/orders/${selectedOrder?._id}`);

    console.log('Deleted');

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado.`);
    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }


  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrderContainer>
        {orders.map((order) => (
          <button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
          <strong>Mesa {order.table}</strong>
          <span>{order.products.length} itens</span>
        </button>
        ))}
      </OrderContainer>
      ) }

    </Board>
  );
}
