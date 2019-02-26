import React, { Component } from 'react';

import './style.scss';

class Footer extends Component {

  render() {
    return (
      <div id='footer'>
        <div className='footerContent text-center'>
          <div className='social'>
            <i className="fab fa-facebook-square"></i>
            <i className="fab fa-linkedin"></i>
            <i className="fab fa-twitter-square"></i>
          </div>
          <div className='copyrightWrapper'>
            <div className='copyrightContent'>
              <p>All Loan Types are Subject to Lender Approval. Your loan agreement will identify the loan issuer prior to your signing.</p>
              <p>Atlanta, USA</p>
              <p>&copy; 2019 MunnyNest</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Footer;
