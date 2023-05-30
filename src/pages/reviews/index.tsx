import { useState } from 'react';
import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getReviews, deleteReviewById } from 'apiSdk/reviews';
import { ReviewInterface } from 'interfaces/review';
import { Error } from 'components/error';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';

function ReviewListPage() {
  const { data, error, isLoading, mutate } = useSWR<ReviewInterface[]>(
    () => '/reviews',
    () =>
      getReviews({
        relations: ['customer', 'restaurant'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteReviewById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Review
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Link href={`/reviews/create`}>
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
                  <Th>Rating</Th>
                  <Th>Comment</Th>
                  <Th>Customer</Th>
                  <Th>Restaurant</Th>

                  <Th>Edit</Th>
                  <Th>View</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.rating}</Td>
                    <Td>{record.comment}</Td>
                    <Td>
                      <Link href={`/customers/view/${record.customer?.id}`}>{record.customer?.user_id}</Link>
                    </Td>
                    <Td>
                      <Link href={`/restaurants/view/${record.restaurant?.id}`}>{record.restaurant?.name}</Link>
                    </Td>

                    <Td>
                      <Link href={`/reviews/edit/${record.id}`} passHref legacyBehavior>
                        <Button as="a">Edit</Button>
                      </Link>
                    </Td>
                    <Td>
                      <Link href={`/reviews/view/${record.id}`} passHref legacyBehavior>
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
  entity: 'review',
  operation: AccessOperationEnum.READ,
})(ReviewListPage);
