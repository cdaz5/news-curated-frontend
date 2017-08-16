import React, { Component } from 'react';
import { Grid, Button, Form, Segment, Divider } from 'semantic-ui-react';
import Interests from './Interests'
import Step from './Step'

// import LoginFB from './LoginFB'

export default class SignUpForm extends Component {

  state = {
      name: '',
      email: '',
      password: ''
    }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    console.log("handle submit on signup component")
    event.preventDefault()
    // this.context.history.push('/interests')
    // debugger
    this.props.onSignup(this.state)
    console.log(this.state)
    this.setState({
      name: '',
      email: '',
      password: ''
    })
  }

  render () {
    return (
      <div className='parallax height'>
        <Grid centered columns={3}>
          <Grid.Column verticalAlign='top'>
            <Step />
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
              <Button size='huge' type='submit'>Sign Up</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}



{/* <LoginFB onSignupLoginFB={this.props.onSignupLoginFB} /> */}
