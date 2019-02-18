import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../public/resources/images/logo-main.png';

import './style.scss';

class Header extends Component {
  render() {
    return (
      <header>
        <div className='headerWrapper container-fluid'>
          <nav className='headerLeft'>
            <Link to='/'>
              <img className='logo' src={logo} />
            </Link>
            <ul>
              <li>
                <Link to='/qualifications'>
                  Qualifications
                </Link>
              </li>
              <li>
                <Link to='/products'>
                  Loans & Products
                </Link>
              </li>
              <li>
                <Link to='/contact'>
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
          <div className='headerRight'>
            <button type="button" className="applyButton btn btn-primary">Get Started</button>
          </div>
        </div>
      </header>
    );
  }

}

export default Header;
