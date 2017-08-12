import React, { Component } from 'react';
import Article from '../Components/Article'
import { Item, Segment } from 'semantic-ui-react'



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
            <Item.Header className='newsfeed'>NewsFeed</Item.Header>
          </Segment>
        </div>
        <Item.Group divided>
          {articles}
        </Item.Group>
      </div>
    )
  }




}
