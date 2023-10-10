export default [
  {
    field: 'Profession',
    validations: ['required'],
    name: 'Profession',
  },
  {
    field: 'Role',
    validations: ['required'],
    name: 'Role',
  },
  {
    field: 'Experience',
    validations: ['required'],
    name: 'Experience',
  },
  {
    field: 'licence',
    validations: ['required', 'alphanumeric'],
    name: 'Licence',
  },
  {
    field: 'Specialities',
    validations: ['required'],
    name: 'Specialities',
  },
];
