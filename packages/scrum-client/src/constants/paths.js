const PATHS = {
  DEFAULT: '/',
  FORGOT: '/forgot',
  HOME: '/home',
  LOGIN: '/login',
  NEW_LOGIN: '/newlogin',
  SIGNUP: '/signup',
  LOGOUT: '/logout',
  JOIN_SESSION: '/joinsession',
  PLANNING_CONFIG: '/planningconfig',
  SESSION_STARTED: '/sessionstarted',
  SESSION_PARTICIPATE: '/session/:id',
  VOTING_CARDS: '/votingcards/:roomId',
  // TODO move to a common path to be used by client and server?
  GOOGLE_LOGIN: 'http://localhost:3000/auth/google',
  GOOGLE_REDIRECT: '/auth/google/redirect',
  TWITTER_LOGIN: 'http://localhost:3000/auth/twitter',
  TWITTER_REDIRECT: '/auth/twitter/redirect',
  FACEBOOK_LOGIN: 'http://localhost:3000/auth/facebook',
  FACEBOOK_REDIRECT: '/auth/facebook/redirect',
};

export default PATHS;
