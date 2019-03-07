import React, { Component } from 'react';

import bg from '../../../public/resources/images/jumbo-bg.jpg';

import './style.scss';

var jumboBgStyle = {
  background: `url(${bg}) center -5px`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

class Home extends Component {

  render() {
    return (
      <div id='homeWrapper'>
        <div className='jumbotron text-center' style={jumboBgStyle}>
          <div className='jumboHeader'>
            <h1 className="display-4">MunnyNest Business Loans</h1>
            <h1 className="display-3">help when Bank Loans Cannot</h1>
          </div>
          <div className='mainButton'>
            <button type="button" className="applyButton cta btn btn-primary">Get Started</button>
          </div>
        </div>
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
          <button type="button" className="applyButton ctaBig btn btn-primary">Get Started</button>
        </section>
      </div>
    );
  }

}

export default Home;
