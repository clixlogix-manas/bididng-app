export default [
  {
    field: 'cardNo',
    validations: ['required', 'accdigit'],
    name: 'Card number',
  },
  {
    field: 'holderName',
    validations: ['required'],
    name: 'Holder Name',
  },
  {
    field: 'expiryMonth',
    validations: ['Expiry'],
    name: 'Expiry month / year',
  },
  {
    field: 'expiryYear',
    validations: ['Expiry'],
    name: 'Expiry month / year',
  },
  {
    field: 'cvv',
    validations: ['required'],
    name: 'CVV',
  },
];
