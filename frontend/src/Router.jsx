import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Appbar from '@components/layout/Appbar';
import HomePage from '@pages/HomePage';
import ArticleDetailsPage from '@pages/ArticleDetailsPage';
import ErrorNotifications from '@components/misc/ErrorNotifications';

export default function () {
  return (
    <Router>
      <Appbar />
      <Switch>
        <Route path='/post/edit/:id'></Route>
        <Route path='/post/new'></Route>
        <Route path='/post/:id'>
          <ArticleDetailsPage />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
      <ErrorNotifications />
    </Router>
  );
}
