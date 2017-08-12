import React, { Component } from 'react';
import { Segment, Feed, Item, Icon } from 'semantic-ui-react';
import SavedArticle from '../Components/SavedArticle';


export default class FavoritesContainer extends Component {

  renderSavedArticles = () => {
    if (this.props.savedArticles.length > 0)
      return this.props.savedArticles.map((article, idx) => (<SavedArticle key={idx} article={article} deleteSavedArticle={this.props.deleteSavedArticle} />))
  }


  render() {
    return (
      <div>
        <div className='newsfeed'>
          <Segment raised className='newsfeed'>
            <Item.Header className='newsfeed'>Favorites <Icon name='like' color='red'/></Item.Header>
          </Segment>
        </div>
        <Item.Group divided>
          {this.renderSavedArticles()}
        </Item.Group>
      </div>
    )
  }



}
