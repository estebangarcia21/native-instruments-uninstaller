import React from 'react';
import {
  MemoryRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import './App.global.css';
import Home from './screens/Home';
import SplashScreen from './screens/SplashScreen';

export default function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/_splash" />
        <Route path="/_splash" component={SplashScreen} />

        <Route path="/home" component={Home} />
      </Switch>
    </Router>
  );
}
