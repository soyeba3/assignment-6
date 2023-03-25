import React from "react";
import { Link } from "react-router-dom";

const RelatedPostCard = ({ item = {} }) => {
  return (
    <div className="card">
      <Link to={`/post/${item?.id}`}>
        <img src={item?.image} className="card-image" alt="" />
      </Link>
      <div className="p-4">
        <Link
          to={`/post/${item?.id}`}
          className="text-lg post-title lws-RelatedPostTitle"
        >
          {item?.title}
        </Link>
        <div className="mb-0 tags">
          {item?.tags.map((item, index) => (
            <span key={index} style={{ fontSize: "11px" }}>
              #{item},{" "}
            </span>
          ))}
        </div>
        <p>{item?.createdAt}</p>
      </div>
    </div>
  );
};

export default RelatedPostCard;
