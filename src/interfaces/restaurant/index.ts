import { MenuInterface } from 'interfaces/menu';
import { OrderInterface } from 'interfaces/order';
import { ReviewInterface } from 'interfaces/review';
import { StaffInterface } from 'interfaces/staff';
import { UserInterface } from 'interfaces/user';

export interface RestaurantInterface {
  id?: string;
  name: string;
  owner_id: string;
  menu?: MenuInterface[];
  order?: OrderInterface[];
  review?: ReviewInterface[];
  staff?: StaffInterface[];
  user?: UserInterface;
  _count?: {
    menu?: number;
    order?: number;
    review?: number;
    staff?: number;
  };
}
