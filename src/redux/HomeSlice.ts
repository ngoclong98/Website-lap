import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Banner from "src/models/Banner";
import DonateTarget from "src/models/DonateTarget";
import Paging from "src/models/Paging";
import UserProfile from "src/models/UserProfile";
import { getBanner, getHomeDonateTarget, getPopularUser } from "src/api";
import { RootState } from "./store";
import HomeDonateTargetRequestParam from "src/models/RequestParam/HomeDonateTargetRequestParam";

interface HomeState {
  banner: Banner[];
  donateTarget: Paging<DonateTarget> | undefined;
  popularUser: UserProfile[];
  loadingPopularUser: boolean;
  loadingDonateTarget: boolean;
  loadingMoreDonateTarget: boolean;
}

const initialState: HomeState = {
  banner: [],
  donateTarget: undefined,
  popularUser: [],
  loadingPopularUser: true,
  loadingDonateTarget: true,
  loadingMoreDonateTarget: true,
};

const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.banner = action.payload;
      })
      .addCase(fetchBanner.pending, (state, action) => {
        state.loadingPopularUser = true;
      })
      .addCase(fetchPopularUser.fulfilled, (state, action) => {
        state.popularUser = action.payload;
        state.loadingPopularUser = false;
      })
      .addCase(fetchPopularUser.rejected, (state, action) => {
        state.loadingPopularUser = false;
      })
      .addCase(fetchDonateTarget.pending, (state, action) => {
        if (action.meta.arg.nextPageId) {
          state.loadingMoreDonateTarget = true;
        } else {
          state.loadingDonateTarget = true;
        }
      })
      .addCase(fetchDonateTarget.fulfilled, (state, action) => {
        const nextPageId = action.meta.arg.nextPageId;
        const data = action.payload as Paging<DonateTarget>;
        if (nextPageId) {
          state.donateTarget = {
            nextPageId: data.nextPageId,
            list: (state.donateTarget?.list || []).concat(data.list),
          };
        } else {
          state.donateTarget = data;
        }
        state.loadingDonateTarget = false;
        state.loadingMoreDonateTarget = false;
      })
      .addCase(fetchDonateTarget.rejected, (state, action) => {
        state.loadingDonateTarget = false;
        state.loadingMoreDonateTarget = false;
      });
  },
});
// Async Action
export const fetchBanner = createAsyncThunk("home/fetchBanner", async () => {
  const bannerRes = await getBanner();
  return bannerRes.data?.list;
});

export const fetchPopularUser = createAsyncThunk(
  "home/fetchPopularUser",
  async () => {
    const popularUserRes = await getPopularUser();
    return popularUserRes.data;
  }
);

export const fetchDonateTarget = createAsyncThunk(
  "home/fetchDonateTarget",
  async (params: HomeDonateTargetRequestParam) => {
    const { nextPageId, hasOnHome = false } = params;
    const homeDonateTargetRes = await getHomeDonateTarget(
      nextPageId,
      hasOnHome
    );
    console.log("homeDonateTargetRes", homeDonateTargetRes);
    return homeDonateTargetRes.data;
  }
);

// Selector

export const selectBanner = (state: RootState) => state.home.banner;
export const selectPopularBanner = (state: RootState) => state.home.popularUser;
export const selectLoadingPopularBanner = (state: RootState) =>
  state.home.loadingPopularUser;
export const selectDonateTarget = (state: RootState) => state.home.donateTarget;
export const selectLoadingDonateTarget = (state: RootState) =>
  state.home.loadingDonateTarget;
export const selectLoadingMoreDonateTarget = (state: RootState) =>
  state.home.loadingMoreDonateTarget;

export default HomeSlice.reducer;
