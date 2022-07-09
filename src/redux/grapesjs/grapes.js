import { createSlice } from '@reduxjs/toolkit';


const grapeSlice = createSlice({
  name: 'graphes',
  initialState: {
    editor: null,
  },
});

export default grapeSlice.reducer;
