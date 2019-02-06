import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

class Header extends Component {
  render() {
    return (
      <div id='header'>
        <header>
          <Link to='/'>Logo</Link>
          <Link to='/qualifications'>Qualifications</Link>
          <Link to='/products'>Loans & Products</Link>
          <Link to='/contact'>Contact Us</Link>
        </header>
      </div>
    );
  }

}

export default Header;
