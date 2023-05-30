import { useState } from 'react';
import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getCustomers, deleteCustomerById } from 'apiSdk/customers';
import { CustomerInterface } from 'interfaces/customer';
import { Error } from 'components/error';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';

function CustomerListPage() {
  const { data, error, isLoading, mutate } = useSWR<CustomerInterface[]>(
    () => '/customers',
    () =>
      getCustomers({
        relations: ['user', 'order.count', 'review.count'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteCustomerById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Customer
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Link href={`/customers/create`}>
          <Button colorScheme="blue" mr="4">
            Create
          </Button>
        </Link>
        {error && <Error error={error} />}
        {deleteError && <Error error={deleteError} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Customer ID</Th>
                  <Th>User ID</Th>
                  <Th>Total Orders</Th>
                  <Th>Total Reviews</Th>
                  <Th>Edit</Th>
                  <Th>View</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.id}</Td>
                    <Td>
                      <Link href={`/users/view/${record.user?.id}`}>{record.user?.roq_user_id}</Link>
                    </Td>
                    <Td>{record?._count?.order}</Td>
                    <Td>{record?._count?.review}</Td>
                    <Td>
                      <Link href={`/customers/edit/${record.id}`} passHref legacyBehavior>
                        <Button as="a">Edit</Button>
                      </Link>
                    </Td>
                    <Td>
                      <Link href={`/customers/view/${record.id}`} passHref legacyBehavior>
                        <Button as="a">View</Button>
                      </Link>
                    </Td>
                    <Td>
                      <Button onClick={() => handleDelete(record.id)}>Delete</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'customer',
  operation: AccessOperationEnum.READ,
})(CustomerListPage);
