// src/features/guides/guidesSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const fetchGuides = async (filters: any, page: number, size: number) => {
  const response = await api.post(
    `/guides/all?page=${page}&size=${size}`,
    filters
  );
  return response.data;
};

export const getGuides = createAsyncThunk(
  "guides/getGuides",
  async ({ filters, page, size }: any) => {
    return await fetchGuides(filters, page, size);
  }
);

const guidesSlice = createSlice({
  name: "guides",
  initialState: {
    data: [],
    totalPages: 0,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGuides.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGuides.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.content;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getGuides.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default guidesSlice.reducer;