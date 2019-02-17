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
    console.log('isNameValid BOOLEAN: ', isNameValid);
    console.log('IS BLANK AS FIRST NAME VALID?', this.state.firstName.match(/[A-Z]/i));
    console.log('IS BLANK AS LAST NAME VALID?', this.state.lastName.match(/[A-Z]/i));
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
    const headerText = (!this.state.isEmailValid && !this.state.isNameValid) ? 'Sign up for the TLC Newsletter.'.toUpperCase()
                    : (this.state.isEmailValid && !this.state.isNameValid) ? 'Almost done! Please enter your first and last name.'.toUpperCase()
                    : 'Thank you for signing up!';

    return (
      <h1>{ headerText }</h1>
    )
  }

  renderInputs() {
    // depending on state, renders either email input or first/last name inputs
    let inputElements;
    if (!this.state.isEmailValid && !this.state.isNameValid) {
      inputElements = (
        <label>
          <input
            type="text"
            value={this.state.email}
            onChange={this.update('email')}
            className=""
            placeholder="enter email address"
            />
        </label>
      )
    } else if (this.state.isEmailValid && !this.state.isNameValid) {
      inputElements = (
        <div>
          <label>
            <input
              type="text"
              value={this.state.firstName}
              onChange={this.update('firstName')}
              className=""
              placeholder="First Name"
              />
          </label>
          <br />
          <label>
            <input
              type="text"
              value={this.state.lastName}
              onChange={this.update('lastName')}
              className=""
              placeholder="Last Name"
              />
          </label>
        </div>
      )
    }

    return (
      <div>
        {inputElements}
        <div className="errors-container">
          {this.renderErrors()}
        </div>
      </div>
    )
  }

  renderButton() {
    // depending on state, renders button text or successful signup text (not sure if this should be placed here or elsewhere)
    const buttonText = (!this.state.isEmailValid && !this.state.isNameValid) ? 'Next'.toUpperCase()
                      : (this.state.isEmailValid && !this.state.isNameValid) ? 'Sign Up'.toUpperCase()
                      : '';

    // depending on state, renders validate handler
    const validateHandler = (!this.state.isEmailValid && !this.state.isNameValid) ? this.validateEmail
                          : (this.state.isEmailValid && !this.state.isNameValid) ? this.validateName
                          : '';

    return (
      <input
        type="submit"
        value={ buttonText }
        onClick={ validateHandler }
        className="btn-submit"
      />
    )
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

  render() {
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          {this.renderHeader()}
          {this.renderInputs()}
          {!this.state.isEmailValid &&
            <div>
              <input
                type="checkbox"
                value="policy"
                onChange={ () => console.log('Checked!') }
              />
              <p>I agree to receive information from Discovery Communications in accordance with the following <a href="google.com">Privacy Policy</a>
              </p>
            </div>
          }
          {this.renderButton()}
        </form>
        {
          this.state.isEmailValid && this.state.isNameValid &&
          <p>Look out for the latest news on your favorite shows.</p>
        }
      </div>
    )
  }
}

export default SignupForm;
