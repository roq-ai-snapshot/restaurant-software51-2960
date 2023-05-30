import * as yup from 'yup';
import { orderItemValidationSchema } from 'validationSchema/order-items';

export const menuValidationSchema = yup.object().shape({
  dish_name: yup.string().required(),
  price: yup.number().integer().required(),
  availability: yup.boolean().required(),
  restaurant_id: yup.string().nullable().required(),
  order_item: yup.array().of(orderItemValidationSchema),
});
