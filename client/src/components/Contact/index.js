import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';

import bg from '../../../public/resources/images/contact.jpg';

import './style.scss';

const initialState = {
  name: '',
  bizname: '',
  biztype: '',
  amount: '',
  phone: '',
  email: '',
  message: '',
  recaptcha: {
    response: '',
    hasResponse: false,
    valid: false,
    errorMessage: ''
  },
  loading: false,
  emailSuccess: false,
  emailFail: false,
  server: {
    hasError: false,
    message: ''
  }
}

const contentBgStyle = {
  background: `url(${bg}) center -110px`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

let recaptchaInstance;

class Contact extends Component {

  constructor() {
    super();

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.recaptchaLoad = this.recaptchaLoad.bind(this);
    this.recaptchaVerify = this.recaptchaVerify.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }



  recaptchaLoad() {
    console.log('recaptcha loaded...');
  }

  recaptchaVerify(response) {
    let recaptchaDiv = document.getElementById('g-recaptcha').children[0];
    let initialStyles = recaptchaDiv.getAttribute('style');

    if(response) {
      if(this.state.recaptcha.errorMessage) {
        recaptchaDiv.setAttribute('style','border: green solid 1px; border-radius: 4px; width: 304px; height: 78px');
      } else {
        recaptchaDiv.setAttribute('style','border: green solid 1px; border-radius: 4px;' + initialStyles);
      }
      this.setState({
        recaptcha: {
          response: response,
          hasResponse: true,
          errorMessage: ''
        }
      });
    } else {
      this.setState({
        recaptcha: {
          hasResponse: false,
          errorMessage: 'Please click checkbox to ensure you are human.'
        }
      });
      recaptchaDiv.setAttribute('style','border: red solid 1px; border-radius: 4px;' + initialStyles);
    }
  }

  resetRecaptcha() {
    recaptchaInstance.reset();
  };

  validate() {
    const { name, bizname, amount, phone, email } = this.state;
    if(name && bizname && amount && phone && email) {
      let phoneRegex = /^\+?\d{0,3}\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}?$/;
      let emailRegex = /\S+@\S+\.\S+/;
      return phoneRegex.test(phone) && emailRegex.test(email);
    } else {
      return false;
    }
  }

  sendEmail(e) {
    e.preventDefault();
    const that = this;
    const { name, bizname, biztype, amount, phone, email, message, emailSuccess, emailFail, recaptcha } = this.state;

    this.setState({
      emailFail: false,
      emailSuccess: false
    });

    if(recaptcha.hasResponse) {
      this.setState({ loading: true });
      fetch('/send', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          id: Math.floor(1000 + Math.random() * 9000),
          name: name,
          bizname: bizname,
          biztype: biztype,
          amount: amount,
          phone: phone,
          email: email,
          message: message,
          recaptcha: recaptcha.response
        })
      }).then(function (res){
        return res.json();
      }).then(function (data) {
        if(data.emailSent && data.verify) {
          that.setState(initialState);
          that.setState({emailSuccess: true});
        } if (!data.emailSent && data.verify) {
          that.setState(initialState);
          that.setState({emailFail: true});
        } else {
          that.setState({
            loading: false,
            server: {
              hasError: true,
              message: data.clientError
            }
          });
          document.getElementById('submitFormButton').setAttribute('disabled', 'true');
        }
        that.resetRecaptcha();
      }).catch(function (err) {
        console.log(err);
      });
    } else {
      let recaptchaDiv = document.getElementById('g-recaptcha').children[0];
      let initialStyles = recaptchaDiv.getAttribute('style');
      recaptchaDiv.setAttribute('style','border: red solid 1px; border-radius: 4px;' + initialStyles);
      that.setState({
        recaptcha: {
          hasResponse: false,
          errorMessage: 'Please click checkbox to ensure you are human.'
        }
      });
    }
  }

  render() {
    const { name, bizname, biztype, amount, phone, email, message, loading, emailSuccess, emailFail, recaptcha, server } = this.state;
    let isValid = this.validate();
    return (
      <div id='contactUsWrapper'>
        <div className='jumbotron text-center' style={contentBgStyle}>
          <div className='jumboHeader'>
            <h1 className="display-3">Contact Us</h1>
          </div>
        </div>
        <section className='contactPrompt'>
          <div className="container text-center">
            <h3>You can contact us by Phone, E-mail or both. We're here to assist and answer any questions about our company & process.</h3>
          </div>
        </section>
        <section className='contactFormSection'>
          <div className="formWrapper container">
            <div className='formInfo'>
              <span>* Required Fields</span>
            </div>
            <form id='contactForm' onSubmit={this.sendEmail.bind(this)}>
              <div className="form-group">
                <input type="text" className="form-control" id="fullName" placeholder="Full Name *" name='name'  value={name} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" id="bizName" placeholder="Business Name *" name='bizname' value={bizname} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" id="bizType" placeholder="Business Type" name='biztype' value={biztype} onChange={this.handleChange}/>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input type="number" className="form-control" id='amount' name='amount' placeholder='Amount Requested *'  value={amount} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <input type="tel" className="form-control" id="phone" placeholder="Phone Number *" name='phone'  value={phone} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <input type="email" className="form-control" id="email" placeholder="Email Address *" name='email'  value={email} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <textarea className="form-control" id="message" placeholder='Message' name='message'  value={message} onChange={this.handleChange}></textarea>
              </div>
              <Recaptcha
                ref={function (e) {return recaptchaInstance = e}}
                sitekey="6Lef-JcUAAAAAJvhCycmWC1QnWP5sLPQdhtujXiP"
                render="explicit"
                onloadCallback={this.recaptchaLoad}
                verifyCallback={this.recaptchaVerify}
              />
              {emailSuccess &&
                <div className="alert alert-success fade show text-center" role="alert">
                <strong>Your submission has been sent!</strong>
              </div>}
              {emailFail &&
                <div className="alert alert-danger fade show text-center" role="alert">
                <strong>There was a problem sending your Email. Please try again later.</strong>
              </div>}
              {server.hasError && server.message &&
                <div className="alert alert-danger fade show text-center" role="alert">
                <strong>{server.message}</strong>
              </div>}
              {!recaptcha.hasResponse && recaptcha.errorMessage &&
                <div className="alert alert-danger fade show text-center" role="alert">
                <strong>{recaptcha.errorMessage}</strong>
              </div>}
              <div className='submitButtonWrapper'>
              <button disabled={!isValid} id='submitFormButton' type="submit" className="applyButton btn btn-primary align-items-center">
                {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                Apply Now
              </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }

}

export default Contact;
