import { configureStore } from '@reduxjs/toolkit';
import sortByDate from './sortByDate';

const InitialState: GlobalState = {
  list: JSON.parse(localStorage.getItem('list') || '[]'),
  categories: [...JSON.parse(localStorage.getItem('categories') || '[]')],
};

if (!InitialState.categories.length || InitialState.categories[0].id !== 0) {
  InitialState.categories = [
    {
      id: 0,
      color: '#cccccc',
      name: 'No category',
    },
    ...InitialState.categories,
  ];
}

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
    | SetCategoryToItem
) => {
  switch (action.type) {
    case 'SET':
      return { ...state, list: sortByDate(action.newList) };
    case 'ADD':
      return { ...state, list: sortByDate([action.newItem, ...state.list]) };
    case 'REMOVE':
      return {
        ...state,
        list: state.list.filter(
          (item: ExpenseItem) => item.id !== action.itemToRemove.id
        ),
      };
    case 'REPLACE':
      return {
        ...state,
        list: sortByDate(
          state.list.map((item: ExpenseItem) =>
            item.id === action.itemToChange.id ? action.itemToChange : item
          )
        ),
      };
    case 'ADD_CAT':
      return { ...state, categories: [...state.categories, action.category] };
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
        list: state.list.map((item: ExpenseItem) =>
          item.category.id === action.category.id
            ? { ...item, category: action.category }
            : item
        ),
      };
    case 'SET_CAT':
      return {
        ...state,
        list: state.list.map((item: ExpenseItem) =>
          item.id === action.id ? { ...item, category: action.category } : item
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
