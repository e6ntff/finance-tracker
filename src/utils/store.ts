import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';

import api from './api';

import listSlice from './listSlice';

import categorySlice from './categorySlice';
import { useSelector } from 'react-redux';

const rootReducer = combineReducers({
  list: listSlice.reducer,
  category: categorySlice.reducer,
});

const saveState = (state: any) => {
  try {
    const ListToLocal = JSON.stringify(state.rootReducer.list.list);
    const categoriesToLocal = JSON.stringify(
      state.rootReducer.category.categories
    );

    localStorage.setItem('list', ListToLocal);
    localStorage.setItem('categories', categoriesToLocal);
  } catch (err) {
    console.error('localStorage saving error: ', err);
  }
};

const saveStateMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  saveState(store.getState());
  return result;
};

const GlobalStore = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, saveStateMiddleware),
});

const getList = (state: any) => state.rootReducer.list.list;

export { getList };

const getCategories = (state: any) => state.rootReducer.category.categories;

export { getCategories };

const getReducer = (state: any) => state.rootReducer;

export { getReducer };

export default GlobalStore;

export const { addCategory, removeCategory, replaceCategory } =
  categorySlice.actions;

export const {
  setList,
  addItem,
  removeItem,
  setCategoryToItem,
  replaceItem,
  refreshItemByCategory,
  clearListFromCategory
} = listSlice.actions;
