import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import Categories from '../CategoryData/Categories.js';
import { TagCloud } from 'react-tagcloud';
import history from '../history';
import { Steps } from 'intro.js-react';

const BASE_URL = process.env.REACT_APP_API

export default class InterestsForm extends Component {
  constructor(props) {
    super()
    let count = 20
    const allCategories = Categories.map((category) => {
      return {value: category.label.toLowerCase(), count: count++, color: 'white'}})

    this.state = {
      interests: [],
      categories: allCategories,
      searchTerm: '',
      stepsEnabled: true,
      initialStep: 0,
      steps: [
        {
          element: '.step1',
          intro: 'Choose a minimum of 3 interests'
        },
        {
          element: '.step2',
          intro: 'You can search for interests here...'
        },
        {
          element: '.step3',
          intro: 'or click them directly here. They turn red when chosen.  Enjoy!'
        }
      ]
    }
  }

  onExit = () => {
    this.setState({
      stepsEnabled: !this.state.stepsEnabled
    })
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
    fetch(`${BASE_URL}/users/edit`, {
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

  renderButton = () => {
    if (this.state.interests.length > 2) {
      return (<span><Button className='interestsButton' basic color="yellow" size="small" onClick={(event) => {this.handleSubmit(event, this.state.interests)}}>Take Me to the News!</Button></span>)
    }
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
          margin: '4px',
          padding: '4px',
          display: 'inline-block',
          color: tag.color,
        }}>{tag.value}</span>
      )
    return (

      <div className='parallax'>
        <Steps
          enabled={this.state.stepsEnabled}
          steps={this.state.steps}
          initialStep={this.state.initialStep}
          onExit={this.onExit}
        />
        <div className='interestsBack'>
          <div className='interestSearch'>
            <span className='neon login step1'>
              choose at least 3 interests
            </span>
            <div>
              <span>
                <Input inverted size='small' icon='search' placeholder='Search...' value={this.state.searchTerm} onChange={this.handleChange} className='step2'/>
              </span>
              <span>
                &nbsp;&nbsp;
              </span>
              {this.renderButton()}
            </div>
          </div>
          <div className='wordcloud'>
            <TagCloud
              minSize={1}
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
