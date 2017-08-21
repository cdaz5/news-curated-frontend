import React, { Component } from 'react';
import Article from '../Components/Article'
import { Item, Segment, Loader, Dimmer, Button, Icon } from 'semantic-ui-react'



export default class ArticlesContainer extends Component {

  render() {
    const articles = this.props.articles.map((article, idx) => {
      return <Article
        stepsEnabled={this.props.stepsEnabled}
        article={article}
        key={idx}
        handleSaveArticle={this.props.handleSaveArticle}
        onExit={this.props.onExit}
        allArticles={this.props.articles}
        onExit={this.props.onExit}
      /> })

    return (
      <div>
        <Segment className='newsfeed step1'>
          <Item.Header className='header' >NewsFeed <Icon name='feed' color='orange'/></Item.Header>
        </Segment>
        <Dimmer active={this.props.active}>
          <Loader className='trendsLoader' size='massive'>Fetching News</Loader>
        </Dimmer>
        <Item.Group >
          {articles}
        </Item.Group>
        <Segment className='moreArticles' textAlign='center'>
          <Button basic inverted onClick={this.props.fetchArticles}>Click for More Articles</Button>
        </Segment>
      </div>
    )
  }




}
