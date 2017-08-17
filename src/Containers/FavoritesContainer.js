import React, { Component } from 'react';
import { Segment, Feed, Item, Icon, Dimmer, Loader } from 'semantic-ui-react';
import SavedArticle from '../Components/SavedArticle';
import Tweet from '../Components/Tweet';
import SVGPieChart from '../Components/SVGPieChart'



export default class FavoritesContainer extends Component {

  renderSavedArticles = () => {
    if (this.props.savedArticles.length > 0)
      return this.props.savedArticles.map((article, idx) => (<SavedArticle key={idx} article={article} deleteSavedArticle={this.props.deleteSavedArticle} />))
  }

  renderPieChart = () => {
    if (this.props.sentiment) {
      const data = this.props.sentiment.map((word) => {
        return { key: word.value, value: word.count, color: this.properColor(word.value) }
      })
      // debugger
      return <SVGPieChart data={data} />
    } else {
      return null
    }
  }

  properColor = (word) => {
    switch (word) {
      case 'negative':
        return '#f43838'
      case 'positive':
        return '#84ff00'
      case 'neutral':
        return '#fff835'
    }
  }

  renderTweets = () => {
    if (this.props.tweets.length > 0)
      return this.props.tweets.map((tweet, idx) => (
        // debugger
       <Tweet tweet={tweet} tweetsActive={this.props.tweetsActive} />
     ))
  }



  render() {
    return (
      <div>
        <div className='newsfeed'>
          <Segment raised className='newsfeed'>
            <Item.Header className='newsfeed'>Favorites <Icon name='like' color='red'/></Item.Header>
          </Segment>
        </div>
        <Item.Group relaxed>
          {this.renderSavedArticles()}
        </Item.Group>
        {this.props.sentiment.length > 0 ?
         <Segment raised className='newsfeed'>
          <Item.Header className='newsfeed'>Article Sentiment <Icon name='thermometer three quarters' color='red' /></Item.Header>
        </Segment> : null}
        <div>
          <Dimmer active={this.props.pieActive}>
            <Loader className='trendsLoader' size='massive'>Fetching Saved Articles</Loader>
          </Dimmer>
          {this.renderPieChart()}
        </div>
         <Segment raised className='newsfeed'>
          <Item.Header className='newsfeed'>Twitter Feed <Icon name='twitter' color='blue'/></Item.Header>

        </Segment>
        <Item.Group relaxed>
          <Loader active={this.props.tweetsActive} inverted inline='centered' size='massive' content='Fetching Tweets'/>
          {this.renderTweets()}
        </Item.Group>
      </div>
    )
  }



}
