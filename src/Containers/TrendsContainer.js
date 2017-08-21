import React, { Component } from 'react';
import { Segment, Item, Icon, Dimmer, Loader } from 'semantic-ui-react';
import WordCloud from '../Components/WordCloud';



export default class TrendsContainer extends Component {

  state = {
    isOpen: false,
    tag: {},
    keywordArticles: [],
  }


  handleClick = (tag) => {
    const articlesWithKeywords = this.props.articles.filter((article) => {return article.keywords.includes(tag.value)})
    // debugger
    this.setState({
      isOpen: !this.state.isOpen,
      tag: tag,
      keywordArticles: articlesWithKeywords,
    })
  }

  handleClose = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      tag: {}
    })
  }

  handleMouseMove = (tag) => {
    tag.count = 100000
  }

  customRenderer = (tag, size, color) => (
    <span key={tag.value}
      style={{
        animation: 'blinker 3s linear infinite',
        animationDelay: `${Math.random() * 8}s`,
        fontSize: `${size}em`,
        border: `2px solid ${color}`,
        margin: '6px',
        padding: '4px',
        display: 'inline-block',
        color: 'white',
      }}>{tag.value}</span>
  )

  renderTrends = () => {
    if (this.props.trends) {
      const data = this.props.trends.map((word) => {
        return { value: word.value, count: word.count }
      })
      return <WordCloud open={this.state.isOpen} articlesWithKeywords={this.state.keywordArticles} customRenderer={this.customRenderer} handleMouseMove={this.handleMouseMove} handleClose={this.handleClose} tag={this.state.tag} minSize={2} maxSize={3} data={data} handleClick={this.handleClick} />
    } else {
      return null
    }
  }

  // properColor = (word) => {
  //   switch (word) {
  //     case 'negative':
  //       return '#8c1104'
  //     case 'positive':
  //       return '#039926'
  //     case 'neutral':
  //       return '#d1c604'
  //   }
  // }
  //
  // renderPieChart = () => {
  //   if (!!this.props.sentiment[0]) {
  //     const data = this.props.sentiment.map((word) => {
  //       return { name: word.value, value: word.count }
  //     })
  //     // debugger
  //     return <SimplePie data={data} />
  //   } else {
  //     return null
  //   }
  // }
  render() {
    return (
      <div>
        <Segment className='newsfeed spacer'>
          <Item.Header>Article Word Cloud <Icon name='cloud' className='cloud'/></Item.Header>
        </Segment>
        <Dimmer active={this.props.trendsActive}>
          <Loader className='trendsLoader' size='massive'>Fetching Keywords</Loader>
        </Dimmer>
        <div className='dashCloud'>
          {this.renderTrends()}
        </div>
      </div>
    )
  }
}
