import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Recaptcha from 'react-recaptcha';

import bg from '../../../public/resources/images/jumbo-bg.jpg';

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

var jumboBgStyle = {
  background: `url(${bg}) center -5px`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

let recaptchaInstance;

class Spanish extends Component {

  constructor() {
    super();

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.recaptchaLoad = this.recaptchaLoad.bind(this);
    this.recaptchaVerify = this.recaptchaVerify.bind(this);
    this.scrollToForm = this.scrollToForm.bind(this);
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
          errorMessage: 'Por favor, haga clic en la casilla de verificación para asegurarse de que eres humano.'
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
          recaptcha: recaptcha.response,
          spanish: true
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
          errorMessage: 'Por favor, haga clic en la casilla de verificación para asegurarse de que eres humano.'
        }
      });
    }
  }

  scrollToForm() {
    document.getElementById('spanishApplicationForm').scrollIntoView(true);
    window.scrollBy(0, -70);
  }

  render() {
    const { name, bizname, biztype, amount, phone, email, message, loading, emailSuccess, emailFail, recaptcha, server } = this.state;
    let isValid = this.validate();
    return (
      <div id='homeWrapper'>
        <div className='jumbotron text-center' style={jumboBgStyle}>
          <div className='jumboHeader'>
            <h1 className="display-4">Nosotros ayudamos cuando el proceso de préstamo bancario no puede</h1>
          </div>
          <div className='mainButton'>
            <button type="button" className="applyButton cta btn btn-primary" onClick={this.scrollToForm}>Empezar</button>
          </div>
          <div className='downArrow'><i className="fas fa-chevron-down"></i></div>
        </div>
        <section id='secondaryHeaderSection'>
          <div className="container text-center">
            <h2>
              Nuestra misión en MunnyNest es ayudar a tu negocio a darle los servicios necesarios para encontrar el préstamo perfecto, dependiendo del tipo de negocio y en que plazo desea iniciarlo.
            </h2>
          </div>
        </section>
        <section>
          <div className='container'>
            <div className='row noInfo'>
              <div className='col-md-4 col-sm-12 text-center align-self-center'>
                <i className="fab fa-creative-commons-nc fa-6x"></i>
              </div>
              <div className='col-md-8 col-sm-12'>
                <h3>
                  No hay NINGÚN cargo para aplicaciones, no depósitos y ningún colateral necesario para aplicar.
                </h3>
              </div>
            </div>
          </div>
        </section>
        <section id='spanishTypes'>
          <div className='container'>
            <h2 className='text-center'>Tipo de préstamos disponibles en MunnyNest:</h2>
            <div className='bulletPoints'>
              <ul>
                <li>Líneas de credito</li>
                <li>Anticipos de ingresos</li>
                <li>Líneas de crédito comercial</li>
              </ul>
            </div>
          </div>
        </section>
        <section id='spanishQualify'>
          <div className='container'>
            <h2 className='text-center'>Para calificar</h2>
            <div className='bulletPoints'>
              <ul>
                <li>Mínimo 3 meses en operación de su negocio</li>
                <li>Crédito mínimo de 500 para arriba</li>
                <li>Prueba de $10,000 en ingresos y depósitos mensualmente</li>
              </ul>
            </div>
          </div>
        </section>
        <section id="ctaSection" className='spanishCtaSection'>
          <h2>!COMIENZA Y APLICA HOY!</h2>
          <i className="fas fa-chevron-down spanishCta"></i>
        </section>
        <section id='spanishApplicationForm' className='contactFormSection'>
          <h2>Aplicación</h2>
          <div className="formWrapper container">
            <div className='formInfo'>
              <span>* Obligatorio</span>
            </div>
            <form id='contactForm' onSubmit={this.sendEmail.bind(this)}>
              <div className="form-group">
                <input type="text" className="form-control" id="fullName" placeholder="Nombre de Aplicante *" name='name'  value={name} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" id="bizName" placeholder="Nombre de Negocio *" name='bizname' value={bizname} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <input type="text" className="form-control" id="bizType" placeholder="Tipo de Negocio" name='biztype' value={biztype} onChange={this.handleChange}/>
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input type="number" className="form-control" id='amount' name='amount' placeholder='Cantidad de Dinero o Crédito Requerido *'  value={amount} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <input type="tel" className="form-control" id="phone" placeholder="Número de Teléfono *" name='phone'  value={phone} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <input type="email" className="form-control" id="email" placeholder="Correo Electrónico *" name='email'  value={email} onChange={this.handleChange}/>
              </div>
              <div className="form-group">
                <textarea className="form-control" id="message" placeholder='Mensaje si aplica' name='message'  value={message} onChange={this.handleChange}></textarea>
              </div>
              <Recaptcha
                ref={function (e) {return recaptchaInstance = e}}
                sitekey="6Lef-JcUAAAAAJvhCycmWC1QnWP5sLPQdhtujXiP"
                render="explicit"
                hl={'es'}
                onloadCallback={this.recaptchaLoad}
                verifyCallback={this.recaptchaVerify}
              />
              {emailSuccess &&
                <div className="alert alert-success fade show text-center" role="alert">
                  <strong>Su envío ha sido enviado!</strong>
                </div>}
              {emailFail &&
                <div className="alert alert-danger fade show text-center" role="alert">
                  <strong>Hubo un problema al enviar su correo electrónico. Por favor, inténtelo de nuevo más tarde.</strong>
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
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }

}

export default Spanish;
