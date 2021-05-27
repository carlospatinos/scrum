// Here we register all component and middleware routes.

const { UserRoutes } = require('./components/user');
const { TipsRoutes } = require('./components/tips');
const { PlanningSessionRoutes } = require('./components/planningSession');
const { UserStoryRoutes } = require('./components/userStory');
const { AuthRoutes } = require('./components/auth');
const DefaultRoute = require('./defaultRoute');

module.exports = {
  UserRoutes,
  UserStoryRoutes,
  TipsRoutes,
  PlanningSessionRoutes,
  AuthRoutes,
  DefaultRoute,
};
