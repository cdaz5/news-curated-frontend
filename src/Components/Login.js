import React, { Component } from 'react';
import { Grid, Button, Form, Message } from 'semantic-ui-react';

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
       const items = this.props.errors.map(error => error)
      return (<Message
        color='red'
        className='loginSignupMessage'
        header='Apologies!'
        list={items}
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
            <div className='neon login'>Get me to the News!</div>
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
              <Button color='pink' type='submit' size='huge'>Log In</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
