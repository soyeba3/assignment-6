import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchPost,
  increaseLike,
  updateBookmark,
} from "../../features/post/postSlice";
import Spinner from "../spinner/Spinner";
import RelatedPosts from "./RelatedPosts";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { post, loading, error, errorMessage } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  const handleLikeIncrease = () => {
    dispatch(increaseLike({ id, like: post.likes + 1 }));
  };
  const handleUpdateBookmark = () => {
    dispatch(updateBookmark(id));
  };

  // Decide what to render
  let content;

  if (loading) content = <Spinner />;

  if (!loading && error) {
    content = <div>{errorMessage}</div>;
  }

  if (!loading && !error && !post?.id) {
    content = <div>No Post Found</div>;
  }

  if (!loading && !error && post?.id) {
    content = (
      <>
        <main className="post">
          <img
            src={post?.image}
            alt="githum"
            className="w-full rounded-md"
            id="lws-megaThumb"
          />
          <div>
            <h1 className="mt-6 text-2xl post-title" id="lws-singleTitle">
              {post?.title}
            </h1>
            <div className="tags" id="lws-singleTags">
              {post?.tags.map((item, index) => (
                <span key={index}>#{item}, </span>
              ))}
            </div>
            <div className="btn-group">
              <button
                onClick={handleLikeIncrease}
                className="like-btn"
                id="lws-singleLinks"
              >
                <i className="fa-regular fa-thumbs-up"></i> {post?.likes}
              </button>
              <button
                onClick={handleUpdateBookmark}
                className={`${post?.isSaved && "active"} save-btn`}
                id="lws-singleSavedBtn"
              >
                <i className="fa-regular fa-bookmark"></i>{" "}
                {post?.isSaved ? "Saved" : "Save"}
              </button>
            </div>
            <div className="mt-6">
              <p>{post?.description}</p>
            </div>
          </div>
        </main>
        <RelatedPosts id={id} tags={post?.tags} />
      </>
    );
  }

  return content;
};

export default PostDetail;
