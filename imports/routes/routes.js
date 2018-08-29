import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Router, Switch, Route, Redirect } from "react-router-dom";
import createHistory from "history/createBrowserHistory"

import Signup from '../ui/Signup'
import Link from '../ui/Link'
import NotFound from '../ui/NotFound'
import Login from '../ui/Login'

const history = createHistory()

window.browserHistory = history

const unauthenticatedPages = ['/', '/signup']
const authenticatedPages = ['/links']

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname
  const isUnAuthenticatedPage = unauthenticatedPages.includes(pathname)
  const isAuthenticatedPage = authenticatedPages.includes(pathname)

  if (isUnAuthenticatedPage && isAuthenticated) {
    history.replace('/links')
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/')
  }
}

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" exact render={() => (
        !!Meteor.userId() ? (<Redirect to="/links" />) : <Login />
      )} />
      <Route exact path="/signup" render={() => (
        !!Meteor.userId() ? (<Redirect to="/links" />) : <Signup />
      )} />
      <Route exact path="/links" render={() => (
        !!Meteor.userId() ? (<Link />) : <Login />
      )} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)