import React from 'react';

import Header from './Header';
import Routes from '../routes';
import Footer from './Footer';

export class Layout extends React.Component {

  render() {
    return (
      <div id='contentWrapper'>
        <Header />
          <Routes />
        <Footer />
      </div>
    );
  }
}
