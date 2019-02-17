import React from 'react';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
    };
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('SUBMIT CLICKED');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="text"
              value={this.state.email}
              onChange={this.update('email')}
              className=""
              placeholder="enter email address"
              />
          </label>
          <input className="btn-submit" type="submit" value="Next" />
        </form>
      </div>
    )
  }
}

export default SignupForm;
