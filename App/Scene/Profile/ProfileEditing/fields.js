import { required } from '~/Lib/validate';
import { DatePicker } from '~/Component';
import GenderForm from './Gender';

const inputForms = {
  firstname: {
    title: 'Firstname',
    icon: {
      name: 'user',
      type: 'font-awesome',
      color: '#9b59b6',
    },
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
    icon: {
      name: 'user',
      type: 'font-awesome',
      color: '#1abc9c',
    },
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
    icon: {
      name: 'gender-male-female',
      type: 'material-community',
      color: '#f1c40f',
    },
    field: {
      name: 'gender',
      component: GenderForm,
    },
  },
  dob: {
    title: 'Birthday',
    icon: {
      name: 'cake',
      type: 'entypo',
      color: '#e74c3c',
    },
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
    icon: {
      name: 'description',
    },
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
    icon: {
      name: 'facebook-box',
      type: 'material-community',
      color: '#4267B2',
    },
    field: {
      name: 'facebook',
      props: {
        placeholder: 'Your facebook',
      },
    },
  },
  twitter_id: {
    title: 'Twitter',
    icon: {
      name: 'twitter',
      type: 'material-community',
      color: '#1DA1F2',
    },
    field: {
      name: 'twitter',
      props: {
        placeholder: 'Your twitter',
      },
    },
  },
  linked_id: {
    title: 'Linked',
    icon: {
      name: 'linkedin-box',
      type: 'material-community',
      color: '#0073B1',
    },
    field: {
      name: 'linked',
      props: {
        placeholder: 'Your linked',
      },
    },
  },
};

export default inputForms;
