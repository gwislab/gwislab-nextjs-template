import { configureStore } from '@reduxjs/toolkit';

import grapesReducer from './grapesjs/grapes';
import testReducer from './test/test';

export default configureStore({
  reducer: {
    test: testReducer,
    grapes: grapesReducer,
  },
});
