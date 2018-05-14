import React, { Component } from 'react';
import SignUpForm from '../forms/SignUpForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../../actions/auth';

class SignUpPage extends Component {

  /*
  Execute ../../actions/auth => signup() with parameters after the
  form has been submitted

  If there are no errors => redirect back to the landing page
  */
  submit = data => this.props.signup(data)
      .then(() => this.props.history.push("/"));

  render() {

    return (
        <div>
            <h1>Signup Page</h1>
            <SignUpForm submit={this.submit} />
        </div>
    );
  }
}

SignUpPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};

export default connect(null, { signup })(SignUpPage);