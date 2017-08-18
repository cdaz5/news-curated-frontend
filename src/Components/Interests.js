import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import Categories from '../CategoryData/Categories.js';
import { TagCloud } from 'react-tagcloud';
import history from '../history';

export default class InterestsForm extends Component {
  constructor(props) {
    super()
    let count = 20
    const allCategories = Categories.map((category) => {
      return {value: category.label.toLowerCase(), count: count++, color: 'white'}})

    this.state = {
      interests: [],
      categories: allCategories,
      searchTerm: ''
    }
  }

  handleClick = (tag) => {
    tag.color = 'red'
    this.setState({
      interests: [...this.state.interests, tag.value]
    })
  }

  handleSubmit = (event, interests) => {
    const stringInterests = this.state.interests.join(' OR ')
    const newInterests = {interests: stringInterests}
    debugger
    fetch(process.env.REACT_API + '/users/edit', {
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

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  render() {
    const data = this.state.categories.filter((category) => {return category.value.includes(this.state.searchTerm.toLowerCase())})

    const customRenderer = (tag, size, color) => (
      <span key={tag.value}
        style={{
          animation: 'blinker 3s linear infinite',
          animationDelay: `${Math.random() * 6}s`,
          fontSize: `${size}em`,
          // border: `2px solid ${color}`,
          margin: '6px',
          padding: '4px',
          display: 'inline-block',
          color: tag.color,
        }}>{tag.value}</span>
      )
    return (

      <div className='parallax'>
        <div className='interestsBack'>
        <div className='interestSearch'>
        <span><Input inverted size='small' icon='search' placeholder='Search...' value={this.state.searchTerm} onChange={this.handleChange} /></span>
        <span>&nbsp;&nbsp;</span>
        <span><Button className='interestsButton' basic color="yellow" size="small" onClick={(event) => {this.handleSubmit(event, this.state.interests)}}>Take Me to the News!</Button></span>
        </div>
        <div className='wordcloud'>
          <TagCloud minSize={1}
                    maxSize={2}
                    tags={data}
                    onClick={tag => {this.handleClick(tag) }}
                    renderer={customRenderer}
          />
        </div>
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
