import { OrderInterface } from 'interfaces/order';
import { ReviewInterface } from 'interfaces/review';
import { UserInterface } from 'interfaces/user';

export interface CustomerInterface {
  id?: string;
  user_id: string;
  order?: OrderInterface[];
  review?: ReviewInterface[];
  user?: UserInterface;
  _count?: {
    order?: number;
    review?: number;
  };
}
