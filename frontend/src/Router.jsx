import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Appbar from '@components/layout/Appbar';
import HomePage from '@pages/HomePage';
import ArticleDetailsPage from '@pages/ArticleDetailsPage';

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
    </Router>
  );
}
