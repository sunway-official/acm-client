import { required } from '~/Lib/validate';
import { DatePicker, FilterModal } from '~/Component';
import Gender from './Gender';

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
      component: Gender,
      validate: [required],
      props: {
        placeholder: 'Gender',
      },
    },
  },
  bio: {
    title: 'Biography',
    field: {
      name: 'bio',
      props: {
        placeholder: 'Biography',
        multiline: true,
        numberOfLines: 10,
      },
    },
  },
  dob: {
    title: 'Birthday',
    field: {
      name: 'dob',
      component: DatePicker,
      props: {
        placeholder: 'Birthday',
      },
    },
  },
};

export default inputForms;
