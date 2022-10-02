import React from 'react';

import { initStripe } from '@stripe/stripe-react-native';

import Providers from '@/Providers';
import Routing from '@/Routing';

initStripe({
  publishableKey: 'publishable key',
  merchantIdentifier: 'your merchant identifier from Apple',
});

const App = () => {
  return (
    <Providers>
      <Routing />
    </Providers>
  );
};

export default App;
