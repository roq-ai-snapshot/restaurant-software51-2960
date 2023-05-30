import { CustomerInterface } from 'interfaces/customer';
import { RestaurantInterface } from 'interfaces/restaurant';

export interface ReviewInterface {
  id?: string;
  customer_id: string;
  restaurant_id: string;
  rating: number;
  comment?: string;

  customer?: CustomerInterface;
  restaurant?: RestaurantInterface;
  _count?: {};
}
