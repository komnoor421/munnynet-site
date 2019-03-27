import React from 'react';
import ScrollToTop from '../resources/ScrollToTop';
import Header from './Header';
import Routes from '../routes';
import Footer from './Footer';

export class Layout extends React.Component {

  render() {
    return (
      <div id='contentWrapper'>
        <ScrollToTop>
          <Header />
            <Routes />
          <Footer />
        </ScrollToTop>
      </div>
    );
  }
}
