import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../features/posts/postsSlice";
import Spinner from "../spinner/Spinner";
import PostCard from "./PostCard";

const Posts = () => {
  const { posts, loading, error, errorMessage } = useSelector(
    (state) => state.posts
  );
  const { filterBy } = useSelector((state) => state?.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  //decide what to render

  let content;

  if (loading) content = <Spinner />;
  if (!loading && error) {
    content = <div>{errorMessage}</div>;
  }
  if (!loading && !error && posts?.length === 0) {
    content = <div>No Posts Found</div>;
  }
  if (!loading && !error && posts?.length > 0) {
    content =
      filterBy === "saved"
        ? posts
            .filter((item) => item.isSaved)
            .map((item) => <PostCard key={item?.id} item={item} />)
        : posts.map((item) => <PostCard key={item?.id} item={item} />);
  }

  return (
    <>
      <main className="post-container" id="lws-postContainer">
        {content}
      </main>
    </>
  );
};

export default Posts;
