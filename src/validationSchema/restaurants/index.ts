import * as yup from 'yup';
import { menuValidationSchema } from 'validationSchema/menus';
import { orderValidationSchema } from 'validationSchema/orders';
import { reviewValidationSchema } from 'validationSchema/reviews';
import { staffValidationSchema } from 'validationSchema/staff';

export const restaurantValidationSchema = yup.object().shape({
  name: yup.string().required(),
  owner_id: yup.string().nullable().required(),
  menu: yup.array().of(menuValidationSchema),
  order: yup.array().of(orderValidationSchema),
  review: yup.array().of(reviewValidationSchema),
  staff: yup.array().of(staffValidationSchema),
});
