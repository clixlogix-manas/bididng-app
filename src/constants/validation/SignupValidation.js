export default [
  {
    field: 'firstName',
    validations: ['required', 'alpha'],
    name: 'First name',
  },
  {
    field: 'lastName',
    validations: ['required'],
    name: 'Last name',
  },
  {
    field: 'email',
    validations: ['required', 'email'],
    name: 'Email',
  },
  {
    field: 'password',
    validations: ['required', 'password'],
    name: 'Password',
  },
  {
    field: 'mobile',
    validations: ['required', 'numeric'],
    name: 'Mobile number',
  },
];
