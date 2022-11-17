import { Order } from "../../types/Order";
import { Container } from "../Orders/styles";
import { OrdersBoard } from "../OrdersBoard";


const orders: Order[] = [
  {
    "_id": "6372feba71c30f6e27b84ace",
		"table": "123",
		"status": "IN_PRODUCTION",
		"products": [
			{
				"product": {
					"name": "Pizza quatro queijos",
					"imagePath": "1668479338211-quatro-queijos.png",
					"price": 40
				},
				"quantity": 3,
				"_id": "6372feba71c30f6e27b84acf"
			},
			{
				"product": {
					"name": "Coca cola",
					"imagePath": "1668479943598-coca-cola.png",
					"price": 7,
				},
				"quantity": 2,
				"_id": "6372feba71c30f6e27b84ad0"
			}
		]
	}
]



export function Orders() {
  return (
    <Container>
      <OrdersBoard
        icon="🕑"
        title="Fila de espera"
        orders={orders}
      />
      <OrdersBoard
        icon="🍕"
        title="Em preparação"
        orders={[]}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto"
        orders={[]}
      />
    </Container>
  );
}
