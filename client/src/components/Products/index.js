import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import bg from '../../../public/resources/images/loans-bg.jpg';

import './style.scss';

var contentBgStyle = {
  background: `url(${bg}) center top`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

class Products extends Component {

  render() {
    return (
      <div id='productsWrapper'>
        <div className='jumbotron text-center' style={contentBgStyle}>
          <div className='jumboHeader'>
            <h1 className="display-3">Products</h1>
          </div>
          <div className='downArrow productsDownArrow'><i className="fas fa-chevron-down"></i></div>
        </div>
        <section className='qualify2'>
          <div className="container">
            <h2>Here at MunnyNest, we're most proud of our personal & professional advisors to review your business needs and understand the nature of your business to be able to provide you with the best options available.</h2>
          </div>
        </section>
        <section className='qualify3'>
          <div className='container'>
            <h2 className='text-center'>These are the types of loans that are currently available from MunnyNest:</h2>
            <div className='typesList'>
              <div className='step'>
                <span className="fa-stack fa-3x step">
                  <i className="far fa-circle fa-stack-2x"></i>
                  <strong className="fa-stack-1x">1</strong>
                </span>
                <div className='stepPoints'>
                  <h3>Business Term Loans</h3>
                  <ul>
                    <li>6-10 Months of Re-Payment Terms</li>
                    <li>Funding as quick as 2 Business Days</li>
                  </ul>
                </div>
              </div>
              <div className='step'>
                <span className="fa-stack fa-3x step">
                  <i className="far fa-circle fa-stack-2x"></i>
                  <strong className="fa-stack-1x">2</strong>
                </span>
                <div className='stepPoints'>
                  <h3>Revenue Assurance (RA) or <br />Merchant Cash Advance (MCA)</h3>
                  <ul>
                    <li>Lump Sum Advance based on Future Revenues</li>
                    <li>Higher Cost $$$</li>
                  </ul>
                </div>
              </div>
              <div className='step'>
                <span className="fa-stack fa-3x step">
                  <i className="far fa-circle fa-stack-2x"></i>
                  <strong className="fa-stack-1x">3</strong>
                </span>
                <div className='stepPoints'>
                  <h3>Business Line of Credit</h3>
                  <ul>
                    <li>Requires a minimum 680 FICO Credit Score</li>
                    <li>Full-Access to Funds/Capital as you need</li>
                    <li>Interest accrued on the amount used</li>
                  </ul>
                </div>
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

export default Products;
