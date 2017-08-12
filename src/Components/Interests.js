import React, { Component } from 'react';
import { Card, Image, Grid, Button } from 'semantic-ui-react';
import Categories from '../CategoryData/Categories.js';
import InterestCard from './InterestCard';
import { TagCloud } from 'react-tagcloud';
import history from '../history';

export default class InterestsForm extends Component {
  constructor(props) {
    super()

    this.state = {
      interests: [],
      categories: Categories
    }
  }

  handleClick = (tag) => {
    this.setState({
      interests: [...this.state.interests, tag.value]
    })
  }

  handleSubmit = (event, interests) => {

    // debugger
    const stringInterests = this.state.interests.join(' OR ')
    const newInterests = {interests: stringInterests}
    debugger
    fetch('http://localhost:3000/api/v1/users/edit', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      },
      body: JSON.stringify(newInterests)
    })
    history.push('/dashboard')

  }

  render() {
    let count = 20
    const data = this.state.categories.map((category) => {
      return {value: category.label, count: count++}})
      const customRenderer = (tag, size, color) => (
        <span key={tag.value}
          style={{
            animation: 'blinker 3s linear infinite',
            animationDelay: `${Math.random() * 2}s`,
            fontSize: `${size}em`,
            border: `2px solid ${color}`,
            margin: '3px',
            padding: '3px',
            display: 'inline-block',
            color: 'white',
          }}>{tag.value}</span>
      );
    return (

      <div className='wordcloud'>
        <div>
          <TagCloud minSize={1}
                    maxSize={2}
                    tags={data}
                    onClick={tag => {this.handleClick(tag) }}
                    renderer={customRenderer}
          />
          <Button color="grey" size="massive" onClick={(event) => {this.handleSubmit(event, this.state.interests)}}>Take Me to the News!</Button>
        </div>
      </div>
    )
  }
}





 //
 //   render() {
 //     const categories = this.state.categories.map((category) => {
 //       return <InterestCard category={category.label} />
 //     })
 //     return (
 //       <form>
 //         <Grid columns={6}>
 //          <Grid.Row>
 //            {categories}
 //          </Grid.Row>
 //        </Grid>
 //      </form>
 //     )
 //   }
 // }
