import { createSlice } from '@reduxjs/toolkit';

import sortByDate from './sortByDate';

import constants from '../settings/constants';

import { ExpenseItem } from '../settings/interfaces';

const initialState: { list: ExpenseItem[] } = { list: [] };

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload.list;
    },
    addItem: (state, action) => {
      state.list = sortByDate([action.payload.item, ...state.list]);
    },
    removeItem: (state, action) => {
      state.list = state.list.filter(
        (item: ExpenseItem) => item.id !== action.payload.item.id
      );
    },
    replaceItem: (state, action) => {
      state.list = sortByDate(
        state.list.map((item: ExpenseItem) =>
          item.id === action.payload.item.id ? action.payload.item : item
        )
      );
    },
    setCategoryToItem: (state, action) => {
      state.list = state.list.map((item: ExpenseItem) =>
        item.id === action.payload.item.id
          ? { ...item, category: action.payload.item.category }
          : item
      );
    },
    clearListFromCategory: (state, action) => {
      state.list = state.list.map((item: ExpenseItem) =>
        item.category.id === action.payload.category.id
          ? {
              ...item,
              category: constants.defaultCategory,
            }
          : item
      );
    },
    refreshItemByCategory: (state, action) => {
      state.list = state.list.map((item: ExpenseItem) =>
        item.category.id === action.payload.category.id
          ? { ...item, category: action.payload.category }
          : item
      );
    },
  },
});

export default listSlice;
