import { createSlice } from '@reduxjs/toolkit';

const incrementCountAction = (state, action) => {
  state.count = state.count + action.payload || 1;
};
const decrementCountAction = (state, action) => {
  state.count = state.count - action.payload || 1;
};

const testSlice = createSlice({
  name: 'test',
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
