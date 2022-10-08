import React from 'react';

import { useApplePay } from '@stripe/stripe-react-native';
import { Button } from 'native-base';

export const PaymentButton = ({ movieName }) => {
  const { presentApplePay } = useApplePay();

  const handlePayment = async () => {
    await presentApplePay({
      cartItems: [
        {
          label: `Place pour ${movieName}`,
          amount: '7',
          paymentType: 'Immediate',
        },
      ],
      country: 'FR',
      currency: 'EUR',
    });
  };

  return (
    <Button my={2} onPress={handlePayment}>
      Réserver
    </Button>
  );
};
