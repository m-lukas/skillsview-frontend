import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import InlineError from '../messages/InlineError';

class CreateProjectForm extends Component {

  //define local state (this.state)
  state = {
      data: {
          projectname: '',
          description: ''
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
        .submit(this.state.data, { projectid: this.state.data.projectname, createdBy: localStorage.skillboardJWT })
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
    if(!data.projectname) errors.projectname = "Can't be blank!";
    return errors;
  }

  /*
  //verify if projectid exists
  vertifyID = projectname => {
      return projectname
  }*/

  render() {
    const { data, errors, loading } = this.state;
    return (
        //create project form
        <Form onSubmit={this.onSubmit} loading={loading}>
            { errors.global && (
                <Message negative>
                    <Message.Header>Something went wrong!</Message.Header>
                    <p>{errors.global}</p>
                </Message>
            )}
            <Form.Field error={!!errors.projectname}>
                <label>Projectname</label>
                <input
                    type="text"
                    id="projectname"
                    name="projectname"
                    value={data.projectname}
                    onChange={this.onChange}
                />
                { errors.projectname && <InlineError text={errors.projectname}/> }
                <label>skillsview.netlify.com/projects/{data.projectname}</label>
            </Form.Field>
            <Form.Field error={!!errors.description}>
                <label>Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={this.onChange}
                />
                { errors.description && <InlineError text={errors.description}/> }
            </Form.Field>
            <Button primary>Create Project</Button>
        </Form>
    );
  }
}

CreateProjectForm.propTypes = {
  submit: PropTypes.func.isRequired
}

export default CreateProjectForm;