import { createSlice } from '@reduxjs/toolkit';

import constants from '../settings/constants';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [
      constants.defaultCategory,
      ...JSON.parse(localStorage.getItem('categories') || '[]').filter(
        (cat: category) => cat.id !== 0
      ),
    ],
  },
  reducers: {
    addCategory: (state, action) => {
      state.categories = [...state.categories, action.payload.category];
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (cat: category) => cat.id !== action.payload.category.id
      );
    },
    replaceCategory: (state, action) => {
      state.categories = state.categories.map((cat: category) =>
        cat.id === action.payload.category.id ? action.payload.category : cat
      );
    },
  },
});

export default categorySlice;
