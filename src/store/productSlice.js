// store/productSlice.js
import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    currentPage: 1,
    hasMore: true,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    incrementPage: state => {
      state.currentPage += 1; // For pagination
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
  },
});

export const {setProducts, incrementPage, setHasMore} = productSlice.actions;
export default productSlice.reducer;
