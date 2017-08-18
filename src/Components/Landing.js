import React, { Component } from 'react';
import {Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export default class Landing extends Component {




  render() {
    return (
      <div className='parallax height'>
        <Segment textAlign='center' className='landingButtons'>
          <div className='neon landing'>News,Curated</div>
          <Button.Group size="massive">
            <Link to="/signup"> <Button color="pink" size="massive"> Sign Up </Button> </Link>
            <Button.Or />
            <Link to="/login"> <Button color="yellow" size="massive"> Login </Button> </Link>
          </Button.Group>
        </Segment>
      </div>
    )
  }
}
