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
      'successfulSignUp': 'Thank You For Signing Up!',
    };

    const firstHeader = (this.state.isEmailValid && this.state.isNameValid) ? 'congratulations' : 'Join the list';
    const secondHeader = (!this.state.isEmailValid && !this.state.isNameValid) ? headerMessages['invalidEmail']
                    : (this.state.isEmailValid && !this.state.isNameValid) ? headerMessages['invalidName']
                    : headerMessages['successfulSignUp'];
    return (
      <div className="form-header">
        <h1 className="first-header abs-center">{ firstHeader }</h1>
        <h1 className="second-header">{ secondHeader }</h1>
      </div>
    )
  }

  renderInputs() {
    // depending on state, renders either email input or first/last name inputs
    const inputElements = (!this.state.isEmailValid && !this.state.isNameValid) ?
      (
        <div className="input-container">
          <label>
            <input
              type="text"
              value={this.state.email}
              onChange={this.update('email')}
              className=""
              placeholder="enter email address"
              />
          </label>
        </div>
      ) : (this.state.isEmailValid && !this.state.isNameValid) ?
      (
        <div className="input-container">
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
      ) : null;

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
    return (!this.state.isEmailValid) ?
      (
        <input
          type="submit"
          value="Next"
          onClick={ this.validateEmail }
          className="btn-submit"
        />
      ) : (this.state.isEmailValid && !this.state.isNameValid) ?
      (
        <input
          type="submit"
          value="Sign Up"
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

  render() {
    return (
      <div className="form-container">
        <div className="gutter-container">
          <form className="signup-form" onSubmit={ this.handleSubmit }>
            {this.renderHeader()}
            {this.renderInputs()}
            {this.renderButton()}
            {!this.state.isEmailValid &&
              <div className="rela-inline checkbox-container">
                <input
                  type="checkbox"
                  value="policy"
                  className=""
                  onChange={ () => console.log('Checked!') }
                  />
                <p className="rela-inline">I agree to receive information from Discovery Communications in accordance with the following <a href="google.com">Privacy Policy</a>
              </p>
            </div>
          }
        </form>
        {this.state.isEmailValid && this.state.isNameValid &&
          <p className="rela-inline">Look out for the latest news on your favorite shows.</p>
        }
        </div>
      </div>
    )
  }
}

export default SignupForm;
