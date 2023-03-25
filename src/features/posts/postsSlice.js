import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axiosInstance.get("/blogs");
  return response.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    sortedByDate: (state) => {
      state.posts.sort((a, b) => {
        const aDate = new Date(a.createdAt);
        const bDate = new Date(b.createdAt);
        return bDate - aDate;
      });
    },
    sortedByLike: (state) => {
      state.posts.sort((a, b) => b.likes - a.likes);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.posts = [];
        state.error = true;
        state.errorMessage = action.error?.message;
      });
  },
});

export default postsSlice.reducer;
export const { sortedByDate, sortedByLike } = postsSlice.actions;
