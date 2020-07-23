import React from 'react'
import { Route, Redirect } from 'react-router-dom'


// Renders C if user is authenticated.
// Otherwise, redirects to path.
const ConditionalRoute = ({
  component: C, condition, redir, ...rest
}) => (
  <Route
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...rest}
    render={(props) => (
      condition
      // eslint-disable-next-line react/jsx-props-no-spreading
        ? <C {...props} />
        : <Redirect to={redir} push />
    )}
  />
);

export default ConditionalRoute
