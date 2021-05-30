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
const SessionSummary = lazy(() => import('../content/SessionSummary'));
const OauthValidation = lazy(() => import('../content/OauthValidation/OauthValidation'));
const Profile = lazy(() => import('../content/Profile'));
// TODO how to translate titles? Do we keep the ids and translate on page?
const routes = [
  {
    path: PATHS.LOGIN,
    component: Login,
    title: 'login',
    isPrivate: false,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.SIGNUP,
    component: Signup,
    title: 'signup',
    isPrivate: false,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.HOME,
    component: Home,
    title: 'home',
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.PROFILE,
    component: Profile,
    title: 'profile',
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.PLANNING_CONFIG,
    component: PlanningConfig,
    title: 'planningconfig',
    isPrivate: true,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.VOTING_CARDS,
    component: VotingCards,
    title: 'votingcards',
    isPrivate: true,
    isVisibleOnMenu: false,
  },
  {
    path: PATHS.SHARE_SESSION,
    component: ShareSession,
    title: 'sharesession',
    isPrivate: true,
    isVisibleOnMenu: false,
  },
  {
    path: PATHS.SESSION_JOIN,
    component: JoinSessionRoute,
    title: 'joinsession',
    isPrivate: true,
    isVisibleOnMenu: false,
  },
  {
    path: PATHS.SESSION_PARTICIPATE,
    component: ParticipateSession,
    title: 'participatesessionadmin',
    isPrivate: true,
    isVisibleOnMenu: false,
  },
  {
    path: PATHS.SESSION_SUMMARY,
    component: SessionSummary,
    title: 'sessionsummaryadmin',
    isPrivate: true,
    isVisibleOnMenu: false,
  },
  {
    path: PATHS.PRIVACY_POLICY,
    component: PrivacyPolicy,
    title: 'privacypolicy',
    isPrivate: false,
    isVisibleOnMenu: true,
  },
  {
    path: PATHS.OAUTH_VALIDATION,
    component: OauthValidation,
    title: 'oauthvalidation',
    isPrivate: false,
    isVisibleOnMenu: false,
  },
  {
    path: PATHS.LOGOUT,
    component: Logout,
    title: 'logout',
    isPrivate: true,
    isVisibleOnMenu: false,
  },
  // Its important to keep default and not found to the last part
  {
    path: PATHS.DEFAULT,
    component: Login,
    title: 'root',
    isPrivate: false,
    isVisibleOnMenu: false,
  },
  {
    path: PATHS.NOT_FOUND,
    component: NotFound,
    title: 'notfound',
    isPrivate: false,
    isVisibleOnMenu: false,
  },
];

export default routes;
