import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import bg from '../../../public/resources/images/home-bg.jpg';

import './style.scss';

var jumboBgStyle = {
  background: `url(${bg}) center top`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

class Home extends Component {

  constructor() {
    super();

    this.arrowClick = this.arrowClick.bind(this);
  }

  arrowClick() {
    document.getElementById('secondaryHeaderSection').scrollIntoView(true);
    window.scrollBy(0, -70);
  }

  render() {
    return (
      <div id='homeWrapper'>
        <div className='jumbotron text-center' style={jumboBgStyle}>
          <div className='jumboHeader'>
            <h1 className="display-4">MunnyNest<br/>Business Loans</h1>
            <h1 className="display-3">Help When Bank Loans Cannot</h1>
            <div className='mainButton'>
              <Link to="/contact">
                <button type="button" className="applyButton cta btn btn-primary">Get Started</button>
              </Link>
            </div>
          </div>
          <div className='downArrow' onClick={this.arrowClick}><i className="fas fa-chevron-down"></i></div>
        </div>
        <section id='secondaryHeaderSection'>
          <div className="container text-center">
            <h2>
              Simple, Fast and Personalized
              <br />
              approach to get funds that can be used to solve your cash flow needs & to cover any expenses within your business.
            </h2>
          </div>
        </section>
        <section id='stepSection'>
          <div className='container-fluid'>
            <h2>How It Works</h2>
            <div className='row'>
              <div className='step col-md-4'>
                <i className="fas fa-laptop fa-3x"></i>
                <p>Apply Online</p>
              </div>
              <div className='step col-md-4'>
                <i className="fas fa-user-tie fa-3x"></i>
                <p>
                  Get Connected to a Trusted Advisor
                  <br />
                  For Approval in 24-48 Hours
                </p>
              </div>
              <div className='step col-md-4'>
                <i className="fas fa-hand-holding-usd fa-3x"></i>
                <p>
                  Have Funds In Your Account
                  <br />
                  Within 3 Days
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="ctaSection">
          <h2>Get Pre-Approved Today!</h2>
          <Link to="/contact">
            <button type="button" className="applyButton ctaBig btn btn-primary">Get Started</button>
          </Link>
        </section>
      </div>
    );
  }

}

export default Home;
