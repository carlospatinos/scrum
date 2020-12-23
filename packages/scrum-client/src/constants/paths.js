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
  PRIVACY_POLICY: '/privacypolicy',
  // TODO move to a common path to be used by client and server?
  GOOGLE_LOGIN: '/auth/google',
  TWITTER_LOGIN: '/auth/twitter',
  FACEBOOK_LOGIN: '/auth/facebook',
};

export default PATHS;
