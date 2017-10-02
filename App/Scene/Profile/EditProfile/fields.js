import { required } from '~/Lib/validate';

const inputForms = {
  firstname: {
    title: 'Firstname',
    field: {
      name: 'firstname',
      validate: [required],
      props: {
        placeholder: 'Firstname',
      },
    },
  },
  lastname: {
    title: 'Lastname',
    field: {
      name: 'lastname',
      validate: [required],
      props: {
        placeholder: 'Lastname',
      },
    },
  },
  gender: {
    title: 'Gender',
    field: {
      name: 'gender',
      validate: [required],
      props: {
        placeholder: 'Gender',
      },
    },
  },
};

export default inputForms;
