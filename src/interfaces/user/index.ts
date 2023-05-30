import { CustomerInterface } from 'interfaces/customer';
import { RestaurantInterface } from 'interfaces/restaurant';
import { StaffInterface } from 'interfaces/staff';

export interface UserInterface {
  id?: string;
  roq_user_id: string;
  tenant_id: string;
  customer?: CustomerInterface[];
  restaurant?: RestaurantInterface[];
  staff?: StaffInterface[];

  _count?: {
    customer?: number;
    restaurant?: number;
    staff?: number;
  };
}
