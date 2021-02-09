import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Article from "./Article";
import Loading from "./Loading";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasEnded, setHasEnded] = useState(false); // to indicate whether or not we've fetched all the records
  const [loading, setLoading] = useState(true);

  const container = useRef(null);

  useEffect(() => {
    if (!hasEnded) {
      fetch(page);
    }

    return () => {
      document.removeEventListener("scroll", trackScrolling);
    };
  }, [page]);

  useEffect(() => {
    document.addEventListener("scroll", trackScrolling);
  }, [articles]);

  const trackScrolling = () => {
    if (
      container.current.getBoundingClientRect().bottom <= window.innerHeight
    ) {
      setPage(page + 1);

      document.removeEventListener("scroll", trackScrolling);
    }
  };

  const fetch = async () => {
    setLoading(true);

    const { data } = await axios.get(
      `http://localhost:4080/api/articles?page=${page}`
    );

    if (data.articlesData.length === 0) {
      setHasEnded(true);
    } else {
      setArticles([...articles, ...data.articlesData]);
    }

    setLoading(false);
  };

  const renderArticles = () => {
    return articles.map((article) => {
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
  };

  if (!articles) return <div />;

  return (
    <div ref={container}>
      {renderArticles()}
      {loading && <Loading />}
      {hasEnded && (
        <div className="end-articles-msg">
          <p>You're all caught up!</p>
        </div>
      )}
    </div>
  );
};

export default Articles;
