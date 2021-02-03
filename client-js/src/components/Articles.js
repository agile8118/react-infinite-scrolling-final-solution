import React, { Component } from "react";
import axios from "axios";
import Article from "./Article";

class Articles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    const { data } = await axios.get(
      `http://localhost:4080/api/articles?page=1`
    );

    this.setState({
      articles: data.articlesData,
    });
  }

  renderArticles() {
    return this.state.articles.map((article) => {
      return (
        <Article
          key={article._id}
          image={article.image}
          title={article.title}
          author={article.author}
          date={article.date}
          body={article.body}
        />
      );
    });
  }

  render() {
    if (!this.state.articles) return <div />;

    return <div>{this.renderArticles()}</div>;
  }
}

export default Articles;
