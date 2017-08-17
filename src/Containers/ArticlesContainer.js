import React, { Component } from 'react';
import Article from '../Components/Article'
import { Item, Segment, Loader, Dimmer, Button, Icon } from 'semantic-ui-react'



export default class ArticlesContainer extends Component {



  render() {
    const articles = this.props.articles.map((article, idx) => {
      return <Article
        article={article}
        key={idx}
        handleSaveArticle={this.props.handleSaveArticle}
      /> })

    return (
      <div>
        <div className='newsfeed'>
          <Segment raised className='newsfeed'>
            <Item.Header className='newsfeed'>NewsFeed <Icon name='feed' color='orange'/></Item.Header>
          </Segment>
        </div>
        <Dimmer active={this.props.active}>
          <Loader className='trendsLoader' size='massive'>Fetching News</Loader>
        </Dimmer>
        <Item.Group relaxed>
          {articles}
        </Item.Group>
        <Segment className='moreArticles' textAlign='center'>
          <Button basic inverted onClick={this.props.fetchArticles}>Click for More</Button>
        </Segment>
      </div>
    )
  }




}
