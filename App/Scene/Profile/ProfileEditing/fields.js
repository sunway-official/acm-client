import { required } from '~/Lib/validate';
import { DatePicker } from '~/Component';
import GenderForm from './Gender';

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
      component: GenderForm,
      props: {
        editable: false,
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
  bio: {
    title: 'Biography',
    field: {
      name: 'bio',
      props: {
        placeholder: 'Describe about yourself',
        multiline: true,
      },
    },
  },
  facebook_id: {
    title: 'Facebook',
    field: {
      name: 'facebook',
      props: {
        placeholder: 'Your facebook',
      },
    },
  },
  twitter_id: {
    title: 'Twitter',
    field: {
      name: 'twitter',
      props: {
        placeholder: 'Your twitter',
      },
    },
  },
  linked_id: {
    title: 'Linked',
    field: {
      name: 'linked',
      props: {
        placeholder: 'Your linked',
      },
    },
  },
};

export default inputForms;
