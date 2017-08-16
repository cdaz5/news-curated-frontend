import React, { Component } from 'react';
import {Button, Segment, Divider, Grid, Image} from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export default class Landing extends Component {




  render() {
    return (
      <div className='parallax height'>
        <Segment textAlign='center' className='landingButtons'>
          <Button.Group size="massive">
            <Link to="/signup"> <Button color="grey" size="massive"> Sign Up </Button> </Link>
            <Button.Or />
            <Link to="/login"> <Button positive color="grey" size="massive"> Login </Button> </Link>
          </Button.Group>
        </Segment>
      </div>
    )
  }
}
