import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import canada from '../../../public/resources/images/canada.png';
import usa from '../../../public/resources/images/usa.png';

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
              <p className='privacyLink'><Link to='/privacy'>Privacy Policy</Link></p>
              <div className='countries'>
                <p><img src={usa}/>USA</p>
                <p><img src={canada}/>Canada</p>
              </div>
              <p>&copy; 2019 MunnyNest</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Footer;
