import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ITestState } from "./interface";

const incrementCountAction = (
  state: ITestState,
  action: PayloadAction<number>
) => {
  state.count = state.count + action.payload || 1;
};

const decrementCountAction = (
  state: ITestState,
  action: PayloadAction<number>
) => {
  state.count = state.count - action.payload || 1;
};

const testSlice = createSlice({
  name: "test",
  initialState: {
    count: 0,
  },
  reducers: {
    incrementCount: incrementCountAction,
    decrementCount: decrementCountAction,
  },
});

export const { incrementCount, decrementCount } = testSlice.actions;
export default testSlice.reducer;
