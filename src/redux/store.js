import { configureStore } from '@reduxjs/toolkit';

import testReducer from './test/test';

export default configureStore({
  reducer: {
    test: testReducer,
  },
});
