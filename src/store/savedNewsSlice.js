import { createSlice } from '@reduxjs/toolkit';

const savedNewsSlice = createSlice({
  name: 'savedNews',
  initialState: {
    items: JSON.parse(localStorage.getItem('savedNews')) || [], 
  },
  reducers: {
    saveNews: (state, action) => {
      state.items.push(action.payload); 
      localStorage.setItem('savedNews', JSON.stringify(state.items)); 
    },
    unsaveNews: (state, action) => {
      state.items = state.items.filter((item) => item.web_url !== action.payload.web_url); 
      localStorage.setItem('savedNews', JSON.stringify(state.items)); 
    },
  },
});

export const { saveNews, unsaveNews } = savedNewsSlice.actions;
export default savedNewsSlice.reducer;
