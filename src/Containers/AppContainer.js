import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import ArticlesContainer from './ArticlesContainer';
import FavoritesContainer from './FavoritesContainer';
import Weather from '../Components/WeatherWidget';
import { OpenWeatherMap } from 'react-weather';
import TrendsContainer from './TrendsContainer';




export default class AppConatiner extends Component {

  state = {
    articles: [],
    savedArticles: [],
    nextPageCursor: '',
    trends: [],
    sentiment: [],
    tweets: []
  }

  deleteSavedArticle = (deleteArticle) => {
    const articleId = {id: deleteArticle.id}
    // debugge
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
      setTimeout(function() {
        // debugger
        this.state.savedArticles.length > 0 ? this.fetchSentimentData() : this.setState({ sentiment: [] })
      }.bind(this), 500)
      }
    )
  }

  fetchArticles = () => {
    const cursor = {nextPageCursor: this.state.nextPageCursor}
    // debugger
    fetch('http://localhost:3000/api/v1/articles', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      },
      body: JSON.stringify(cursor)
    })
    .then(resp => resp.json())
    .then(jsonObject => {
      this.setState({
        articles: [...this.state.articles, ...jsonObject.stories],
        nextPageCursor: jsonObject.next_page_cursor
      })
      return jsonObject
    }).then(jsonObject => {
      const articleIds = this.state.articles.map(article => {return {id: article.id}})
      // debugger
      const arrayOfIds = {articles: articleIds}
      fetch('http://localhost:3000/api/v1/trends', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': localStorage.getItem('jwt')
        },
        body: JSON.stringify(arrayOfIds)
      })
      .then(resp => resp.json())
      .then(jsonObject => {
        this.setState({
          trends: [...jsonObject.trends]
        })
        return jsonObject
      })
      .then(jsonObject => {
          return this.fetchTweets()
        })
        .then(jsonObject => {
          if (!!this.state.savedArticles[0]) {
            const articleIds = this.state.savedArticles.map(article => {return  {id: article.aylien_id}})
            // debugger
            const arrayOfIds = {articles: articleIds}
            // debugger
            fetch('http://localhost:3000/api/v1/sentiment', {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
                'Authorization': localStorage.getItem('jwt')
              },
              body: JSON.stringify(arrayOfIds)
            })
            .then(resp => resp.json())
            .then(jsonObject => {
              this.setState({
                sentiment: jsonObject.trends
              })
            })
          } else {
            null
          }
        })
      })
    }






    fetchSentimentData = () => {
      const articleIds = this.state.savedArticles.map(article => {return  {id: article.aylien_id}})
      // debugger
      const arrayOfIds = {articles: articleIds}
      // debugger
      fetch('http://localhost:3000/api/v1/sentiment', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'Authorization': localStorage.getItem('jwt')
        },
        body: JSON.stringify(arrayOfIds)
      })
      .then(resp => resp.json())
      .then(jsonObject => {
        this.setState({
          sentiment: [...jsonObject.trends]
        })
      })
    }
  // fetchTrends = () => {
  //   fetch('http://localhost:3000/api/v1/trends', {
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/json',
  //       'accept': 'application/json',
  //       'Authorization': localStorage.getItem('jwt')
  //     }
  //   })
  //   .then(resp => resp.json())
  //   .then(jsonObject => {
  //     this.setState({
  //       trends: [...jsonObject.trends]
  //     })
  //   })
  // }

  fetchTweets = () => {
    // debugger
    const hashtags = {
      hashtags: this.state.articles.map((article) => {return article.hashtags[0]}).join(' OR ')
      }
    // debugger
    fetch('http://localhost:3000/api/v1/tweets', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')
      },
      body: JSON.stringify(hashtags)
      })
    .then(resp => resp.json())
    .then(jsonObject => {
      // debugger
      this.setState({
        tweets: jsonObject
      })
      return jsonObject
    })
    .catch(error => console.log(error))
  }

  // fetchTwitterToken = () => {
  //   const consumerKey = 'xvz1evFS4wEEPTGEFPHBog'
  //   const consumerSecret = 'L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg'
  //   const tokenCredentials = consumerKey.concat(':',consumerSecret)
  //   const encodedCredentials = btoa(tokenCredentials)
  //   fetch('https://api.twitter.com/oauth2/token', {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': 'Basic MUJzZ2xlTWpQVlMwZldFdzd6ak9nQVJ0dzplczEyR3JpUlRLekZUZ29XVkJCQkdyb0JtRTZZWDJqTE55MUw2TGhOS244MjhrUzh5TA==',
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       'Accept-Encoding': 'gzip',
  //       'Content-Length': '29',
  //     },
  //     body: 'grant_type=client_credentials'
  //   })
  //   .then(resp => resp.json())
  //   .then(jsonObject => {debugger})
  //   .catch(error => console.log(error))
  // }

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

  componentDidMount = () => {

    setTimeout(function() {
      this.fetchArticles()
      this.fetchSavedArticles()
      // this.fetchTrends()
    }.bind(this), 4000)
    // setTimeout(function() {
    //   this.fetchTweets()
    // }.bind(this), 5000)
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
      permalink: article.links.permalink,
      aylien_id: article.id
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
    .then(() => {this.fetchSentimentData()})
  }

  handleSaveArticle = (article) => {
    const newArticle = this.formatSaveArticleObject(article)
    this.saveArticle(newArticle)
  }




  render() {
    return (
      <div className='parallax'>
        <Grid celled='internally'>
          <Grid.Row>
            <Grid.Column width={4}>
              <FavoritesContainer
                savedArticles={this.state.savedArticles}
                deleteSavedArticle={this.deleteSavedArticle}
                sentiment={this.state.sentiment}
                tweets={this.state.tweets}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <ArticlesContainer
                articles={this.state.articles}
                handleSaveArticle={this.handleSaveArticle}
                fetchArticles={this.fetchArticles}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <TrendsContainer trends={this.state.trends} sentiment={this.state.sentiment}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
   )
  }
 }
