import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import PropTypes from 'prop-types';

import InlineError from '../messages/InlineError';

class SignUpForm extends Component {
  //define local state (this.state)
  state = {
      data: {
          email: '',
          password: ''
      },
      loading: false,
      errors: {}
  }

  //update this.state.data while typing in form fields
  onChange = e => this.setState({
      ...this.state, 
      data: {...this.state.data, [e.target.name]: e.target.value}
    });

  //form onSubmit
  onSubmit = e => {
    e.preventDefault();
    //local validation
    const errors = this.validate(this.state.data);
    //update errors in local state
    this.setState({ errors });
    //verify if errors exist
    if(Object.keys(errors).length === 0){
      this.setState({ loading: true });
      //get submit function from props and execute it
      this.props
        .submit(Object.assign(this.state.data))
        .catch(err => {
            //add 404 response of api request to errors in local state
            this.setState({ errors: err.response.data.errors, loading: false });
            }    
        );
    }
  };

  //local validation function
  validate = (data) => {
    const errors = {};
    if(!isEmail(data.email)) errors.email = "Invalid email!";
    if(!data.password) errors.password = "Can't be blank!";
    return errors;
  }

  render() {
    const { data, errors, loading } = this.state;
    return (
        //signup form
        <Form onSubmit={this.onSubmit} loading={loading}>
            { errors.global && (
                <Message negative>
                    <Message.Header>Something went wrong!</Message.Header>
                    <p>{errors.global}</p>
                </Message>
            )}
            <Form.Field error={!!errors.email}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@example.com"
                    value={data.email}
                    onChange={this.onChange}
                />
                {errors.email && <InlineError text={errors.email} />}
            </Form.Field>

            <Form.Field error={!!errors.password}>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Secure password"
                    value={data.password}
                    onChange={this.onChange}
                />
                {errors.password && <InlineError text={errors.password} />}
            </Form.Field>

            <Button primary>Sign Up</Button>
        </Form>
    );
  }
}

SignUpForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default SignUpForm;