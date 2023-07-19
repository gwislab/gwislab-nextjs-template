import { configureStore } from "@reduxjs/toolkit";

import testReducer from "./language";

export default configureStore({
  reducer: {
    test: testReducer,
  },
});
