const { DB } = require("../database");

module.exports = (app) => {
  app.get("/api/articles", async (req, res) => {
    const page = parseInt(req.query.page);
    const perPage = 12;

    const articles = await DB.find(
      "articles",
      {},
      {
        limit: perPage,
        skip: perPage * (page - 1),
        sort: { date: -1 },
      }
    );

    res.send({
      articlesData: articles,
    });
  });
};
