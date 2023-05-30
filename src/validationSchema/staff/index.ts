import * as yup from 'yup';
import { orderValidationSchema } from 'validationSchema/orders';

export const staffValidationSchema = yup.object().shape({
  role: yup.string().required(),
  user_id: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
  order: yup.array().of(orderValidationSchema),
});
