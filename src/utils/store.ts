import { configureStore } from '@reduxjs/toolkit';
import sortByDate from './sortByDate';

const InitialState: GlobalState = {
  list: JSON.parse(localStorage.getItem('list') || '[]'),
  categories: JSON.parse(localStorage.getItem('categories') || '[]'),
};

const listReducer = (
  state: GlobalState = InitialState,
  action:
    | AddItemAction
    | RemoveItemAction
    | ReplaceItemAction
    | SetListAction
    | AddCategoryAction
    | RemoveCategoryAction
    | ReplaceCategoryAction
) => {
  switch (action.type) {
    case 'SET':
      return { ...state, list: action.newList };
    case 'ADD':
      return { ...state, list: sortByDate([action.newItem, ...state.list]) };
    case 'REMOVE':
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.itemToRemove.id),
      };
    case 'REPLACE':
      return {
        ...state,
        list: state.list.map((el: ExpenseItem) =>
          el.id === action.itemToChange.id ? action.itemToChange : el
        ),
      };
    case 'ADD_CAT':
      return { ...state, categories: [action.category, ...state.categories] };
    case 'REMOVE_CAT':
      return {
        ...state,
        categories: state.categories.filter(
          (cat: category) => cat.id !== action.category.id
        ),
      };
    case 'REPLACE_CAT':
      return {
        ...state,
        categories: state.categories.map((cat: category) =>
          cat.id === action.category.id ? action.category : cat
        ),
      };
    default:
      return state;
  }
};

const saveState = (state: GlobalState) => {
  try {
    const ListToLocal = JSON.stringify(state.list);
    const categoriesToLocal = JSON.stringify(state.categories);

    localStorage.setItem('list', ListToLocal);
    localStorage.setItem('categories', categoriesToLocal);
  } catch (err) {
    console.error('localStorage saving error: ', err);
  }
};

const GlobalStore = configureStore({
  reducer: listReducer,
});

GlobalStore.subscribe(() => {
  saveState(GlobalStore.getState());
});

export default GlobalStore;
