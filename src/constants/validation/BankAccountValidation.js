export default [
  {
    field: 'email',
    validations: ['required', 'email'],
    name: 'Email',
  },
  {
    field: 'firstName',
    validations: ['required'],
    name: 'First Name',
  },
  {
    field: 'lastName',
    validations: ['required'],
    name: 'Last Name',
  },
  {
    field: 'ssn',
    validations: ['required'],
    name: 'SSN (Social Security Number)',
  },
  {
    field: 'idNumber',
    validations: ['required'],
    name: 'Goverment Issued Id',
  },
  {
    field: 'phoneNumber',
    validations: ['required', 'digit'],
    name: 'Phone Number',
  },
  {
    field: 'zip',
    validations: ['required'],
    name: 'ZIP ',
  },
  {
    field: 'routing',
    validations: ['required'],
    name: 'Routing Number',
  },
  {
    field: 'account',
    validations: ['required'],
    name: 'Bank Account Number',
  },
  {
    field: 'City',
    validations: ['required'],
    name: 'City',
  },
  {
    field: 'State',
    validations: ['required'],
    name: 'State',
  },
  {
    field: 'Country',
    validations: ['required'],
    name: 'Country',
  },
  {
    field: 'zip',
    validations: ['required'],
    name: 'Zip',
  },
  {
    field: 'address',
    validations: ['required'],
    name: 'Address',
  },
  {
    field: 'birthDate',
    validations: ['required'],
    name: 'Date of Birth',
  },
];
