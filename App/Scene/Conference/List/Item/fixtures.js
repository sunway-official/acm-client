export const backgrounds = [
  'https://s3-ap-southeast-1.amazonaws.com/sunway-acm-dev/conferences/Conference+on+India+2017.jpg',
  'https://s3-ap-southeast-1.amazonaws.com/sunway-acm-dev/conferences/bsr16-share.jpg',
  'https://s3-ap-southeast-1.amazonaws.com/sunway-acm-dev/conferences/conference-centre.jpg',
  'https://s3-ap-southeast-1.amazonaws.com/sunway-acm-dev/conferences/conference-seats.jpg',
  'https://s3-ap-southeast-1.amazonaws.com/sunway-acm-dev/conferences/cop11-plenary-iisd-web.jpg',
  'https://s3-ap-southeast-1.amazonaws.com/sunway-acm-dev/conferences/image18_5250.jpg',
  'https://s3-ap-southeast-1.amazonaws.com/sunway-acm-dev/conferences/mtbos-OG-506x253-agenda-twitter.png',
  'https://s3-ap-southeast-1.amazonaws.com/sunway-acm-dev/conferences/project-controls-Conferences.jpg',
  'https://s3-ap-southeast-1.amazonaws.com/sunway-acm-dev/conferences/slide_conference.jpg',
  'https://s3-ap-southeast-1.amazonaws.com/sunway-acm-dev/conferences/stonewall_scotland_workplace_conference_2016_0.jpg',
  'https://s3-ap-southeast-1.amazonaws.com/sunway-acm-dev/conferences/6URC.JPG',
  'https://s3-ap-southeast-1.amazonaws.com/sunway-acm-dev/conferences/9323706488_7c288a9659_b.jpg',
];

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomBackground = () => {
  index = getRandomInt(0, 11);
  return backgrounds[index];
};
