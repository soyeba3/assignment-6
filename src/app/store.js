import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "../features/filterSlice/filterSlice";
import postSlice from "../features/post/postSlice";
import postsSlice from "../features/posts/postsSlice";
import relatedPostsSlice from "../features/relatedPosts/relatedPostsSlice";

const store = configureStore({
  reducer: {
    posts: postsSlice,
    post: postSlice,
    relatedPosts: relatedPostsSlice,
    filter: filterSlice,
  },
});

export default store;
