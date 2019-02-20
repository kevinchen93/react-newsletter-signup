import React from 'react';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      errors: [],
      isEmailValid: false,
      isNameValid: false
    };

    this.update = this.update.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateName = this.validateName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  validateEmail(e) {
    e.preventDefault();
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmailValid = re.test(String(this.state.email));
    const errors = [];
    const errorMessages = {
      'invalidEmail': 'Email cannot be blank.',
      'validEmail': 'Please enter a valid email.'
    }
    if (!isEmailValid) {
      if (this.state.email.length === 0) {
        errors.push(`${errorMessages['invalidEmail']}`);
      } else {
        errors.push(`${errorMessages['validEmail']}`);
      }
    }

    this.setState(
      { isEmailValid: isEmailValid, errors: errors},
      () => console.log('CURRENT STATE AFTER PRESSING NEXT: ', this.state)
    );
  }

  validateName(e) {
    e.preventDefault();
    const re = /[A-Z]/i;
    const isNameValid = re.test(String(this.state.firstName)) && re.test(String(this.state.lastName));
    const errors = [];
    const errorMessages = {
      'firstName': 'First name cannot be blank.',
      'lastName': 'Last name cannot be blank.',
      'fullName': 'Please enter a valid first and last name.',
    };

    if (!isNameValid) {
      if (this.state.firstName.length === 0) {
        errors.push(`${errorMessages['firstName']}`);
      } else if (this.state.lastName.length === 0){
        errors.push(`${errorMessages['lastName']}`);
      } else {
        errors.push(`${errorMessages['fullName']}`);
      }
    }

    this.setState(
      { isNameValid: isNameValid, errors: errors},
      () => console.log('CURRENT STATE AFTER PRESSING SIGN UP: ', this.state)
    );
  }

  renderHeader() {
    // depending on state, renders header text
    const headerMessages = {
      'invalidEmail': `${'Sign up for the TLC Newsletter.'.toUpperCase()}`,
      'invalidName': `${'Almost done! Please enter your first and last name.'.toUpperCase()}`,
    };

    const firstHeader = (!this.state.isEmailValid || !this.state.isNameValid) && 'Join the list' || 'congratulations';

    return (
      <div className="newsletter-header">
        <h3 className="newsletter-title">{ firstHeader }</h3>
      </div>
    )
  }

  renderInputs() {
    // depending on state, renders either email input or first/last name inputs
    const headerMessages = {
      'invalidEmail': `${'Sign up for the TLC Newsletter'.toUpperCase()}`,
      'invalidName': `${'Almost done! Please enter your first and last name.'.toUpperCase()}`
    };

    const subtitle = (!this.state.isEmailValid && !this.state.isNameValid) ? headerMessages['invalidEmail']
                    : (this.state.isEmailValid && !this.state.isNameValid) ? headerMessages['invalidName']
                    : '';

    const inputElements = (!this.state.isEmailValid && !this.state.isNameValid) ?
      (
        <div className="input-container">
          <input
            type="text"
            value={this.state.email}
            onChange={this.update('email')}
            className=""
            placeholder="enter email address"
            />
        </div>
      ) : (this.state.isEmailValid && !this.state.isNameValid) ?
      (
        <div className="input-container">
            <input
              type="text"
              value={this.state.firstName}
              onChange={this.update('firstName')}
              className="first-name"
              placeholder="First Name"
              />
            <input
              type="text"
              value={this.state.lastName}
              onChange={this.update('lastName')}
              className="last-name"
              placeholder="Last Name"
              />
        </div>
      ) : null;

    return (
      <div>
        <p className="newsletter-subtitle">{ subtitle }</p>
        {inputElements}
        <div className="errors-container">
          {this.renderErrors()}
        </div>
      </div>
    )
  }

  renderButton() {
    return (!this.state.isEmailValid) ?
      (
        <input
          type="submit"
          value="NEXT"
          onClick={ this.validateEmail }
          className="btn-submit"
        />
      ) : (this.state.isEmailValid && !this.state.isNameValid) ?
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
            {error}
          </li>
        ))}
      </ul>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('SUBMIT CLICKED');
    console.log('THIS.STATE (submitted): ', this.state);
  }

  renderPostSubmitMessage() {
    return (this.state.isEmailValid && this.state.isNameValid) ?
      (
        <div className="postSubmitMessage-container">
          <p className="success-message">Thank You For Signing Up!</p>
          <p className="rela-inline newsletter-subtext">Look out for the latest news on your favorite shows.</p>
        </div>
      ) : null
  }

  render() {
    return (
      <div className="newsletter-container">
          {this.renderHeader()}
          <div className="newsletter-content">
            <form className="newsletter-form" onSubmit={ this.handleSubmit }>
              <fieldset className="newsletter-fieldset">
                {this.renderInputs()}
                {this.renderButton()}
                {this.renderPostSubmitMessage()}
              </fieldset>
              {!this.state.isEmailValid &&
                <div className="rela-inline checkbox-container">
                  <input
                    type="checkbox"
                    value="policy"
                    className=""
                    onChange={ () => console.log('Checkbox checked!') }
                    />
                  <p className="rela-inline">I agree to receive information from Discovery Communications in accordance with the following <a href="https://corporate.discovery.com/privacy-policy/">Privacy Policy</a></p>
                </div>
              }
            </form>
          </div>
      </div>
    )
  }
}

export default SignupForm;
