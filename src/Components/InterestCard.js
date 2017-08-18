import React, { Component } from 'react';
import { Label, Grid } from 'semantic-ui-react';

export default class InterestCard extends Component {

  state = {
    image: '',
    clicked: false
  }

  fetchCardImage = () => {
    fetch('http://thedogapi.co.uk/api/v1/dog')
    .then(resp => resp.json())
    .then(jsonObject => {
      this.setState({
        image: jsonObject.data[0].url
      })
    })
  }

  componentWillMount = () => {
    this.fetchCardImage()
  }



  render() {
    return (
      <Grid.Column>
          <Label  color='orange' >{this.props.category}</Label>
    </Grid.Column>
    )
  }
}
