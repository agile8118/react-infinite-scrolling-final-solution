import React, { Component } from "react";
import axios from "axios";
import Article from "./Article";
import Loading from "./Loading";

class Articles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      page: 1,
      hasEnded: false, // to indicate whether or not we've fetched all the records
      loading: true,
    };

    this.container = React.createRef();
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.articles.length !== this.state.articles.length) {
      document.addEventListener("scroll", this.trackScrolling);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.trackScrolling);
  }

  trackScrolling = () => {
    if (
      this.container.current.getBoundingClientRect().bottom <=
      window.innerHeight
    ) {
      console.log("We've reached the bottom!");

      if (!this.state.hasEnded) {
        this.setState({ page: this.state.page + 1 }, () => {
          this.fetch();
        });
      }

      document.removeEventListener("scroll", this.trackScrolling);
    }
  };

  async fetch() {
    this.setState({ loading: true });
    const { data } = await axios.get(
      `http://localhost:4080/api/articles?page=${this.state.page}`
    );

    if (data.articlesData.length === 0) {
      this.setState({ hasEnded: true });
    } else {
      this.setState({
        articles: [...this.state.articles, ...data.articlesData],
      });
    }

    this.setState({ loading: false });
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

    return (
      <div ref={this.container}>
        {this.renderArticles()}
        {this.state.loading && <Loading />}
        {this.state.hasEnded && (
          <div className="end-articles-msg">
            <p>You're all caught up!</p>
          </div>
        )}
      </div>
    );
  }
}

export default Articles;
