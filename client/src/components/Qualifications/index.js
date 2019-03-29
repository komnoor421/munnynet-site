import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import bg from '../../../public/resources/images/jumbo-bg-2.jpg';

import './style.scss';

var contentBgStyle = {
  background: `url(${bg}) center center`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

class Qualifications extends Component {

  render() {
    return (
      <div id='qualificationsWrapper'>
        <div className='jumbotron text-center' style={contentBgStyle}>
          <div className='jumboHeader align-middle'>
            <h1 className="display-3">Qualifications</h1>
          </div>
          <div className='downArrow qualifyDownArrow'><i className="fas fa-chevron-down"></i></div>
        </div>
        <section className='qualify2'>
          <div className="container">
            <h2>At MunnyNest, we work hard to get the best possible loan & offer for your business, considering all aspects of your given information with our trusted & professional advisors.</h2>
          </div>
        </section>
        <section className='qualify3'>
          <div className='container'>
            <div className='row noInfo'>
              <div className='col-md-4 col-sm-12 text-center align-self-center'>
                <i className="fab fa-creative-commons-nc fa-6x"></i>
              </div>
              <div className='col-md-8 col-sm-12'>
                <h3>
                  There are NO application fees, NO up-front cost &<br />NO collateral required.
                  Funding is also available to a wide range of businesses & services.
                </h3>
              </div>
            </div>
            <div className='row listQual'>
              <div className='col'>
                <ol>
                  <li>Minimum of 3 Months in Operations</li>
                  <li>Credit Score as Low as 500 FICO</li>
                  <li>Proof of $10,000 in Gross Monthly Deposits & Revenue</li>
                </ol>
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
        <section id='qualify4'>
          <div className="container text-center">
            <h2>Upon your approved qualification terms for funding, we get the "munny" to you fast at the best rates available. Our mission at MunnyNest is to help your business find the perfect financing option in time.</h2>
          </div>
        </section>
      </div>
    );
  }

}

export default Qualifications;
