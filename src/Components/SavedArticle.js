import React from 'react';
import { Item, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';




const SavedArticle = ({article, deleteSavedArticle}) => {
  return (
    <Item className='articles'>
      <Item.Image size='tiny' src={article.media_img_url}/>
      <Item.Content verticalAlign='middle'><Link className='articleLink' to={article.permalink} target="_blank">{article.title}</Link>
      </Item.Content><Button icon basic color='red' onClick={() => {deleteSavedArticle(article)}}><Icon name='delete' /></Button>
    </Item>
  )
}

export default SavedArticle;
