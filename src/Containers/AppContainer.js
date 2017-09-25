import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import ArticlesContainer from './ArticlesContainer';
import FavoritesContainer from './FavoritesContainer';
import TrendsContainer from './TrendsContainer';


const BASE_URL = process.env.REACT_APP_API

export default class AppConatiner extends Component {

  state = {
    articles: [],
    savedArticles: [],
    nextPageCursor: '',
    trends: [],
    sentiment: [],
    tweets: [],
    tweetsLoader: true,
    trendsLoader: true,
    articlesLoader: true,
    pieLoader: true,
  }

  deleteSavedArticle = (deleteArticle) => {
    const articleId = {id: deleteArticle.id}
    fetch(`${BASE_URL}/delete/saved_article`, {
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
        this.state.savedArticles.length > 0 ? this.fetchSentimentData() : this.setState({ sentiment: [] })
      }.bind(this), 500)
      }
    )
  }

  fetchArticles = () => {
    this.setState({ articlesLoader: true, trendsLoader: true, tweetsLoader: true, pieLoader:true})
    const cursor = {nextPageCursor: this.state.nextPageCursor}
    fetch(`${BASE_URL}/articles`, {
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

      const cleanArticles = jsonObject.stories.filter((obj, pos, arr) => {
          return arr.map(mapObj =>  {
            if (mapObj['media'].includes('url')) {
              return mapObj['media'][0]['url'].indexOf(obj['media'][0]['url']) === pos
            } else {
              return mapObj
            }
      })});

      this.setState({
        articles: [...this.state.articles, ...cleanArticles],
        nextPageCursor: jsonObject.next_page_cursor,
        articlesLoader: !this.state.articlesLoader,
      })
      return jsonObject
    }).then(jsonObject => {
      const articleIds = this.state.articles.map(article => {return {id: article.id}})
      const arrayOfIds = {articles: articleIds}
      fetch(`${BASE_URL}/trends`, {
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
          trends: [...jsonObject.trends],
          trendsLoader: !this.state.trendsLoader
        })
        return jsonObject
      })
      .then(jsonObject => {
          return this.fetchTweets()
        })
        .then(jsonObject => {
          if (!!this.state.savedArticles[0]) {
            const articleIds = this.state.savedArticles.map(article => {return  {id: article.aylien_id}})
            const arrayOfIds = {articles: articleIds}
            fetch(`${BASE_URL}/sentiment`, {
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
                sentiment: jsonObject.trends,
                pieLoader: !this.state.pieLoader
              })
            })
          } else {
            this.setState({
              pieLoader: !this.state.pieLoader
            })
          }
        })
      })
    }

    onExit = () => {
      console.log('on exit')
    }

    fetchSentimentData = () => {
      const articleIds = this.state.savedArticles.map(article => {return  {id: article.aylien_id}})
      const arrayOfIds = {articles: articleIds}
      fetch(`${BASE_URL}/sentiment`, {
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

  fetchTweets = () => {
    const hashtags = {
      hashtags: this.state.articles.map((article) => {return article.hashtags[0]}).join(' OR ')
      }
    fetch(`${BASE_URL}/tweets`, {
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
      this.setState({
        tweets: jsonObject,
        tweetsLoader: !this.state.tweetsLoader
      })
      return jsonObject
    })
    .catch(error => console.log(error))
  }

  fetchSavedArticles = () => {
    fetch(`${BASE_URL}/user/articles`, {
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
    }.bind(this), 4000)
  }

  formatSaveArticleObject = (article) => {
    return {
      title: article.title,
      summary: article.summary.sentences.join(' | '),
      media_img_url: !!article.media[0] ? article.media[0].url : 'https://vignette2.wikia.nocookie.net/inkagames-english/images/0/0e/No_image.jpg/revision/latest?cb=20170113194025',
      source_name: article.source.name,
      author: article.author.name,
      keywords: article.keywords.join(', '),
      hashtags: article.hashtags.join(', '),
      facebook_shares: !!article.social_shares_count.facebook[0] ? article.social_shares_count.facebook[0].count : 0,
      linkedin_shares: !!article.social_shares_count.linkedin[0] ? article.social_shares_count.linkedin[0].count : 0,
      related_stories_api_call: article.links.related_stories,
      sentiment_polarity: article.sentiment.body.polarity,
      sentiment_score: article.sentiment.body.score,
      permalink: article.links.permalink,
      aylien_id: article.id
    }
  }

  saveArticle = (article) => {
    fetch(`${BASE_URL}/saved_articles`, {
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
                tweetsActive={this.state.tweetsLoader}
                pieActive={this.state.pieLoader}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              <ArticlesContainer
                articles={this.state.articles}
                handleSaveArticle={this.handleSaveArticle}
                fetchArticles={this.fetchArticles}
                active={this.state.articlesLoader}
                onExit={this.onExit}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <TrendsContainer
                trends={this.state.trends}
                trendsActive={this.state.trendsLoader}
                sentiment={this.state.sentiment}
                articles={this.state.articles}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}
