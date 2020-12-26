import Login from '../content/Login';
import Home from '../content/Home';
import NotFound from '../content/NotFound';
import PATHS from '../constants/paths';

const routes = [
  {
    path: PATHS.LOGIN,
    component: Login,
    isPrivate: false,
  },
  {
    path: PATHS.HOME,
    component: Home,
    isPrivate: true,
  },
  {
    path: PATHS.NOT_FOUND,
    component: NotFound,
    isPrivate: true,
  },
];

export default routes;
