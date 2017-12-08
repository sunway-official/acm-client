export const DEFAULT_ME = {
  firstname: 'Nguyen Van',
  lastname: 'Teo',
  dob: null,
  gender: { name: 'Male', value: 'male' },
  interested_in: 'Listen to music and go to travel',
  bio:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
  organization: 'ABC Company',
  position: 'Director of Human and Resource Department',
  language: 'English',
  facebook_id: 'facebook.com',
  twitter_id: 'twitter.com',
  linkedin_id: 'linkedin.com',
};

export const FOLLOWERS = [
  {
    username: 'Taylor Swift',
    avatar:
      'https://pmchollywoodlife.files.wordpress.com/2017/08/taylor-swift-bio1.jpg?w=620',
    followers: 78,
    followByMe: false,
  },
  {
    username: 'Bill Gates',
    avatar:
      'https://pbs.twimg.com/profile_images/889736688624312321/xVAFH9ZH_400x400.jpg',
    followers: 10,
    followByMe: true,
  },
  {
    username: 'Donald Trump',
    avatar: 'https://media.salon.com/2017/04/donald-trump346-620x412.jpg',
    followers: 1400,
    followByMe: true,
  },
  {
    username: 'Selena Gomez',
    avatar:
      'http://www.elle.vn/wp-content/uploads/2017/01/10/Selena-Gomez-v%C3%A0-b%C3%A0i-h%E1%BB%8Dc-l%E1%BB%9Bn-nh%E1%BA%A5t-trong-n%C4%83m-2016.jpg',
    followers: 155,
    followByMe: false,
  },
  {
    username: 'Justin Bieber',
    avatar:
      'http://kenh14cdn.com/2017/justin-bieber-blonde-hair-1498232065719.jpg',
    followers: 18,
    followByMe: true,
  },
  {
    username: 'Adele',
    avatar:
      'http://thegioivanhoa.com.vn/medias/2017/05/adela-r%E1%BA%A5t-gi%C3%A0u.jpg',
    followers: 550,
    followByMe: false,
  },
];

export const FOLLOWING = [
  {
    username: 'Taylor Swift',
    avatar:
      'https://pmchollywoodlife.files.wordpress.com/2017/08/taylor-swift-bio1.jpg?w=620',
    followers: 78,
    followByMe: true,
  },
  {
    username: 'Bill Gates',
    avatar:
      'https://pbs.twimg.com/profile_images/889736688624312321/xVAFH9ZH_400x400.jpg',
    followers: 10,
    followByMe: true,
  },
  {
    username: 'Donald Trump',
    avatar: 'https://media.salon.com/2017/04/donald-trump346-620x412.jpg',
    followers: 1400,
    followByMe: true,
  },
  {
    username: 'Justin Bieber',
    avatar:
      'http://kenh14cdn.com/2017/justin-bieber-blonde-hair-1498232065719.jpg',
    followers: 18,
    followByMe: true,
  },
];

export default {
  DEFAULT_ME,
  FOLLOWERS,
  FOLLOWING,
};
