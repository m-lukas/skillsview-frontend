import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import InlineError from '../messages/InlineError';

class JoinProjectForm extends Component {
  //define local state (this.state)
  state = {
      data: {
          first_name: '',
          last_name: '',
          email: '',
          skills: ''
      },
      loading: false,
      errors: {}
  }

  //update this.state.data while typing in form fields
  onChange = e => {
      this.setState({
        ...this.state, 
        data: {...this.state.data, [e.target.name]: e.target.value}
      });
    }

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
      //get submit function from props and trigger it
      this.props
        .submit(Object.assign(this.state.data, { token: localStorage.skillboardJWT, projectid: this.props.projectid } ))
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
    if(!data.first_name) errors.first_name = "You don't remember your first name?!";
    if(!data.last_name) errors.last_name = "Come on, you know your last name ...";
    if(!data.email) errors.email = "It's just your email ...";
    if(!data.skills) errors.skills = "Well, everybody has unique skills.";
    return errors;
  }

  render() {
    const { data, errors, loading } = this.state;
    return (
        //join form
        <Form onSubmit={this.onSubmit} loading={loading}>
            { errors.global && (
                <Message negative>
                    <Message.Header>Something went wrong!</Message.Header>
                    <p>{errors.global}</p>
                </Message>
            )}
            <Form.Field error={!!errors.first_name}>
                <label>Firstname</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="Max"
                    value={data.first_name}
                    onChange={this.onChange}
                />
                { errors.first_name && <InlineError text={errors.first_name}/> }
            </Form.Field>
            <Form.Field error={!!errors.last_name}>
                <label>Lastname</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder="Mustermann"
                    value={data.last_name}
                    onChange={this.onChange}
                />
                { errors.last_name && <InlineError text={errors.last_name}/> }
            </Form.Field>
            <Form.Field error={!!errors.email}>
                <label>Mail-Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@example.com"
                    value={data.email}
                    onChange={this.onChange}
                />
                { errors.email && <InlineError text={errors.email}/> }
            </Form.Field>
            <Form.Field error={!!errors.skills}>
                <label>Your skills</label>
                <input
                    type="text"
                    id="skills"
                    name="skills"
                    placeholder="..., ..., ..."
                    value={data.skills}
                    onChange={this.onChange}
                />
                { errors.skills && <InlineError text={errors.skills}/> }
            </Form.Field>
            <Button primary>Join</Button>
        </Form>
    );
  }
}

JoinProjectForm.propTypes = {
  submit: PropTypes.func.isRequired,
  projectid: PropTypes.string.isRequired
}

export default JoinProjectForm;