import React from 'react'
import { Switch, Route } from 'react-router-dom'

import SignIn from './SignIn'
import Lobby from './Lobby'
import Game from './Game'
import Error from './Error'
import ConditionalRoute from './ConditionalRoute'
import { ContextApp } from './contextApp'



const toCondRoute = (condition, redir) => (({ component, path }) => (
  <ConditionalRoute
    component={component}
    condition={condition}
    key={path}
    exact
    path={path}
    redir={redir}
  />
))

const Routes = () => (
  <ContextApp.Consumer>
    { ([context, setContext]) => {
      const auth = context.auth
      console.log('Context', context)
      return (
        <Switch>
          {/* Only if authenticated. */}
          {[{ auth, path: '/create', component: Lobby },
            { auth, path: '/game', component: Game },
          ].map(toCondRoute(auth, '/'))}

          {/* Only if not authenticated. */}
          {[{ path: '/', component: SignIn },
        ].map(toCondRoute(!auth, '/create'))}

          {/* Default. */}
          <Route>
            <Error message="Page not found" />
          </Route>
        </Switch>
      )}
    }
  </ContextApp.Consumer>
)

export default Routes
