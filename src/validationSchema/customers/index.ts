import * as yup from 'yup';
import { orderValidationSchema } from 'validationSchema/orders';
import { reviewValidationSchema } from 'validationSchema/reviews';

export const customerValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  order: yup.array().of(orderValidationSchema),
  review: yup.array().of(reviewValidationSchema),
});
