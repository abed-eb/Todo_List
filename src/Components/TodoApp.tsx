import { useEffect, useState } from "react";
import { HiBellAlert } from "react-icons/hi2";
import Todo from "./Todo";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { editTodo, deleteTodo, completeTodo, addTodo } from "../TodoListSlice";
import { useTodoDispatch, useTodoSelector } from "../TodoListHooks";

const TodoApp = () => {
  const initalTodo = {
    id: "",
    text: "",
    completed: false,
  };
  const dispatch = useTodoDispatch();
  const todosList = useTodoSelector((state) => state.todoList.todos);
  const [value, setValue] = useState<string>("");
  const [todo, setTodo] = useState<todo>(initalTodo);
  const [todos, setTodos] = useState<todo[]>(todosList);
  const [completedTodos, setCompletedTodos] = useState<todo[]>([]);
  const [completeAccExpanded, setCompleteAccExpanded] =
    useState<boolean>(false);
  const [todoAccExpanded, setTodoAccExpanded] = useState<boolean>(false);

  const handleChange = (e: any) => {
    let value = e.target.value;
    setValue(value);
    let todosCopy = [...todos];
    let len = todosCopy.length;
    let id = 0;
    let todo: todo | null = null;
    if (todosCopy.length > 0) {
      id = parseInt(todosCopy[len - 1].id) + 1;
      todo = {
        id: id.toString(),
        text: value,
        completed: false,
      };
    } else
      todo = {
        id: id.toString(),
        text: value,
        completed: false,
      };
    setTodo(todo);
  };

  const handleAddTodo = (e: any) => {
    e.preventDefault();
    let todosCopy = [...todos];
    if (todo) todosCopy.push(todo);
    dispatch(addTodo(todo));
    setTodos(todosCopy);
    setValue("");
    setTodo(initalTodo);
    setTodoAccExpanded(true);
  };

  const handleCompleteAccExpand = (state: boolean) => {
    setCompleteAccExpanded(state);
  };

  const handleTodoAccExpand = () => {
    setTodoAccExpanded(!todoAccExpanded);
  };

  const handleDelete = (todo: todo) => {
    let todosCopy = [...todos];
    let index = todosCopy.indexOf(todo);
    todosCopy.splice(index, 1);
    dispatch(deleteTodo(todo));
    filterCompletedTodos(todosCopy);
    setTodos(todosCopy);
  };

  const handleEdit = (todo: todo, newTodo: string) => {
    let todosCopy = [...todos];
    let index = todosCopy.indexOf(todo);
    let temp = {
      id: todo.id,
      text: newTodo,
      completed: todo.completed,
    };
    todosCopy[index] = temp;
    let updateTodo = { prev: todo, new: temp };
    dispatch(editTodo(updateTodo));
    filterCompletedTodos(todosCopy);
    setTodos(todosCopy);
  };

  const handleCompletion = (todo: todo) => {
    let todosCopy = [...todos];
    let index = todosCopy.indexOf(todo);
    if (!todosCopy[index].completed) {
      handleCompleteAccExpand(true);
    } else if (
      todos.some((todo) => {
        return todo.completed === true;
      })
    )
      handleCompleteAccExpand(true);
    dispatch(completeTodo(todo));
    let tempTodo = {
      id: todo.id,
      text: todo.text,
      completed: !todo.completed,
    };
    todosCopy[index] = tempTodo;
    filterCompletedTodos(todosCopy);
    setTodos(todosCopy);
  };

  const filterCompletedTodos = (latestTodos: todo[]) => {
    let completedTodos = latestTodos.filter((todo) => {
      return todo.completed === true;
    });
    setCompletedTodos(completedTodos);
  };

  return (
    <div className="container mx-auto h-screen">
      <div>
        <form>
          <div className="flex justify-center items-center text-white font-bold h-10">
            <h1>Enter your tasks</h1>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <HiBellAlert size={20} color="white" />
            </div>
            <input
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
              value={value}
              placeholder="Type you todo"
            />
            <button
              type="submit"
              onClick={handleAddTodo}
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4">
        <div>
          <Accordion
            sx={{
              backgroundColor: "#155e75",
              color: "white",
            }}
            expanded={todoAccExpanded}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={handleTodoAccExpand}
            >
              <Typography>Todo</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {todos.length > 0 &&
              todos.some((todo) => {
                return todo.completed === false;
              }) ? (
                todos.map((todo) => {
                  return (
                    <>
                      {!todo.completed ? (
                        <div className="mt-2" key={todo.id}>
                          <Todo
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            todo={todo}
                            handleCompletion={handleCompletion}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })
              ) : (
                <div className="flex w-full justify-center items-center">
                  <Typography
                    sx={{
                      fontSize: "15px",
                    }}
                  >
                    You have no tasks
                  </Typography>
                </div>
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              backgroundColor: "#155e75",
              color: "white",
            }}
            expanded={completeAccExpanded}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              onClick={() => handleCompleteAccExpand(!completeAccExpanded)}
            >
              <Typography>Done</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {completedTodos.length > 0 ? (
                todos.map((todo) => {
                  return (
                    <div className="mt-2" key={todo.id.concat("c")}>
                      <Todo
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        todo={todo}
                        handleCompletion={handleCompletion}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="flex w-full justify-center items-center">
                  <Typography
                    sx={{
                      fontSize: "15px",
                    }}
                  >
                    You have no tasks
                  </Typography>
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
