import React, { Component } from 'react';

import bg from '../../../public/resources/images/loans.jpg';

import './style.scss';

var contentBgStyle = {
  background: `url(${bg}) center -190px`,
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
        </div>
      </div>
    );
  }

}

export default Products;
