import { OrderItemInterface } from 'interfaces/order-item';
import { RestaurantInterface } from 'interfaces/restaurant';

export interface MenuInterface {
  id?: string;
  restaurant_id: string;
  dish_name: string;
  price: number;
  availability: boolean;
  order_item?: OrderItemInterface[];
  restaurant?: RestaurantInterface;
  _count?: {
    order_item?: number;
  };
}
