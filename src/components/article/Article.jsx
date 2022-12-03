import React from 'react';
// import './article.css';
import './article.scss';

const Article = ({ imgUrl, date, text }) => (
  <div className="gpt3__blog-container_article">           {/* flex column */}
    <div className="gpt3__blog-container_article-image">
      <img src={imgUrl} alt="blog_image" />
    </div>
    <div className="gpt3__blog-container_article-content">
      <div>
        <p>{date}</p>
        <h3>{text}</h3>
      </div>
      <p>Read Full Article</p>
    </div>
  </div>
);

export default Article;
