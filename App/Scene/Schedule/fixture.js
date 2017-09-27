import moment from 'moment';
import { DATE_FORMAT } from 'react-native-dotenv';

const TODAY = moment();

const addDays = days => moment(TODAY).add(days, 'd').format(DATE_FORMAT);

const SCHEDULES = [
  {
    date: addDays(0),
    activities: [
      {
        title: 'Breakfast',
        time: '8 AM',
        shortDescription:
          'Eat and talk about something that can be impossible.',
      },
      {
        title: 'Short Talk',
        time: '10 AM',
        shortDescription: 'Chatting time',
        active: true,
      },
      {
        title: 'React native',
        time: '11 AM',
        shortDescription: 'React, React native & Redux.',
      },
      {
        title: 'Lunch',
        time: '1 PM',
        shortDescription: 'Eat and talk.',
      },
      {
        title: 'Internet of Things',
        time: '3 PM',
        shortDescription: 'IoT, ML,...',
        active: true,
      },
      {
        title: 'MongoDB',
        time: '5 PM',
        shortDescription: 'MongoDB and why it is better using NoSQL',
      },
      {
        title: 'NodeJS',
        time: '7 PM',
        shortDescription:
          'Learn how to deploy a Nodejs server built with Express in 2 hours.',
      },
    ],
  },
  {
    date: addDays(1),
    activities: [
      {
        title: 'Breakfast',
        time: '8 AM',
        shortDescription:
          'Eat and talk about something that can be impossible.',
      },
      {
        title: 'Short Talk',
        time: '10 AM',
        shortDescription: 'Chatting time',
      },
      {
        title: 'AngularJS',
        time: '11 AM',
        shortDescription: 'From AngularJS to Angular',
        active: true,
      },
      {
        title: 'Lunch',
        time: '1 PM',
        shortDescription: 'Eat and talk.',
      },
      {
        title: 'Angular 4',
        time: '3 PM',
        shortDescription: 'New Future of JS development.',
        active: true,
      },
      {
        title: 'Firebase',
        time: '5 PM',
        shortDescription: 'MongoDB and why it is better using NoSQL',
        active: true,
      },
      {
        title: 'Angular with Firebase',
        time: '7 PM',
        shortDescription:
          'Learn how to deploy a Angular App with Firebase in 2 hours.',
        active: true,
      },
    ],
  },
  {
    date: addDays(2),
    activities: [
      {
        title: 'Breakfast',
        time: '8 AM',
        shortDescription:
          'Eat and talk about something that can be impossible.',
      },
      {
        title: 'Short Talk',
        time: '10 AM',
        shortDescription: 'Chatting time',
      },
      {
        title: 'Ruby',
        time: '11 AM',
        shortDescription: 'Ruby basic.',
        active: true,
      },
      {
        title: 'Lunch',
        time: '1 PM',
        shortDescription: 'Eat and talk.',
      },
      {
        title: 'Ruby on Rails',
        time: '3 PM',
        shortDescription: 'Web development with RoR',
        active: true,
      },
      {
        title: 'PostgreSQL',
        time: '5 PM',
        shortDescription:
          'PostgreSQL and why it is the best relational Database.',
        active: true,
      },
      {
        title: 'Ruby on Rails future',
        time: '7 PM',
        shortDescription: 'Discussing about Ruby on Rails.',
        active: true,
      },
    ],
  },
  {
    date: addDays(3),
    activities: [
      {
        title: 'Breakfast',
        time: '8 AM',
        shortDescription: 'something',
      },
      {
        title: 'Short Talk',
        time: '9 AM',
        shortDescription: 'something',
      },
      {
        title: 'Music',
        time: '10 AM',
        shortDescription: 'something',
        active: true,
      },
    ],
  },
  {
    date: addDays(4),
    activities: [
      {
        title: 'Breakfast',
        time: '8 AM',
        shortDescription: 'something',
      },
      {
        title: 'Short Talk',
        time: '9 AM',
        shortDescription: 'something',
      },
      {
        title: 'Music',
        time: '10 AM',
        shortDescription: 'something',
        active: true,
      },
    ],
  },
  {
    date: addDays(5),
    activities: [
      {
        title: 'Breakfast',
        time: '8 AM',
        shortDescription: 'something',
        active: true,
      },
      {
        title: 'Short Talk',
        time: '9 AM',
        shortDescription: 'something',
      },
      {
        title: 'Music',
        time: '10 AM',
        shortDescription: 'something',
      },
    ],
  },
  {
    date: addDays(6),
    activities: [
      {
        title: 'Breakfast',
        time: '8 AM',
        shortDescription: 'something',
      },
      {
        title: 'Short Talk',
        time: '9 AM',
        shortDescription: 'something',
        active: true,
      },
      {
        title: 'Music',
        time: '10 AM',
        shortDescription: 'something',
      },
    ],
  },
  {
    date: addDays(7),
    activities: [
      {
        title: 'Breakfast',
        time: '8 AM',
        shortDescription: 'something',
      },
      {
        title: 'Short Talk',
        time: '9 AM',
        shortDescription: 'something',
      },
      {
        title: 'Music',
        time: '10 AM',
        shortDescription: 'something',
        active: true,
      },
    ],
  },
  {
    date: addDays(8),
    activities: [
      {
        title: 'Breakfast',
        time: '8 AM',
        shortDescription: 'something',
        active: true,
      },
      {
        title: 'Short Talk',
        time: '9 AM',
        shortDescription: 'something',
      },
      {
        title: 'Music',
        time: '10 AM',
        shortDescription: 'something',
      },
    ],
  },
  {
    date: addDays(9),
    activities: [
      {
        title: 'Breakfast',
        time: '8 AM',
        shortDescription: 'something',
      },
      {
        title: 'Short Talk',
        time: '9 AM',
        shortDescription: 'something',
        active: true,
      },
      {
        title: 'Music',
        time: '10 AM',
        shortDescription: 'something',
      },
    ],
  },
];

export default SCHEDULES;
