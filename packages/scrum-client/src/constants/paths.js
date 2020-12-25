const PATHS = {
  DEFAULT: '/',
  FORGOT: '/forgot',
  HOME: '/home',
  LOGIN: '/login',
  NEW_LOGIN: '/newlogin',
  SIGNUP: '/signup',
  LOGOUT: '/logout',
  SHARE_SESSION: '/sharesession',
  PLANNING_CONFIG: '/planningconfig',
  SESSION_STARTED: '/sessionstarted',
  SESSION_PARTICIPATE: '/session/:id',
  VOTING_CARDS: '/votingcards/:roomId',
  PRIVACY_POLICY: '/privacypolicy',
  PROFILE: '/profile',
  // TODO move to a common path to be used by client and server?
  GOOGLE_LOGIN: '/auth/google',
  TWITTER_LOGIN: '/auth/twitter',
  FACEBOOK_LOGIN: '/auth/facebook',
  AUTH_LOCAL: '/auth/local',
  LOGIN_SUCCESS: '/auth/login/success',
  SIGN_UP: '/api/signup',
  PLANNING_SESSION: '/api/planningsession',
};

export default PATHS;
