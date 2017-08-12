import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import ArticlesContainer from './ArticlesContainer';
import FavoritesContainer from './FavoritesContainer';



export default class AppConatiner extends Component {

  state = {
    articles: [],
    savedArticles: []
  }

  deleteSavedArticle = (deleteArticle) => {
    const articleId = {id: deleteArticle.id}
    // debugger
    fetch('http://localhost:3000/api/v1/delete/saved_article', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      },
      body: JSON.stringify(articleId)
    })
    .then(resp => resp.json())
    .then(articles => {
      this.setState({
        savedArticles: articles
      })
    })
  }

  fetchArticles = () => {
    fetch('http://localhost:3000/api/v1/articles', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
    .then(resp => resp.json())
    .then(jsonObject => {
      this.setState({
        articles: jsonObject.stories
      })
    })
  }

  fetchSavedArticles = () => {
    fetch('http://localhost:3000/api/v1/user/articles', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      }
    })
    .then(resp => resp.json())
    .then(jsonObject => {
      this.setState({
        savedArticles: [...this.state.savedArticles, ...jsonObject]
      })
    })
  }

  componentWillMount = () => {
    this.fetchSavedArticles()
    this.fetchArticles()
  }

  formatSaveArticleObject = (article) => {
    return {
      title: article.title,
      summary: article.summary.sentences.join(' | '),
      media_img_url: article.media[0].url,
      source_name: article.source.name,
      author: article.author.name,
      keywords: article.keywords.join(', '),
      hashtags: article.hashtags.join(', '),
      facebook_shares: article.social_shares_count.facebook[0].count,
      linkedin_shares: article.social_shares_count.linkedin[0].count,
      related_stories_api_call: article.links.related_stories,
      sentiment_polarity: article.sentiment.body.polarity,
      sentiment_score: article.sentiment.body.score,
      permalink: article.links.permalink
    }
  }

  saveArticle = (article) => {
    fetch('http://localhost:3000/api/v1/saved_articles', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      },
      body: JSON.stringify(article)
    })
    .then(resp => resp.json())
    .then(jsonObject => {
      // debugger
      this.setState({
        savedArticles: [...this.state.savedArticles, jsonObject]
      })
    })
  }

  handleSaveArticle = (article) => {
    const newArticle = this.formatSaveArticleObject(article)
    this.saveArticle(newArticle)
  }



  render() {
    return (
      <div className='background'>
        <Grid celled='internally'>
          <Grid.Row>
            <Grid.Column width={4}>
              <FavoritesContainer
                savedArticles={this.state.savedArticles}
                deleteSavedArticle={this.deleteSavedArticle}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <ArticlesContainer
                articles={this.state.articles}
                handleSaveArticle={this.handleSaveArticle}
              />
            </Grid.Column>
            <Grid.Column width={4}>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
   )
  }
 }
