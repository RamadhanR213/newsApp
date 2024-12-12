import { configureStore } from '@reduxjs/toolkit';
import savedNewsReducer from './savedNewsSlice';

const store = configureStore({
  reducer: {
    savedNews: savedNewsReducer,
  },
});

export default store;
