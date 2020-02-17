import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Forum from './components/layout/Forum';
import Profile from './components/layout/Profile';
import Survey from './components/layout/Survey';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path = "/" component = {Landing } />
      <section className ="container">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/forum" component={Forum} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/surveys" component={Survey} />
        </Switch>
      </section>
    </Fragment> 
  </Router>
);
export default App;
