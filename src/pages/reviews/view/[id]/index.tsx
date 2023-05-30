import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';
import { getReviewById } from 'apiSdk/reviews';
import { Error } from 'components/error';
import { ReviewInterface } from 'interfaces/review';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';

function ReviewViewPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ReviewInterface>(
    () => (id ? `/reviews/${id}` : null),
    () =>
      getReviewById(id, {
        relations: ['customer', 'restaurant'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Review Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="md" fontWeight="bold">
              Rating: {data?.rating}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Comment: {data?.comment}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Customer: <Link href={`/customers/view/${data?.customer?.id}`}>{data?.customer?.user_id}</Link>
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Restaurant: <Link href={`/restaurants/view/${data?.restaurant?.id}`}>{data?.restaurant?.name}</Link>
            </Text>
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'review',
  operation: AccessOperationEnum.READ,
})(ReviewViewPage);
