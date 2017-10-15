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
  organization: {
    title: 'Organization',
    icon: {
      name: 'briefcase',
      type: 'entypo',
      color: '#8BC34A',
    },
    field: {
      name: 'organization',
      placeholder: 'Organization',
    },
  },
  position: {
    title: 'Position',
    icon: {
      name: 'users',
      type: 'font-awesome',
      color: '#E91E63',
    },
    field: {
      name: 'position',
      placeholder: 'Position',
    },
  },
  interested_in: {
    title: 'Interested in',
    icon: {
      name: 'car',
      type: 'material-community',
      color: '#F44336',
    },
    field: {
      name: 'interested_in',
      props: {
        placeholder: 'Write your hobbies',
        multiline: true,
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
      name: 'facebook_id',
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
      name: 'twitter_id',
      props: {
        placeholder: 'Your twitter',
      },
    },
  },
  linkedin_id: {
    title: 'Linked',
    icon: {
      name: 'linkedin-box',
      type: 'material-community',
      color: '#0073B1',
    },
    field: {
      name: 'linkedin_id',
      props: {
        placeholder: 'Your linked',
      },
    },
  },
};

export default inputForms;
