import * as yup from 'yup';
import { customerValidationSchema } from 'validationSchema/customers';
import { restaurantValidationSchema } from 'validationSchema/restaurants';
import { staffValidationSchema } from 'validationSchema/staff';

export const userValidationSchema = yup.object().shape({
  roq_user_id: yup.string().required(),
  tenant_id: yup.string().required(),
  customer: yup.array().of(customerValidationSchema),
  restaurant: yup.array().of(restaurantValidationSchema),
  staff: yup.array().of(staffValidationSchema),
});
