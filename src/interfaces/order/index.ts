import { OrderItemInterface } from 'interfaces/order-item';
import { CustomerInterface } from 'interfaces/customer';
import { RestaurantInterface } from 'interfaces/restaurant';
import { StaffInterface } from 'interfaces/staff';

export interface OrderInterface {
  id?: string;
  customer_id: string;
  restaurant_id: string;
  waiter_id: string;
  status: string;
  order_type: string;
  total_price: number;
  order_item?: OrderItemInterface[];
  customer?: CustomerInterface;
  restaurant?: RestaurantInterface;
  staff?: StaffInterface;
  _count?: {
    order_item?: number;
  };
}
