const PATHS = {
  DEFAULT: '/',
  FORGOT: '/forgot',
  HOME: '/home',
  LOGIN: '/login',
  NEW_LOGIN: '/newlogin',
  SIGNUP: '/signup/:referrer?',
  LOGOUT: '/logout',
  SHARE_SESSION: '/sharesession',
  PLANNING_CONFIG: '/planningconfig',
  SESSION_STARTED: '/sessionstarted',
  SESSION_PARTICIPATE: '/session/:id?',
  VOTING_CARDS: '/votingcards/:roomId?',
  PRIVACY_POLICY: '/privacypolicy',
  PROFILE: '/profile',
  OAUTH_VALIDATION: '/oauthvalidation',
  NOT_FOUND: '/*',
};

export default PATHS;
