import React, { Component } from 'react';
// import LoginFB from './LoginFB'
import { Grid, Button, Checkbox, Form, Segment, Divider, Message } from 'semantic-ui-react';

export default class LoginForm extends Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onLogin(this.state)
    this.setState({email: '', password: ''})
  }

  renderErrorMessage = () => {
     if (!!this.props.errors && this.props.errors.length > 0) {
      return (<Message
        color='red'
        className='loginSignupMessage'
        header={this.props.errors}
        content='Please try again'
      />)
    } else {
      return null
    }
  }

  render () {
    return (
      <div className='parallax height'>
        <Grid centered columns={3}>
          <Grid.Column verticalAlign='center'>
            {this.renderErrorMessage()}
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <input
                  type='text'
                  name='email'
                  placeholder='Enter Email'
                  value={this.state.email}
                  onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <input
                  type='password'
                  name='password'
                  placeholder='Enter Password'
                  value={this.state.password}
                  onChange={this.handleChange} />
              </Form.Field>
              <Button type='submit' size='huge'>Log In</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}



{/* <LoginFB onSignupLoginFB={this.props.onSignupLoginFB} /> */}
