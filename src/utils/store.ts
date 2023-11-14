import { configureStore } from '@reduxjs/toolkit';

interface GlobalState {
  list: ExpenseItem[];
}

const InitialState: GlobalState = {
  list: [],
};

const listReducer = (
  state: GlobalState = InitialState,
  action: AddItemAction | RemoveItemAction | ReplaceItemAction | SetListAction
) => {
  switch (action.type) {
    case "SET":
      return {list: action.newList}
    case 'ADD':
      return { ...state, list: [action.newItem, ...state.list] };
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

const GlobalStore = configureStore({
  reducer: listReducer,
});

export default GlobalStore;
