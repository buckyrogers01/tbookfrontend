import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const fetchGuides = async (filters: any, page: number, size: number) => {
  const response = await api.post(`/guides/all?page=${page}&size=${size}`, filters);
  return response.data;
};

const fetchGuideById = async (id: number) => {
  const response = await api.get(`/guides/${id}`);
  return response.data;
};

const approveGuideApi = async (id: number) => {
  const response = await api.post(`/guides/${id}/approve`);
  return response.data;
};

const rejectGuideApi = async (id: number) => {
  const response = await api.post(`/guides/${id}/reject`);
  return response.data;
};

export const getGuides = createAsyncThunk(
  "guides/getGuides",
  async ({ filters, page, size }: any) => {
    return await fetchGuides(filters, page, size);
  }
);

export const getGuideById = createAsyncThunk(
  "guides/getGuideById",
  async (id: number) => {
    return await fetchGuideById(id);
  }
);

export const approveGuide = createAsyncThunk(
  "guides/approveGuide",
  async (id: number) => {
    return await approveGuideApi(id);
  }
);

export const rejectGuide = createAsyncThunk(
  "guides/rejectGuide",
  async (id: number) => {
    return await rejectGuideApi(id);
  }
);

const guidesSlice = createSlice({
  name: "guides",
  initialState: {
    data: [],
    totalPages: 0,
    loading: false,
    guideDetail: null,
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
      })

      .addCase(getGuideById.fulfilled, (state, action) => {
        state.guideDetail = action.payload;
      })

      .addCase(approveGuide.fulfilled, (state) => {
        if (state.guideDetail) {
          state.guideDetail.guide.status = "VERIFIED";
        }
      })

      .addCase(rejectGuide.fulfilled, (state) => {
        if (state.guideDetail) {
          state.guideDetail.guide.status = "REJECTED";
        }
      });
  },
});

export default guidesSlice.reducer;