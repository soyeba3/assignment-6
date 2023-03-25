import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ item }) => {
  const { id, title, image, createdAt, likes, tags, isSaved } = item;
  return (
    <div className="lws-card">
      <Link to={`/post/${id}`}>
        <img src={image} className="lws-card-image" alt="" />
      </Link>
      <div className="p-4">
        <div className="lws-card-header">
          <p className="lws-publishedDate">{createdAt}</p>
          <p className="lws-likeCount">
            <i className="fa-regular fa-thumbs-up"></i>
            {likes}
          </p>
        </div>
        <Link to={`/post/${id}`} className="lws-postTitle">
          {" "}
          {title}{" "}
        </Link>
        <div className="lws-tags">
          {tags?.map(
            (item, index) => (
              <span key={index} style={{ fontSize: "11px" }}>
                #{item},{" "}
              </span>
            )
          )}
        </div>
        <div className="flex gap-2 mt-4">
          {isSaved && <span className="lws-badge"> Saved </span>}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
