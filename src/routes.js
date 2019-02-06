import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Qualifications from './components/Qualifications';
import Products from './components/Products';
import Contact from './components/Contact';

import './resources/styles.scss';

class Routes extends React.Component {
  render() {
    return (
      <div id='mainContent'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/qualifications' component={Qualifications} />
          <Route path='/products' component={Products} />
          <Route path='/contact' component={Contact} />
        </Switch>
      </div>
    )
  }
}

export default Routes;
