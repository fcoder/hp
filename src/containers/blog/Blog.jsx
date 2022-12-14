import React from 'react';
import Article from '../../components/article/Article';
import { blog01, blog02, blog03, blog04, blog05 } from './imports';
// import './blog.css';
import './blog.scss';

const Blog = () => (
  <div className="hp__blog section__padding" id="technology">
    <div className="hp__blog-heading">
      <h1 className="gradient__text">A lot is happening...<br /></h1>
    </div>
    <div className="hp__blog-container">

      <div className="hp__blog-container_groupA">
        <Article imgUrl={blog01} date=" " text="Our facility in Plainfield, New Jersey, USA" />
      </div>

      <div className="hp__blog-container_groupB">
        <Article imgUrl={blog02} date=" " text="Operators in the clean room" />
        <Article imgUrl={blog03} date=" " text="Optical Transceivers" />
        <Article imgUrl={blog04} date=" " text="Optical ccompoments and cables" />
        <Article imgUrl={blog05} date=" " text="Equipments" />
      </div>

    </div>
  </div>
);

export default Blog;
