import { createSlice } from '@reduxjs/toolkit'

export const todoListSlice = createSlice({
  name: 'todolist',
  initialState: {
    todos: [],
  },
  reducers: {
    edit: (state) => {
        console.log("edit todo")
        console.log(state)
    },
    remove: (state) => {
        console.log("remove todo")
        console.log(state)
    },
    complete: (state, action) => {
        console.log("complete todo")
        console.log(state)
    },
  },
})

// Action creators are generated for each case reducer function
export const { edit, remove, complete} = todoListSlice.actions

export default todoListSlice.reducer