import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './Store'
interface TodosState {
  todos: todo[]
}


export const todoListSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
  } as TodosState,
  reducers: (create) => ({
    deleteTodo: create.reducer<todo>((state, action) => {
      console.log(action.payload)
      let todo = action.payload
      let index = state.todos.indexOf(todo);
      state.todos.splice(index, 1);
    }),
    addTodo: create.preparedReducer(
      (todo: todo) => {
        return { payload: todo }
      },
      (state, action) => {
        state.todos.push(action.payload)
      }
    ),
    editTodo: create.preparedReducer(
      (todo: {prev:todo ,new: todo}) => {
        return { payload: todo }
      },
      (state, action) => {
        let index = state.todos.indexOf(action.payload.prev);
        state.todos[index] = action.payload.new
      }
    ),
    completeTodo: create.preparedReducer(
      (todo: todo) => {
        return { payload: todo }
      },
      (state, action) => {
        let index = state.todos.indexOf(action.payload);
        state.todos[index] = action.payload
      }
    )
  }),
})


// Action creators are generated for each case reducer function
export const { editTodo, deleteTodo, completeTodo, addTodo} = todoListSlice.actions

export const selectTodos = (state: RootState) => state.todoList

export default todoListSlice.reducer