import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  value: number;
}

const initialState: DashboardState = {
  value: 0,
};

const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } =
  DashboardSlice.actions;

export default DashboardSlice.reducer;
