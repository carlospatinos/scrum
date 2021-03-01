import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    // this.onClickHandler = this.onClickHandler.bind(this);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    const { logError } = this.props;
    logError(error, errorInfo);
  }

  static onClickHandler(event) {
    event.preventDefault();
    window.location.reload();
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return (
        <Alert variant="danger">
          Something went wrong.
          <Alert.Link href="/" onClick={ErrorBoundary.onClickHandler}>
            Try again
          </Alert.Link>
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
