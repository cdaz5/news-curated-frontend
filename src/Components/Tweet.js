import React from 'react';
import { Icon, Item } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';


 const Tweet = ({tweet}) => {
    return (
      <Item className='tweetArticles'>
        <Item.Image size='tiny' src={`${tweet.profile_image_url.scheme}://${tweet.profile_image_url.host}${tweet.profile_image_url.path}`}/>
        <Item.Content>
          <Item.Header><Link to={`${tweet.url.scheme}://${tweet.url.host}${tweet.url.path}`} target="_blank" className='tweetLink'>{tweet.screen_name}</Link><div className='tweetPosted'>...{moment(tweet.created_at).fromNow()}</div></Item.Header>
          <Item.Description className='tweetBody'>
            {tweet.text}
          </Item.Description>
          {!!tweet.media ?
            <Item.Extra images>
              <a><img src={`${tweet.media.scheme}://${tweet.media.host}${tweet.media.path}:thumb`} alt='media' /></a>
            </Item.Extra> : null
          }
          <Item.Meta className='likesRetweets'>
            <Icon name='retweet' />{tweet.retweet_count} |
            <Icon name='heart outline' />{tweet.favorite_count}
          </Item.Meta>
        </Item.Content>
      </Item>
    )
  }

  export default Tweet;
