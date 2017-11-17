export const backgrounds = [
  'https://www.projectcontrolacademy.com/wp-content/uploads/2016/02/project-controls-Conferences.jpg',
  'https://www.showincity.com/UserFiles/1/2017/India/Conference%20on%20India%202017.jpg',
  'http://c15d619e2a6b9ac27ce9-59f9251715762e8b22bca63007c213d1.r17.cf2.rackcdn.com/bsr16/branding/bsr16-share.jpg',
  'http://aorticconference.org/wp-content/uploads/2017/02/conference-centre.jpg',
  'https://marketinginsidergroup.com/wp-content/uploads/2017/01/9323706488_7c288a9659_b.jpg',
  'http://www.cms.int/sites/default/files/uploads/meetings/cop11/cop11-plenary-iisd-web.jpg',
  'https://www.icsa.org.uk/icsa-conferences/images/mobile-features/conference-seats.jpg',
  'https://mahfouzadedimeji.com/wp-content/uploads/2017/07/slide_conference.jpg',
  'https://sustainabledevelopment.un.org/content/images/image18_5250.jpg',
  'https://martechconf.com/wp-content/uploads/2014/03/mtbos-OG-506x253-agenda-twitter.png',
  'http://www.universitas21.com/upload/forstudents/full/6URC.JPG',
  'http://www.stonewall.org.uk/sites/default/files/stonewall_scotland_workplace_conference_2016_0.jpg',
];

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomBackground = () => {
  index = getRandomInt(0, 4);
  return backgrounds[index];
};
