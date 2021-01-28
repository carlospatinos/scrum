import { lazy } from 'react';
import { PATHS } from '../constants';
import { JoinSessionRoute } from '../components/router';

const Login = lazy(() => import('../content/Login'));
const Signup = lazy(() => import('../content/Signup'));
const Logout = lazy(() => import('../content/Logout'));
const Home = lazy(() => import('../content/Home'));
const PlanningConfig = lazy(() => import('../content/PlanningConfig'));
const VotingCards = lazy(() => import('../content/VotingCards'));
const PrivacyPolicy = lazy(() => import('../content/PrivacyPolicy'));
const NotFound = lazy(() => import('../content/NotFound'));
const ShareSession = lazy(() => import('../content/ShareSession/ShareSession'));
const ParticipateSession = lazy(() => import('../content/ParticipateSession/ParticipateSession'));
const OauthValidation = lazy(() => import('../content/OauthValidation/OauthValidation'));
const Profile = lazy(() => import('../content/Profile'));

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
    path: PATHS.VOTING_CARDS,
    component: VotingCards,
    title: 'Voting Cards',
    isPrivate: true,
    isVisibleOnMenu: false,
  },
  {
    path: PATHS.SHARE_SESSION,
    component: ShareSession,
    title: 'Share Session',
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.SESSION_JOIN,
    component: JoinSessionRoute,
    title: 'Join Session',
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.SESSION_PARTICIPATE,
    component: ParticipateSession,
    title: 'Participate Session (admin)',
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
    path: PATHS.PROFILE,
    component: Profile,
    title: 'Profile',
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.OAUTH_VALIDATION,
    component: OauthValidation,
    title: 'Oauth Validation',
    isPrivate: false,
    isVisibleOnMenu: false,
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
