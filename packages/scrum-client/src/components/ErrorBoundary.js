import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    const { logError } = this.props;
    logError(error, errorInfo);
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      // You can render any custom fallback UI

      return (
        <Alert variant="danger">
          <h1>Something went wrong.</h1>
        </Alert>
      );
    }
    return children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  logError: PropTypes.func,
};

ErrorBoundary.defaultProps = {
  logError: (error, errorInfo) => {
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  },
};
export default ErrorBoundary;
