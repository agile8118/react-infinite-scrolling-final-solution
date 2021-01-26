import React, { Component } from "react";
import axios from "axios";
import Articles from "./Articles";

class App extends Component {
  state = {
    articles: null,
  };

  componentDidMount() {
    this.fetch(1);
  }

  async fetch(page) {
    const { data } = await axios.get(
      `http://localhost:4080/api/articles?page=${page}`
    );

    this.setState({
      articles: data.articlesData,
    });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.articles && <Articles articles={this.state.articles} />}
      </React.Fragment>
    );
  }
}

export default App;
