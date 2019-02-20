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
      isNameValid: false,
      isLoading: false
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
      'blankEmail': '*Email cannot be blank.',
      'invalidEmail': '*Please enter a valid email.'
    }
    if (!isEmailValid) {
      if (this.state.email.length === 0) {
        errors.push(`${errorMessages['blankEmail']}`);
      } else {
        errors.push(`${errorMessages['invalidEmail']}`);
      }
    }

    this.setState(
      { isEmailValid: isEmailValid, errors: errors},
      () => {
        console.log('CURRENT STATE AFTER PRESSING NEXT: ', this.state);
        console.log('IS EMAIL VALID? ', isEmailValid);
      }
    );
  }

  validateName(e) {
    e.preventDefault();
    const re = /[A-Z]/i;
    const isNameValid = re.test(String(this.state.firstName)) && re.test(String(this.state.lastName));
    const errors = [];
    const errorMessages = {
      'firstName': '*First name cannot be blank.',
      'lastName': '*Last name cannot be blank.',
      'empty': '*Please enter a first and last name.',
      'fullName': '*Please enter a valid first and last name.',
    };

    if (!isNameValid) {
      if (this.state.firstName.length === 0 && this.state.lastName.length === 0) {
        errors.push(`${errorMessages['empty']}`);
      } else if (this.state.firstName.length === 0) {
        errors.push(`${errorMessages['firstName']}`);
      } else if (this.state.lastName.length === 0){
        errors.push(`${errorMessages['lastName']}`);
      } else {
        errors.push(`${errorMessages['fullName']}`);
      }
    }

    this.setState(
      { isNameValid: isNameValid, errors: errors },
      () => {
        console.log('CURRENT STATE AFTER PRESSING SIGN UP: ', this.state);
        console.log('IS NAME VALID? ', isNameValid);
      }
    );
  }

  renderHeader() {
    // depending on state, renders header text
    const title = (!this.state.isEmailValid || !this.state.isNameValid) ? 'Join the list' : 'congratulations!';

    return (
      <div className="newsletter-header">
        <h3 className="newsletter-title">{ title }</h3>
      </div>
    )
  }

  renderSubtitle() {
    const subtitleMessages = {
      'invalidEmail': `${'Sign up for the TLC Newsletter'.toUpperCase()}`,
      'invalidName': `${'Almost done! Please enter your first and last name.'.toUpperCase()}`
    };

    const subtitle = (!this.state.isEmailValid && !this.state.isNameValid) ? subtitleMessages['invalidEmail']
    : (this.state.isEmailValid && !this.state.isNameValid) ? subtitleMessages['invalidName']
    : '';

    return (
      <p className="newsletter-subtitle">{ subtitle }</p>
    )
  }

  renderInputs() {
    // depending on state, renders either email input or first/last name inputs
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
      <div className="input-wrapper">
        {inputElements}
      </div>
    )
  }

  renderButton() {
    if (this.state.loading) {
      return (
          <PulseLoader
        className="loading-dots"
        sizeUnit={"px"}
        size={12}
        color={'#008489'}
      />

      )
    }
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
    console.log('IS EMAIL VALID? ', this.state);
    console.log('IS NAME VALID? ', this.state);
    console.log('THIS.STATE (submitted): ', this.state);
  }

  renderPostSubmitMessage() {
    if (this.state.isEmailValid && this.state.isNameValid) {
      console.log('SUBMIT CLICKED');
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
            {!this.state.isEmailValid &&
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

export default SignupForm;
