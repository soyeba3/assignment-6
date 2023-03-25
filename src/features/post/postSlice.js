import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

export const fetchPost = createAsyncThunk("post/fetchPost", async (id) => {
  const response = await axiosInstance.get(`/blogs/${id}`);
  return response.data;
});

export const increaseLike = createAsyncThunk(
  "post/increaseLike",
  async ({ id, like }) => {
    const res = await axiosInstance.patch(`/blogs/${id}`, { likes: like });
    return res.data;
  }
);
export const updateBookmark = createAsyncThunk(
  "post/updateBookmark",
  async (id) => {
    const res = await axiosInstance.patch(`/blogs/${id}`, { isSaved: true });
    return res.data;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: {},
    loading: false,
    error: false,
    errorMessage: "",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = false;
        state.post = {};
        state.error = true;
        state.errorMessage = action.error?.message;
      })
      .addCase(increaseLike.pending, (state) => {
        (state.loading = false),
          (state.error = false),
          (state.errorMessage = "");
      })
      .addCase(increaseLike.fulfilled, (state) => {
        (state.loading = false), (state.error = false), (state.post.likes += 1);
      })
      .addCase(increaseLike.rejected, (state, action) => {
        (state.loading = false),
          (state.error = true),
          (state.errorMessage = action.error.message);
      })
      .addCase(updateBookmark.pending, (state) => {
        (state.loading = false),
          (state.error = false),
          (state.errorMessage = "");
      })
      .addCase(updateBookmark.fulfilled, (state) => {
        (state.loading = false),
          (state.error = false),
          (state.post.isSaved = true);
      })
      .addCase(updateBookmark.rejected, (state, action) => {
        (state.loading = false),
          (state.error = true),
          (state.errorMessage = action.error.message);
      });
  },
});

export default postSlice.reducer;
