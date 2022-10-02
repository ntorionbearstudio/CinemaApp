import React from 'react';

import { Box, NativeBaseProvider } from 'native-base';
import { QueryClient, QueryClientProvider } from 'react-query';

import { theme } from '@/theme';

const queryClient = new QueryClient();

const Providers = ({ children }) => {
  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Box bg="black" flex={1}>
          {children}
        </Box>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
};

export default Providers;
