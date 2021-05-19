import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Appbar from '@components/layout/Appbar';
import HomePage from '@pages/HomePage';
import ViewArticlePage from '@pages/ViewArticlePage';
import CreateArticlePage from '@pages/CreateArticlePage';
import ErrorNotifications from '@components/misc/ErrorNotifications';

export default function () {
  return (
    <Router>
      <Appbar />
      <Switch>
        <Route path='/post/edit/:id'></Route>
        <Route path='/post/new'>
          <CreateArticlePage />
        </Route>
        <Route path='/post/:id'>
          <ViewArticlePage />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
      <ErrorNotifications />
    </Router>
  );
}
