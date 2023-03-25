import React from "react";
import { Link } from "react-router-dom";
import PostDetail from "../components/posts/PostDetail";

const Post = () => {
  return (
    <div>
      <div className="container mt-8">
        <Link
          to="/"
          className="inline-block text-gray-600 home-btn"
          id="lws-goHome"
        >
          <i className="mr-2 fa-solid fa-house"></i>Go Home
        </Link>
      </div>
      <section className="post-page-container">
        <PostDetail />
      </section>
    </div>
  );
};

export default Post;
