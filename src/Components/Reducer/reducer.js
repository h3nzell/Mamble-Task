export function reducer(state, action) {
    switch (action.type) {
      case "getToDos":
        return action.payload.todos;
      case "addToDo":
        return [action.payload, ...state];
      case "deleteToDo":
        return [...state.filter((todo) => todo.id !== action.payload.id)];
      default:
        return state;
    }
  }
  
