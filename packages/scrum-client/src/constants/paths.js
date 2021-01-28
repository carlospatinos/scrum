// TODO - validate all paths, Not all of them might be used.
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
  SESSION_JOIN: '/session/:roomId?',
  SESSION_PARTICIPATE: '/sessionparticipate/:roomId?',
  VOTING_CARDS: '/votingcards/:roomId?',
  PRIVACY_POLICY: '/privacypolicy',
  PROFILE: '/profile',
  OAUTH_VALIDATION: '/oauthvalidation',
  NOT_FOUND: '/*',
};

export default PATHS;
