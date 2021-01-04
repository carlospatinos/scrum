// Here we register all component and middleware routes.

const { UserRoutes } = require('./components/user');
const { TipsRoutes } = require('./components/tips');
const { PlanningSessionRoutes } = require('./components/planningSession');

exports.routes = { UserRoutes, TipsRoutes, PlanningSessionRoutes };
