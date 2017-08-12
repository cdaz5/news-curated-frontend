import React, { Component } from 'react'
import { Accordion, Button, Icon, Image as ImageComponent, Item, Label, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom';


export default class Article extends Component {


  renderPic = () => {
    return (!!this.props.article.media[0] ?
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
        <Item.Image src={this.renderPic()}/>
        <Item.Content>
          <Item.Header><Link to={this.props.article.links.permalink} target="_blank">{this.props.article.title}</Link></Item.Header>
          <Item.Meta>
            <Label><Icon color='blue' name='facebook official'/>{this.renderFbShares()}</Label>
            <Label><Icon color='blue' name='linkedin square'/>{this.renderLinkedinShares()}</Label>
            <Label></Label>
          </Item.Meta>
          <Item.Description>
            <Accordion fluid styled className='accordion'>
              <Accordion.Title>
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
            <Icon name='like' onClick={() => {this.props.handleSaveArticle(this.props.article)}} />
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}
