import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

/* ---------------- TYPES ---------------- */

interface Guide {
  id: number;
  name: string;
  email: string;
  status: string;
}

interface GuideDetail {
  guide: Guide;
}

interface GuidesResponse {
  content: Guide[];
  totalPages: number;
}

interface GuidesState {
  data: Guide[];
  totalPages: number;
  loading: boolean;
  guideDetail: GuideDetail | null;
}

/* ---------------- API CALLS ---------------- */

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

/* ---------------- THUNKS ---------------- */

export const getGuides = createAsyncThunk<
  GuidesResponse,
  { filters: any; page: number; size: number }
>("guides/getGuides", async ({ filters, page, size }) => {
  return await fetchGuides(filters, page, size);
});

export const getGuideById = createAsyncThunk<GuideDetail, number>(
  "guides/getGuideById",
  async (id) => {
    return await fetchGuideById(id);
  }
);

export const approveGuide = createAsyncThunk<string, number>(
  "guides/approveGuide",
  async (id) => {
    return await approveGuideApi(id);
  }
);

export const rejectGuide = createAsyncThunk<string, number>(
  "guides/rejectGuide",
  async (id) => {
    return await rejectGuideApi(id);
  }
);

/* ---------------- INITIAL STATE ---------------- */

const initialState: GuidesState = {
  data: [],
  totalPages: 0,
  loading: false,
  guideDetail: null,
};

/* ---------------- SLICE ---------------- */

const guidesSlice = createSlice({
  name: "guides",
  initialState,
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