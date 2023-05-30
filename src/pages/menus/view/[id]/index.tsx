import AppLayout from 'layout/app-layout';
import Link from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button } from '@chakra-ui/react';
import { getMenuById } from 'apiSdk/menus';
import { Error } from 'components/error';
import { MenuInterface } from 'interfaces/menu';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';

function MenuViewPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<MenuInterface>(
    () => (id ? `/menus/${id}` : null),
    () =>
      getMenuById(id, {
        relations: ['restaurant'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Menu Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="md" fontWeight="bold">
              Dish Name: {data?.dish_name}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Price: {data?.price}
            </Text>
            <Text fontSize="md" fontWeight="bold">
              Availability: {data?.availability}
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
  entity: 'menu',
  operation: AccessOperationEnum.READ,
})(MenuViewPage);
