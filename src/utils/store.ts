import { configureStore } from '@reduxjs/toolkit';
import sortByDate from './sortByDate';

interface GlobalState {
  list: ExpenseItem[];
}

const InitialState: GlobalState = {
  list: JSON.parse(localStorage.getItem('list') || '[]'),
};

const listReducer = (
  state: GlobalState = InitialState,
  action: AddItemAction | RemoveItemAction | ReplaceItemAction | SetListAction
) => {
  switch (action.type) {
    case 'SET':
      return { list: action.newList };
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
    default:
      return state;
  }
};

const saveState = (state: GlobalState) => {
  try {
    const ListToLocal = JSON.stringify(state.list);
    localStorage.setItem('list', ListToLocal);
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
