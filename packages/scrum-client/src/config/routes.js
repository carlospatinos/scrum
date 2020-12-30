import Login from '../content/Login';
import Signup from '../content/Signup';
import Logout from '../content/Logout';
import Home from '../content/Home';
import PlanningConfig from '../content/PlanningConfig';
import SessionStarted from '../content/SessionStarted';
import VotingCards from '../content/VotingCards';
import PrivacyPolicy from '../content/PrivacyPolicy';
import NotFound from '../content/NotFound';
import PATHS from '../constants/paths';
import PATH_PARAMS from '../constants/pathsParams';
import ShareSession from '../content/ShareSession/ShareSession';
import ParticipateSession from '../content/ParticipateSession/ParticipateSession';
import OauthValidation from '../content/OauthValidation/OauthValidation';
import Profile from '../content/Profile';

const routes = [
  {
    path: PATHS.LOGIN,
    component: Login,
    title: 'Login',
    params: PATH_PARAMS.NO_PARAM,
    isPrivate: false,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.SIGNUP,
    component: Signup,
    title: 'Sign up',
    params: PATH_PARAMS.OPTIONAL_REFERRED_ID,
    isPrivate: false,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.HOME,
    component: Home,
    title: 'Home',
    params: PATH_PARAMS.NO_PARAM,
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.PLANNING_CONFIG,
    component: PlanningConfig,
    title: 'Planning Config',
    params: PATH_PARAMS.NO_PARAM,
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.SESSION_STARTED,
    component: SessionStarted,
    title: 'Session Started',
    params: PATH_PARAMS.NO_PARAM,
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.VOTING_CARDS,
    component: VotingCards,
    title: 'Voting Cards',
    params: PATH_PARAMS.OPTIONAL_ROOM_ID,
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.SHARE_SESSION,
    component: ShareSession,
    title: 'Share Session',
    params: PATH_PARAMS.NO_PARAM,
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.SESSION_PARTICIPATE,
    component: ParticipateSession,
    title: 'Participate Session',
    params: PATH_PARAMS.OPTIONAL_ID,
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.PRIVACY_POLICY,
    component: PrivacyPolicy,
    title: 'Privacy Policy',
    params: PATH_PARAMS.NO_PARAM,
    isPrivate: false,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.PROFILE,
    component: Profile,
    title: 'Profile',
    params: PATH_PARAMS.NO_PARAM,
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.OAUTH_VALIDATION,
    component: OauthValidation,
    title: 'Oauth Validation',
    params: PATH_PARAMS.NO_PARAM,
    isPrivate: false,
    isVisibleOnMenu: false,
  },
  {
    path: PATHS.LOGOUT,
    component: Logout,
    title: 'Logout',
    params: PATH_PARAMS.NO_PARAM,
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  // Its important to keep default and not found to the last part
  {
    path: PATHS.DEFAULT,
    component: Login,
    title: 'Root',
    params: PATH_PARAMS.NO_PARAM,
    isPrivate: false,
    isVisibleOnMenu: false,
  },
  {
    path: PATHS.NOT_FOUND,
    component: NotFound,
    title: 'Not Found',
    params: PATH_PARAMS.NO_PARAM,
    isPrivate: false,
    isVisibleOnMenu: false,
  },
];

export default routes;
