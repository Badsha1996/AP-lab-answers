const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;


const allArticles = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));

app.get('/search', (req, res) => {

  const { name, page, limit } = req.query;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Search name parameter is required.' });
  }


  const currentPage = parseInt(page) || 1;
  const itemsPerPage = parseInt(limit) || 5;


  const filteredArticles = allArticles.filter(article =>
    article.title.toLowerCase().includes(name.toLowerCase())
  );


  const totalResults = filteredArticles.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);


  // array has index so [1,2,3,4,5,6.7]
  // page 1 : 1, 2
  // page 2: 3, 4
  // page 3: 5, 6  => so page 3 what is startIndex ? it is 4(value 5)
  // how did you get that ?
  // (3 -1 ) * 2(each page has 2 number) = 4 (value 5)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);


  res.status(200).json({
    currentPage: currentPage,
    totalPages: totalPages,
    totalResults: totalResults,
    articles: paginatedArticles,
  });
});


  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  module.exports = {app}
