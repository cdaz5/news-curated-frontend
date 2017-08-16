import React from 'react';
import { Feed, Icon, Item } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';


 const Tweet = ({tweet}) => {
    // debugger
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
              <a><img src={`${tweet.media.scheme}://${tweet.media.host}${tweet.media.path}:thumb`} /></a>
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


  // <Feed.Event className='tweet'>
  //   <Feed.Label image={`${tweet.profile_image_url.scheme}://${tweet.profile_image_url.host}${tweet.profile_image_url.path}`}/>
  //   <Feed.Content>
  //     <Feed.Date className='tweetMeta'>{tweet.screen_name} |<div className='tweetCreatedAt'> {moment(tweet.created_at).fromNow()}</div></Feed.Date>
  //     <Feed.Summary>
  //       {tweet.text}
  //     </Feed.Summary>
  //     {!!tweet.media ?
  //       <Feed.Extra images>
  //         <a><img src={`${tweet.media.scheme}://${tweet.media.host}${tweet.media.path}`} /></a>
  //       </Feed.Extra> : null
  //     }
  //     <Feed.Meta className='tweetMeta'>
  //       <Feed.Like>
  //         <div className><Icon name='retweet'>{tweet.retweet_count}</Icon>  |  <Icon name='heart outline'>{tweet.favorite_count}</Icon></div>
  //       </Feed.Like>
  //     </Feed.Meta>
  //   </Feed.Content>
  // </Feed.Event>







{/* <Feed.Event>
  <Feed.Label image='/assets/images/avatar/small/helen.jpg' />
  <Feed.Content>
    <Feed.Date>4 days ago</Feed.Date>
    <Feed.Summary>
      <a>Helen Troy</a> added <a>2 new illustrations</a>
    </Feed.Summary>

    <Feed.Extra images>
      <a><img src='/assets/images/wireframe/image.png' /></a>
      <a><img src='/assets/images/wireframe/image.png' /></a>
    </Feed.Extra>

    <Feed.Meta like='1 Like' />
  </Feed.Content>
</Feed.Event>
</Feed> */}
