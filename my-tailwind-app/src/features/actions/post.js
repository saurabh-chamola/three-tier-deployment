
// -----------------------------------------------------------------------------------------------------

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../interceptor";

export const fetchPost = createAsyncThunk(
    "post/fetchPost",
    async (_ , { rejectWithValue }) => {
        try {
            const { data } = await instance.get(
                `/post`,
                {
                    withCredentials: true,
                }
            );

            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);