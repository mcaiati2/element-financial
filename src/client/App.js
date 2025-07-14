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
    resultMessage: '',
    errors: {}
  };

  // Simple validation function
  validateForm = () => {
    const errors = {};

    // Check if required fields are filled
    if (!this.state.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!this.state.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!this.state.addressLine1.trim()) {
      errors.addressLine1 = 'Address is required';
    }
    if (!this.state.city.trim()) {
      errors.city = 'City is required';
    }
    if (!this.state.state.trim()) {
      errors.state = 'State is required';
    }
    if (!this.state.zipCode.trim()) {
      errors.zipCode = 'Zip code is required';
    }
    if (!this.state.ssn.trim()) {
      errors.ssn = 'Social Security Number is required';
    }
    if (!this.state.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!this.state.dateOfBirth.trim()) {
      errors.dateOfBirth = 'Date of birth is required';
    }

    // Basic format checks
    if (this.state.email && !this.state.email.includes('@')) {
      errors.email = 'Please enter a valid email';
    }
    if (this.state.ssn && this.state.ssn.replace(/[^0-9]/g, '').length !== 9) {
      errors.ssn = 'SSN must be 9 digits';
    }
    if (this.state.zipCode && this.state.zipCode.replace(/[^0-9]/g, '').length !== 5) {
      errors.zipCode = 'Zip code must be 5 digits';
    }

    return errors;
  };

  // This runs every time someone types in a form field
  handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.setState({ [fieldName]: fieldValue });
  };

  // This runs when someone clicks "Submit Application"
  handleSubmit = async (event) => {
    event.preventDefault(); // Stops the page from refreshing

    // Check for validation errors
    const errors = this.validateForm();
    this.setState({ errors });

    // If there are errors, don't submit
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Send the form data to our backend
    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          addressLine1: this.state.addressLine1,
          addressLine2: this.state.addressLine2,
          city: this.state.city,
          state: this.state.state,
          zipCode: this.state.zipCode,
          ssn: this.state.ssn,
          email: this.state.email,
          dateOfBirth: this.state.dateOfBirth
        })
      });

      const result = await response.json();

      // Show different messages based on Alloy's response
      let message = '';
      if (result.outcome === 'Approved') {
        message = 'Congratulations! Your application has been approved!';
      } else if (result.outcome === 'Denied') {
        message = 'Sorry, your application was not successful.';
      } else if (result.outcome === 'Manual Review') {
        message = 'Thanks for applying! We\'ll review and be in touch shortly.';
      } else {
        message = 'Application submitted successfully!';
      }

      this.setState({
        showResult: true,
        resultMessage: message
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      this.setState({
        showResult: true,
        resultMessage: 'Error submitting application. Please try again.'
      });
    }
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
      resultMessage: '',
      errors: {}
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
        <h1>Element Financial</h1>

        <form onSubmit={this.handleSubmit}>

          <p>
            <label>First Name:</label><br />
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            {this.state.errors.firstName && <div style={{ color: 'red', fontSize: '14px' }}>{this.state.errors.firstName}</div>}
          </p>

          <p>
            <label>Last Name:</label><br />
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            {this.state.errors.lastName && <div style={{ color: 'red', fontSize: '14px' }}>{this.state.errors.lastName}</div>}
          </p>

          <p>
            <label>Address Line 1:</label><br />
            <input
              type="text"
              name="addressLine1"
              value={this.state.addressLine1}
              onChange={this.handleChange}
            />
            {this.state.errors.addressLine1 && <div style={{ color: 'red', fontSize: '14px' }}>{this.state.errors.addressLine1}</div>}
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
            {this.state.errors.city && <div style={{ color: 'red', fontSize: '14px' }}>{this.state.errors.city}</div>}
          </p>

          <p>
            <label>State (i.e. NY or CA):</label><br />
            <input
              type="text"
              name="state"
              value={this.state.state}
              onChange={this.handleChange}
            />
            {this.state.errors.state && <div style={{ color: 'red', fontSize: '14px' }}>{this.state.errors.state}</div>}
          </p>

          <p>
            <label>Zip Code:</label><br />
            <input
              type="text"
              name="zipCode"
              value={this.state.zipCode}
              onChange={this.handleChange}
            />
            {this.state.errors.zipCode && <div style={{ color: 'red', fontSize: '14px' }}>{this.state.errors.zipCode}</div>}
          </p>

          <p>
            <label>Social Security Number (9 digits):</label><br />
            <input
              type="text"
              name="ssn"
              value={this.state.ssn}
              onChange={this.handleChange}
            />
            {this.state.errors.ssn && <div style={{ color: 'red', fontSize: '14px' }}>{this.state.errors.ssn}</div>}
          </p>

          <p>
            <label>Email:</label><br />
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {this.state.errors.email && <div style={{ color: 'red', fontSize: '14px' }}>{this.state.errors.email}</div>}
          </p>

          <p>
            <label>Date of Birth:</label><br />
            <input
              type="date"
              name="dateOfBirth"
              value={this.state.dateOfBirth}
              onChange={this.handleChange}
            />
            {this.state.errors.dateOfBirth && <div style={{ color: 'red', fontSize: '14px' }}>{this.state.errors.dateOfBirth}</div>}
          </p>

          <p>
            <button type="submit">Submit Application</button>
          </p>

        </form>
      </div>
    );
  }
}
