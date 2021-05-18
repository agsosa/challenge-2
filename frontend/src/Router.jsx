import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Appbar from '@components/layout/Appbar';
import HomePage from '@pages/HomePage';

export default function () {
  return (
    <Router>
      <Appbar />
      <Switch>
        <Route path='/about'></Route>
        <Route path='/users'></Route>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}
