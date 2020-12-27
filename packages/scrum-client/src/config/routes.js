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
import ShareSession from '../content/ShareSession/ShareSession';
import ParticipateSession from '../content/ParticipateSession/ParticipateSession';

const routes = [
  {
    path: PATHS.LOGIN,
    component: Login,
    title: 'Login',
    isPrivate: false,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.SIGNUP,
    component: Signup,
    title: 'Sign up',
    isPrivate: false,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.HOME,
    component: Home,
    title: 'Home',
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.PLANNING_CONFIG,
    component: PlanningConfig,
    title: 'Planning Config',
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.SESSION_STARTED,
    component: SessionStarted,
    title: 'Session Started',
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.VOTING_CARDS,
    component: VotingCards,
    title: 'Voting Cards',
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.SHARE_SESSION,
    component: ShareSession,
    title: 'Share Session',
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.SESSION_PARTICIPATE,
    component: ParticipateSession,
    title: 'Participate Session',
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.PRIVACY_POLICY,
    component: PrivacyPolicy,
    title: 'Privacy Policy',
    isPrivate: false,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.LOGOUT,
    component: Logout,
    title: 'Logout',
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  // Its important to keep default and not found to the last part
  {
    path: PATHS.DEFAULT,
    component: Login,
    title: 'Root',
    isPrivate: false,
    isVisibleOnMenu: false,
  },
  {
    path: PATHS.NOT_FOUND,
    component: NotFound,
    title: 'Not Found',
    isPrivate: false,
    isVisibleOnMenu: false,
  },
];

export default routes;
