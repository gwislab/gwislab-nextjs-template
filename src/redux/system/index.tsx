import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ISystemState } from "./interface";

export const SystemSlice = createSlice({
  initialState: {
    loading: false,
    showMenu: false,
    connectedUser: null
  } as ISystemState,
  name: "system",
  reducers: {
    toggleMenu: (state) => {
      return { ...state, showMenu: !state.showMenu };
    },

    startLoading: (state) => {
      return { ...state, loading: true };
    },

    finishLoading: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        location.reload();
      }
      return { ...state, loading: false };
    },

    setConnectedUser: (state, action) => {
      return { ...state, connectedUser: action.payload };
    }
  }
});

export const { startLoading, finishLoading, toggleMenu, setConnectedUser } =
  SystemSlice.actions;

export default SystemSlice.reducer;
