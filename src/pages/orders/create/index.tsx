import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createOrder } from 'apiSdk/orders';
import { Error } from 'components/error';
import { orderValidationSchema } from 'validationSchema/orders';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { CustomerInterface } from 'interfaces/customer';
import { RestaurantInterface } from 'interfaces/restaurant';
import { StaffInterface } from 'interfaces/staff';
import { getMenus } from 'apiSdk/menus';
import { MenuInterface } from 'interfaces/menu';
import { getCustomers } from 'apiSdk/customers';
import { getRestaurants } from 'apiSdk/restaurants';
import { getStaff } from 'apiSdk/staff';
import { OrderInterface } from 'interfaces/order';

function OrderCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: OrderInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createOrder(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<OrderInterface>({
    initialValues: {
      status: '',
      order_type: '',
      total_price: 0,
      customer_id: (router.query.customer_id as string) ?? null,
      restaurant_id: (router.query.restaurant_id as string) ?? null,
      waiter_id: (router.query.waiter_id as string) ?? null,
      order_item: [],
    },
    validationSchema: orderValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Order
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
          </FormControl>
          <FormControl id="order_type" mb="4" isInvalid={!!formik.errors?.order_type}>
            <FormLabel>Order Type</FormLabel>
            <Input type="text" name="order_type" value={formik.values?.order_type} onChange={formik.handleChange} />
            {formik.errors.order_type && <FormErrorMessage>{formik.errors?.order_type}</FormErrorMessage>}
          </FormControl>
          <FormControl id="total_price" mb="4" isInvalid={!!formik.errors?.total_price}>
            <FormLabel>Total Price</FormLabel>
            <NumberInput
              name="total_price"
              value={formik.values?.total_price}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('total_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.total_price && <FormErrorMessage>{formik.errors?.total_price}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<CustomerInterface>
            formik={formik}
            name={'customer_id'}
            label={'Customer'}
            placeholder={'Select Customer'}
            fetcher={getCustomers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record.user_id}
              </option>
            )}
          />
          <AsyncSelect<RestaurantInterface>
            formik={formik}
            name={'restaurant_id'}
            label={'Restaurant'}
            placeholder={'Select Restaurant'}
            fetcher={getRestaurants}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record.name}
              </option>
            )}
          />
          <AsyncSelect<StaffInterface>
            formik={formik}
            name={'waiter_id'}
            label={'Waiter'}
            placeholder={'Select Staff'}
            fetcher={getStaff}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record.user_id}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'order',
  operation: AccessOperationEnum.CREATE,
})(OrderCreatePage);
