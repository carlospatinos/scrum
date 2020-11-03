import { useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';

const TitledRoute = props => {
  const { title, pageView = () => {}, location, ...rest } = props;

  useEffect(() => {
    document.title = `Scrummy CAPS - ${title}` || `Scrummy CAPS`;
  }, [title]);

  pageView({
    title,
    location: location.href,
    path: location.pathname,
  });
  return <Route {...rest} />;
};
export default withRouter(TitledRoute);
