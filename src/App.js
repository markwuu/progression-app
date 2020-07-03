import React from 'react';
import './App.css';
import Nav from './components/nav';
import Home from './pages/home';
import Goals from './pages/goals';
import Settings from './pages/settings';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/goals" component={Goals} />
          <Route path="/settings" component={Settings} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
