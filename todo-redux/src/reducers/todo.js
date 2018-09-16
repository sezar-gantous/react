import { getTodos, createTodo } from "../lib/todoServices";
const initState = {
  todos: [],
  currentTodo: ""
};

const CURRENT_UPATE = "CURRENT_UPATE";
const TODO_ADD = "TODO_ADD";
const TODOS_LOAD = "TODOS_LOAD";
export const updateCurrent = val => ({ type: CURRENT_UPATE, payload: val });
export const loadTodos = todos => ({ type: TODOS_LOAD, payload: todos });
export const addTodo = todo => ({ type: TODO_ADD, payload: todo });
export const fetchTodos = () => {
  return dispatch => {
    getTodos().then(todos => dispatch(loadTodos(todos)));
  };
};

export const saveTodo = name => {
  return dispatch => {
    createTodo(name).then(res => dispatch(addTodo(res)));
  };
};
export default (state = initState, action) => {
  switch (action.type) {
    case TODO_ADD:
      return {
        ...state,
        currentTodo: "",
        todos: state.todos.concat(action.payload)
      };
    case CURRENT_UPATE:
      return { ...state, currentTodo: action.payload };
    case TODOS_LOAD:
      return { ...state, todos: action.payload };
    default:
      return state;
  }
};
