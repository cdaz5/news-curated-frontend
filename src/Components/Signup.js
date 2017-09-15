import React, { Component } from 'react';
import { Grid, Button, Form, Message } from 'semantic-ui-react';
// import LoginFB from './LoginFB'

export default class SignUp extends Component {

  state = {
      name: '',
      email: '',
      password: '',
    }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSignup(this.state)
    this.setState({
      name: '',
      email: '',
      password: ''
    })
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
          <Grid.Column verticalAlign='top'>
            <span className='neon login'>I need news in my life!</span>
            {this.renderErrorMessage()}
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <input
                  type='text'
                  name='name'
                  placeholder='Enter Name'
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <input
                  type='text'
                  name='email'
                  placeholder='Enter Email'
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <input
                  type='password'
                  name='password'
                  placeholder='Enter Password'
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Button size='huge' color='pink' type='submit'>Sign Up</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}
