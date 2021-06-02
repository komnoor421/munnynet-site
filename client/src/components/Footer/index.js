import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import canada from '../../../public/resources/images/canada.png';
import usa from '../../../public/resources/images/usa.png';

import './style.scss';

class Footer extends Component {

  render() {
    let inSpanish = false;
    if (this.props.location.pathname == '/es') {
      inSpanish = true;
    }
    return (
      <div id='footer'>
        <div className='footerContent text-center'>
          <div className='social'>
            <a href='https://www.facebook.com/munnynest'>
              <i className="fab fa-facebook-square"></i>
            </a>
            <a href='https://www.linkedin.com/company/munnynest-llc'>
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          <div className='copyrightWrapper'>
            <div className='copyrightContent'>
              {!inSpanish ?
                <p>All Loan Types are Subject to Lender Approval. Your loan agreement will identify the loan issuer prior to your signing.</p>
                :
                <div>
                  <p>Dependiendo de su aprobación nosotros enviamos tu préstamo rápido y listo a los mejores tarifas.</p>
                  <p>Cada préstamo está sujeto a la aprobación del prestamista. <br />Su conexión a MunnyNest esta encriptada de forma segura.</p>
                </div>
              }
              <p className='privacyLink'><Link to='/privacy'>Privacy Policy</Link></p>
              <div className='countries'>
                <p><img src={usa}/>USA</p>
                <p><img src={canada}/>Canada</p>
              </div>
              <p>&copy; 2021 MunnyNest</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default withRouter(Footer);
