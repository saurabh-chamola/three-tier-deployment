import { createSlice } from "@reduxjs/toolkit";
import { fetchPost } from "../actions/post"; // assume this is a createAsyncThunk

const initialState = {
  postData: [],
  isLoading: false,
  isError: false,              // ✅ missing in your code
  errorMessage: "",            // ✅ good to have
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // You can add sync reducers later if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postData = action.payload.data;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.error?.message || "Something went wrong";
      });
  },
});

export default postSlice.reducer;
