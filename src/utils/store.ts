import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';

import api from './api';

import listSlice from './listSlice';
import categorySlice from './categorySlice';
import userSlice from './userSlice';

import pushDataToServer from './pushData';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  list: listSlice.reducer,
  category: categorySlice.reducer,
});

const saveState = (state: any) => {
  try {
    if (Object.keys(state.rootReducer.user.user).length) {
      pushDataToServer(state.rootReducer.user.user.uid, {
        list: state.rootReducer.list.list || [],
        categories: state.rootReducer.category.categories || [],
      });
    }
  } catch (error: any) {
    console.error(`Saving error: ${error}`);
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

export const {
  setCategories,
  addCategory,
  removeCategory,
  replaceCategory,
} = categorySlice.actions;

export const {
  setList,
  addItem,
  removeItem,
  setCategoryToItem,
  replaceItem,
  refreshItemByCategory,
  clearListFromCategory,
} = listSlice.actions;

export const { setUser } = userSlice.actions;
