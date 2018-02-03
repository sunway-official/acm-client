/**
 * Deprecated
 */

const modifyDate = number => {
  let date = new Date();
  date.setHours(date.getHours());
  date.setMinutes(date.getMinutes() + number * 100);
  return date;
};

export default [
  {
    date: modifyDate(0),
    activities: [
      {
        title: 'Breakfast',
        time: modifyDate(1),
        shortDescription:
          'Eat and talk about something that can be impossible.',
      },
      {
        title: 'Short Talk',
        time: modifyDate(2),
        shortDescription: 'Chatting time',
        active: true,
      },
      {
        title: 'React native',
        time: modifyDate(3),
        shortDescription: 'React, React native & Reduck.',
      },
      {
        title: 'Lunch',
        time: modifyDate(4),
        shortDescription: 'Eat and talk.',
      },
      {
        title: 'Internet of Things',
        time: modifyDate(5),
        shortDescription: 'IoT, ML,...',
        active: true,
      },
      {
        title: 'MongoDB',
        time: modifyDate(6),
        shortDescription: 'MongoDB and why it is better using NoSQL',
      },
      {
        title: 'NodeJS',
        time: modifyDate(7),
        shortDescription:
          'Learn how to deploy a Nodejs server built with Express in 2 hours.',
      },
    ],
  },
];
