import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRelatedPosts } from "../../features/relatedPosts/relatedPostsSlice";
import Spinner from "../spinner/Spinner";
import RelatedPostCard from "./RelatedPostCard";

const RelatedPosts = ({ id, tags }) => {
  const dispatch = useDispatch();
  const { relatedPosts, loading, error, errorMessage } = useSelector(
    (state) => state.relatedPosts
  );
  useEffect(() => {
    dispatch(fetchRelatedPosts({ id, tags }));
  }, [dispatch, id, tags]);

  let content;

  if (loading) {
    content = <Spinner />;
  }
  if (!loading && error) {
    content = <div>{errorMessage}</div>;
  }

  if (!loading && !error && relatedPosts?.length === 0) {
    content = <div>No Related Posts Found</div>;
  }

  if (!loading && !error & (relatedPosts?.length > 0)) {
    content = (
      <div className="space-y-4 related-post-container">
        {relatedPosts.map((item) => (
          <RelatedPostCard key={item.id} item={item} />
        ))}
      </div>
    );
  }

  return (
    <aside>
      <h4 className="mb-4 text-xl font-medium" id="lws-relatedPosts">
        Related Posts
      </h4>
      {content}
    </aside>
  );
};

export default RelatedPosts;
