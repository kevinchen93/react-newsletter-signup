import React, { Component } from 'react';

export default class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      errors: [],
      isEmailValid: false,
      isNameValid: false,
      isLoading: false
    };
  }

  update = (field) => {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  validateEmail = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmailValid = re.test(String(email));
    const errors = [];
    const errorMessages = {
      'blankEmail': 'Email cannot be blank.',
      'invalidEmail': 'Please enter a valid email.'
    }
    if (!isEmailValid) {
      if (!email) {
        errors.push(`${errorMessages['blankEmail']}`);
      } else {
        errors.push(`${errorMessages['invalidEmail']}`);
      }
    }

    this.setState(
      { isEmailValid, errors },
      () => {
        console.log('CURRENT STATE AFTER PRESSING NEXT: ', this.state);
        console.log('IS EMAIL VALID? ', isEmailValid);
      }
    );
  }

  validateName = (e) => {
    e.preventDefault();
    const { firstName, lastName } = this.state;
    const re = /[A-Z]/i;
    const isNameValid = re.test(String(firstName)) && re.test(String(lastName));
    const errors = [];
    const errorMessages = {
      'firstName': 'First name cannot be blank.',
      'lastName': 'Last name cannot be blank.',
      'empty': 'Please enter a first and last name.',
      'fullName': 'Please enter a valid first and last name.',
    };

    if (!isNameValid) {
      if (!firstName && !lastName) {
        errors.push(`${errorMessages['empty']}`);
      } else if (!firstName) {
        errors.push(`${errorMessages['firstName']}`);
      } else if (!lastName){
        errors.push(`${errorMessages['lastName']}`);
      } else {
        errors.push(`${errorMessages['fullName']}`);
      }
    }

    this.setState(
      { isNameValid, errors },
      () => {
        console.log('CURRENT STATE AFTER PRESSING SIGN UP: ', this.state);
        console.log('IS NAME VALID? ', isNameValid);
      }
    );
  }

  renderHeader() {
    const { isEmailValid, isNameValid } = this.state
    const title = (!isEmailValid || !isNameValid) ? 'Join the list' : 'congratulations!';

    return (
      <div className="newsletter-header">
        <h3 className="newsletter-title">{ title }</h3>
      </div>
    )
  }

  renderSubtitle() {
    const { isEmailValid, isNameValid } = this.state;
    const subtitleMessages = {
      'invalidEmail': `${'Sign up for the TLC Newsletter'.toUpperCase()}`,
      'invalidName': `${'Almost done! Please enter your first and last name.'.toUpperCase()}`
    };

    const subtitle = (!isEmailValid && !isNameValid) ? subtitleMessages['invalidEmail']
    : (isEmailValid && !isNameValid) ? subtitleMessages['invalidName']
    : '';

    return (
      <p className="newsletter-subtitle">{ subtitle }</p>
    )
  }

  renderInputs() {
    const { email, firstName, lastName, isEmailValid, isNameValid } = this.state;
    const inputElements = (!isEmailValid && !isNameValid) ?
      (
        <div className="input-container">
          <input
            type="text"
            value={email}
            onChange={this.update('email')}
            className=""
            placeholder="enter email address"
            />
        </div>
      ) : (isEmailValid && !isNameValid) ?
      (
        <div className="input-container">
            <input
              type="text"
              value={firstName}
              onChange={this.update('firstName')}
              className="first-name"
              placeholder="First Name"
              />
            <input
              type="text"
              value={lastName}
              onChange={this.update('lastName')}
              className="last-name"
              placeholder="Last Name"
              />
        </div>
      ) : null;

    return (
      <div className="input-wrapper">
        {inputElements}
      </div>
    )
  }

  renderButton() {
    const { isEmailValid, isNameValid } = this.state;
    return (!isEmailValid) ?
      (
        <input
          type="submit"
          value="NEXT"
          onClick={ this.validateEmail }
          className="btn-submit"
        />
      ) : (isEmailValid && !isNameValid) ?
      (
        <input
          type="submit"
          value="SIGN UP"
          onClick={ this.validateName }
          className="btn-submit"
        />
      ) : null;
  }

  renderErrors() {
    return (
      <ul>
        {this.state.errors.map((error, i) => (
          <li key={`error-${i}`}>
            <i className="fas fa-exclamation-triangle"></i> {error}
          </li>
        ))}
      </ul>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('SUBMIT CLICKED');
  }

  renderPostSubmitMessage() {
    const { isEmailValid, isNameValid } = this.state;
    if (isEmailValid && isNameValid) {
      console.log('CONGRATULATIONS');
      console.log('THIS.STATE (submitted): ', this.state);

      return (
        <div className="postSubmitMessage-container">
          <p className="success-message">Thank You For Signing Up!</p>
          <p className="rela-inline newsletter-subtext">Look out for the latest news on your favorite shows.</p>
        </div>
      )
    } else {
        return null;
    }
  }

  render() {
    const { isEmailValid } = this.state;
    return (
      <div className="newsletter-container">
          {this.renderHeader()}
          <div className="newsletter-content">
            {this.renderSubtitle()}
            <form className="newsletter-form" onSubmit={ this.handleSubmit }>
              <fieldset className="newsletter-fieldset">
                {this.renderInputs()}
                <div className="form-action-wrapper">
                  {this.renderButton()}
                </div>
                {this.renderPostSubmitMessage()}
              </fieldset>
            </form>
            <div className="errors-container">
              {this.renderErrors()}
            </div>
            {!isEmailValid &&
              <div className="rela-inline form-notifications-container">
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    value="policy"
                    className=""
                    onChange={ () => console.log('Checkbox checked!') }
                    />
                  <p className="rela-inline">I agree to receive information from Discovery Communications in accordance with the following <a href="https://corporate.discovery.com/privacy-policy/">Privacy Policy</a></p>
                </div>
              </div>
            }
          </div>
      </div>
    )
  }
}
