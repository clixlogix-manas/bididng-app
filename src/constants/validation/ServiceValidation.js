export default [
  {
    field: 'Category',
    validations: ['required'],
    name: 'Service category',
  },
  {
    field: 'Duration',
    validations: ['required'],
    name: 'Service duration',
  },
  {
    field: 'service',
    validations: ['required'],
    name: 'Service name',
  },
  {
    field: 'description',
    validations: ['required'],
    name: 'Description',
  },
  {
    field: 'price',
    validations: ['required', 'numeric'],
    name: 'Service price',
  },
];
