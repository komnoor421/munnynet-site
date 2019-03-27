import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../public/resources/images/logo-main.png';

import './style.scss';

class Header extends Component {

  constructor() {
    super();

    this.state = {
      menuVisible: false
    }

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  toggleMenu() {
    this.setState(
      { menuVisible: !this.state.menuVisible }
    );
  }

  closeMenu() {
    this.setState(
      { menuVisible: false }
    );
  }

  render() {
    const that = this;
    return (
      <header>
        <div className='headerWrapper container-fluid'>
          <nav className='headerLeft'>
            <Link to='/'>
              <img className='logo' src={logo} />
            </Link>
            <i className="fas fa-bars menuButton menuInner" onClick={this.toggleMenu}></i>
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
            <a href='tel:8336869678' className='phoneNav'>

                <i className="fas fa-phone"></i>
                <div className='phoneNums'>
                  <span>(833) MUN-YNST</span>
                  <span>(833) 686-9678</span>
                </div>
            </a>
            <Link to="/contact">
              <button type="button" className="applyButton btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
        <div className='headerWrapper container-fluid navNarrow'
        ref={function(el) {
          if (el) {
            if (that.state.menuVisible) {
              return el.style.setProperty('display', 'block', 'important');
            } else {
              return el.style.setProperty('display', 'none', 'important');
            }
          }
        }}>
          <ul>
            <div className='dropMenuTop'>
              <Link to="/contact" onClick={this.closeMenu}>
                <button type="button" className="applyButton btn btn-primary">Get Started</button>
              </Link>
              <a href='tel:8336869678' className='phoneNav'>
                  <i className="fas fa-phone"></i>
                  <div className='phoneNums'>
                    <span>(833) MUN-YNST</span>
                    <br />
                    <span>(833) 686-9678</span>
                  </div>
              </a>
            </div>
            <li>
              <Link to='/qualifications' onClick={this.closeMenu}>
                Qualifications
              </Link>
            </li>
            <li>
              <Link to='/products' onClick={this.closeMenu}>
                Loans & Products
              </Link>
            </li>
            <li>
              <Link to='/contact' onClick={this.closeMenu}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }

}

export default Header;
