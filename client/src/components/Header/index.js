import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

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
    this.scrollToForm = this.scrollToForm.bind(this);
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

  scrollToForm() {
    document.getElementById('spanishApplicationForm').scrollIntoView(true);
    window.scrollBy(0, -70);
    this.closeMenu();
  }

  render() {
    const that = this;
    let inSpanish = false;
    if (this.props.location.pathname == '/es') {
      inSpanish = true;
    }
    return (
      <header>
        <div className='headerWrapper container-fluid'>
          <nav className={inSpanish ? 'headerLeft spanishHeadLeft' : 'headerLeft'}>
            <Link to='/' onClick={this.closeMenu}>
              <img className='logo' src={logo} />
            </Link>
            {!inSpanish &&
              <i className="fas fa-bars menuButton menuInner" onClick={this.toggleMenu}></i>
            }
            {!inSpanish &&
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
                <li>
                  <Link to='/es'>
                    Se Habla Español
                  </Link>
                </li>
              </ul>
            }
          </nav>
          {!inSpanish &&
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
          }
          {inSpanish &&
            <div className='headerRight spanishHeadRight'>
              <a href='tel:8336869678' className='phoneNav'>
                  <i className="fas fa-phone"></i>
                  <div className='phoneNums'>
                    <span>(833) MUN-YNST</span>
                    <span>(833) 686-9678</span>
                  </div>
              </a>
              <button type="button" className="applyButton btn btn-primary" onClick={this.scrollToForm}>Empezar</button>
            </div>
          }
          {inSpanish &&
            <i className="fas fa-bars menuButton menuInner spanishMenuButton" onClick={this.toggleMenu}></i>
          }
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
          {!inSpanish &&
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
              <li className='spanishNarrowDrop'>
                <Link to='/es' onClick={this.closeMenu}>
                  Se Habla Español
                </Link>
              </li>
            </ul>
          }
          {inSpanish &&
            <ul>
              <div className='dropMenuTop spanishDropMenuTop'>
                <button type="button" className="applyButton btn btn-primary" onClick={this.scrollToForm}>Empezar</button>
                <a href='tel:8336869678' className='phoneNav'>
                    <i className="fas fa-phone"></i>
                    <div className='phoneNums'>
                      <span>(833) MUN-YNST</span>
                      <br />
                      <span>(833) 686-9678</span>
                    </div>
                </a>
              </div>
            </ul>
          }
        </div>
      </header>
    );
  }

}

export default withRouter(Header);
