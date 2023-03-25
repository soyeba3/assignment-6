import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

export const fetchRelatedPosts = createAsyncThunk(
  "relatedPosts/fetchRelatedPosts",
  async ({ id, tags }) => {
    const limit = 5;
    let queryString =
      tags?.length > 0
        ? tags.map((tag) => `tags_like=${tag}`).join("&") +
          `&id_ne=${id}&_limit=${limit}`
        : `id_ne=${id}&_limit=${limit}`;
    const response = await axiosInstance.get(`/blogs?${queryString}`);
    return response.data;
  }
);

const relatedPostsSlice = createSlice({
  name: "relatePosts",
  initialState: {
    relatedPosts: [],
    loading: false,
    error: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRelatedPosts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchRelatedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedPosts = action.payload;
      })
      .addCase(fetchRelatedPosts.rejected, (state, action) => {
        state.loading = false;
        state.relatedPosts = [];
        state.error = true;
        state.errorMessage = action.error?.message;
      });
  },
});

export default relatedPostsSlice.reducer;
