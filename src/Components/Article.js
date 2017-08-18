import React, { Component } from 'react'
import { Popup, Accordion, Icon, Item, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


export default class Article extends Component {


  renderPic = () => {
    return (this.props.article.media.length > 0 ?
    this.props.article.media[0].url :
    'https://vignette2.wikia.nocookie.net/inkagames-english/images/0/0e/No_image.jpg/revision/latest?cb=20170113194025'
    )
  }

  renderSentiment = () => {
    switch (this.props.article.sentiment.body.polarity) {
      case 'positive':
        return (
          <Label size='medium' color='green' horizontal>Postive {Math.round(this.props.article.sentiment.body.score * 100) + '%'}</Label>
        )
      case 'negative':
        return (
          <Label size='medium' color='red' horizontal>Negative {Math.round(this.props.article.sentiment.body.score * 100) + '%'}</Label>
        )
      case 'neutral':
        return (
          <Label size='medium' color='yellow' horizontal>Neutral</Label>
        )
      default:
        return null
    }
  }

  renderFbShares = () => {
    return (!!this.props.article.social_shares_count.facebook[0] ?
    this.props.article.social_shares_count.facebook[0].count : 0
  )
  }

  renderLinkedinShares = () => {
    return (!!this.props.article.social_shares_count.linkedin[0] ?
    this.props.article.social_shares_count.linkedin[0].count : 0
  )
  }

  render() {
    const summary = this.props.article.summary.sentences.map((sentence, idx) => { return <li key={idx}>{sentence}</li>})
    return (
      <Item className='articles'>
        <Item.Image size='medium' src={this.renderPic()}/>
        <Item.Content>
          <Item.Header><Link to={this.props.article.links.permalink} target="_blank" className='mainArticleLink'>{this.props.article.title}</Link></Item.Header>
          <Item.Meta>
            <div className='socialContainer'>
              <div className='articleSocial'>
                <Popup
                  trigger={<span><Icon size='large' color='blue' name='facebook official'/>{this.renderFbShares()}</span>}
                  content='Number of Shares on Facebook'
                  position='top center'
                />
              </div>
              <div className='articleSocial'>
                <Popup
                  trigger={<span><Icon size='large' color='blue' name='linkedin square'/>{this.renderLinkedinShares()}</span>}
                  content='Number of Shares on LinkedIn'
                  position='top center'
                />
              </div>
              <div className='articleSocialHeart'>
                <Popup
                  trigger={<Icon size='large' name='like' color='grey' onClick={() => {this.props.handleSaveArticle(this.props.article)}} />}
                  content='Click to Save for Later!'
                  position='right center'
                 />
              </div>
          </div>
          </Item.Meta>
          <Item.Description>
            <Accordion fluid className='accordion'>
              <Accordion.Title className='accordion'>
                <Icon name='dropdown' />
                Article Summary
              </Accordion.Title>
              <Accordion.Content>
                <ul>
                  {summary}
                </ul>
              </Accordion.Content>
            </Accordion>
          </Item.Description>
          <Item.Extra>
            <Label basic size='small' color='purple' pointing='right'>Sentiment</Label>
            {this.renderSentiment()}
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}
