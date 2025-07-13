import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  // This holds all form data and app state
  state = {
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    ssn: '',
    email: '',
    dateOfBirth: '',

    showResult: false,
    resultMessage: ''
  };

  // This runs every time someone types in a form field
  handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.setState({ [fieldName]: fieldValue });
  };

  // This runs when someone clicks "Submit Application"
  handleSubmit = (event) => {
    event.preventDefault(); // Stops the page from refreshing

    // For now, just show a success message. Connecting to Alloy API later.
    this.setState({
      showResult: true,
      resultMessage: 'Application submitted successfully!'
    });
  };

  // This runs when someone clicks "Start Over"
  startOver = () => {
    this.setState({
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      ssn: '',
      email: '',
      dateOfBirth: '',
      showResult: false,
      resultMessage: ''
    });
  };

  render() {
    // If we're showing results, show the result page
    if (this.state.showResult) {
      return (
        <div>
          <h1>Thank You!</h1>
          <p>{this.state.resultMessage}</p>
          <button onClick={this.startOver}>Submit Another Application</button>
        </div>
      );
    }

    // Otherwise, show the form
    return (
      <div>
        <h1>Bank Account Application</h1>

        <form onSubmit={this.handleSubmit}>

          <p>
            <label>First Name:</label><br />
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <label>Last Name:</label><br />
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <label>Address Line 1:</label><br />
            <input
              type="text"
              name="addressLine1"
              value={this.state.addressLine1}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <label>Address Line 2 (optional):</label><br />
            <input
              type="text"
              name="addressLine2"
              value={this.state.addressLine2}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <label>City:</label><br />
            <input
              type="text"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <label>State (i.e. NY or CA):</label><br />
            <input
              type="text"
              name="state"
              value={this.state.state}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <label>Zip Code:</label><br />
            <input
              type="text"
              name="zipCode"
              value={this.state.zipCode}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <label>Social Security Number (9 digits):</label><br />
            <input
              type="text"
              name="ssn"
              value={this.state.ssn}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <label>Email:</label><br />
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <label>Date of Birth:</label><br />
            <input
              type="date"
              name="dateOfBirth"
              value={this.state.dateOfBirth}
              onChange={this.handleChange}
            />
          </p>

          <p>
            <button type="submit">Submit Application</button>
          </p>

        </form>
      </div>
    );
  }
}
