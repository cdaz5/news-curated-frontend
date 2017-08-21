import React, { Component } from 'react'
import { Popup, Accordion, Icon, Item, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { Steps } from 'intro.js-react';


export default class Article extends Component {

  state = {
    initialStep: 0,
    steps: [
      {
        element: '.step1',
        intro: 'Contains articles based on your interests.',
      },
      {
        element: '.step2',
        intro: 'Individual article.',
      },
      {
        element: '.step3',
        intro: 'Number of times the article has been shared on Facebook.',
      },
      {
        element: '.step4',
        intro: 'Number of times the article has been shared on LinkedIn.',
      },
      {
        element: '.step5',
        intro: 'Click the heart icon to save an article for later.  Go ahead and try it right now!... Seriously, click it... we\'ll wait.',
      },
      {
        element: '.step6',
        intro: 'Click here to reveal a bulleted list summary of the article.',
      },
      {
        element: '.step7',
        intro: 'Shows the article sentiment polarity and percentage.',
      },
     ],
  }

  // onExit = () => {
  //   this.setState({
  //     stepsEnabled: !this.state.stepsEnabled
  //   })
  // }


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

  articleSummary = () => {
    if (this.props.article.summary.sentences.length > 0) {
      return this.props.article.summary.sentences.map((sentence, idx) => { return <li key={idx}>{sentence}</li>})
    } else {
      return <li>Sorry, no summary available for this article.</li>
    }
  }

  render() {
    return (
      <Item className='articles step2'>
        <Steps
          enabled={this.props.allArticles.length > 10 ? false : true}
          steps={this.state.steps}
          initialStep={this.state.initialStep}
          onExit={this.props.onExit}
          highlightClass='highlightClass'
        />
        <Item.Image size='medium' src={this.renderPic()}/>
        <Item.Content>
          <Item.Header><Link to={this.props.article.links.permalink} target="_blank" className='mainArticleLink'>{this.props.article.title}</Link></Item.Header>
          <Item.Meta>
            <div className='socialContainer'>
              <div className='articleSocial'>
                <Popup
                  trigger={<span className='step3'><Icon size='large' color='blue' name='facebook official' />{this.renderFbShares()}</span>}
                  content='Number of Shares on Facebook'
                  position='top center'
                />
              </div>
              <div className='articleSocial'>
                <Popup
                  trigger={<span className='step4'><Icon size='large' color='blue' name='linkedin square' />{this.renderLinkedinShares()}</span>}
                  content='Number of Shares on LinkedIn'
                  position='top center'
                />
              </div>
              <div className='articleSocialHeart'>
                <Popup
                  trigger={<Icon className='step5' size='large' name='like' onClick={() => {this.props.handleSaveArticle(this.props.article)}} />}
                  content='Click to Save for Later!'
                  position='right center'
                 />
              </div>
          </div>
          </Item.Meta>
          <Item.Description>
            <Accordion fluid className='accordion'>
              <Accordion.Title className='accordion step6'>
                <Icon name='dropdown' />
                Article Summary
              </Accordion.Title>
              <Accordion.Content>
                <ul>
                  {this.articleSummary()}
                </ul>
              </Accordion.Content>
            </Accordion>
          </Item.Description>
          <Item.Extra className='step7'>
            <Label basic size='small' color='purple' pointing='right'>Sentiment</Label>
            {this.renderSentiment()}
          </Item.Extra>
        </Item.Content>
      </Item>
    )
  }
}
