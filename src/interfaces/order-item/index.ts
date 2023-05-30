import { OrderInterface } from 'interfaces/order';
import { MenuInterface } from 'interfaces/menu';

export interface OrderItemInterface {
  id?: string;
  order_id: string;
  menu_id: string;
  quantity: number;

  order?: OrderInterface;
  menu?: MenuInterface;
  _count?: {};
}
