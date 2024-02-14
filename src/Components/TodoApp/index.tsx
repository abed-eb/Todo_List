import { useEffect, useState } from "react";
import { HiBellAlert } from "react-icons/hi2";
import Todo from "../Todo/index";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  editTodo,
  deleteTodo,
  completeTodo,
  addTodo,
} from "../../TodoListSlice";
import { useTodoDispatch, useTodoSelector } from "../../TodoListHooks";
import moment from "moment";

const TodoApp = () => {
  const initalTodo = {
    id: "",
    text: "",
    completed: false,
    due: "",
  };
  const dispatch = useTodoDispatch();
  const todosList = useTodoSelector((state) => state.todoList.todos);
  const [value, setValue] = useState<string>("");
  const [due, setDue] = useState<Date | null>(null);
  // const [todo, setTodo] = useState<todo>(initalTodo);
  const [todos, setTodos] = useState<todo[]>(todosList);
  const [completedTodos, setCompletedTodos] = useState<todo[]>([]);
  const [completeAccExpanded, setCompleteAccExpanded] =
    useState<boolean>(false);
  const [todoAccExpanded, setTodoAccExpanded] = useState<boolean>(false);

  const handleValueChange = (e: any) => {
    let value = e.target.value;
    setValue(value);
  };

  const handleDueChange = (e: any) => {
    let due = moment(e.target.value).toDate();
    setDue(due);
  };

  const handleAddTodo = (e: any) => {
    e.preventDefault();
    let todosCopy = [...todos];
    if (value === "" || !due) return;
    let len = todosCopy.length;
    let id = 0;
    let todo: todo | null = null;
    if (todosCopy.length > 0) {
      id = parseInt(todosCopy[len - 1].id) + 1;
      todo = {
        id: id.toString(),
        text: value,
        completed: false,
        due: moment(due).format("MMMM Do YYYY, h:mm:ss a"),
      };
    } else
      todo = {
        id: id.toString(),
        text: value,
        completed: false,
        due: moment(due).format("MMMM Do YYYY, h:mm:ss a"),
      };
    todosCopy.push(todo);
    dispatch(addTodo(todo));
    setTodos(todosCopy);
    setValue("");
    setDue(null);
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

  const handleEdit = (todo: todo, newTodo: todo) => {
    let todosCopy = [...todos];
    let index = todosCopy.indexOf(todo);
    let temp = {
      id: todo.id,
      text: newTodo.text,
      completed: todo.completed,
      due: newTodo.due,
    };
    todosCopy[index] = temp;
    let updateTodo = { prev: todo, new: newTodo };
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
      due: todo.due,
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
            <h1>Enter your task</h1>
          </div>

          <div className="flex flex-row items-center mt-2">
            <div className="relative basis-1/2">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <HiBellAlert size={20} color="white" />
              </div>
              <input
                className="block w-full p-4 ps-10 text-sm text-white outline-0 rounded-lg bg-violet-900"
                onChange={handleValueChange}
                value={value}
                placeholder="Type you todo"
              />
            </div>
            <div className="basis-2/3 ml-2 mr-2">
              <input
                className="block dark:[color-scheme:dark] w-full p-4 ps-2 text-sm text-white outline-0 rounded-lg bg-violet-900"
                onChange={handleDueChange}
                type="datetime-local"
                value={moment(due).format("YYYY-MM-DDTHH:mm")}
              />
            </div>
            <div className="basis-1/3">
              <button
                type="submit"
                onClick={handleAddTodo}
                className="text-white w-full bg-violet-900 hover:bg-violet-900 font-medium rounded-lg text-sm py-4"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-4">
        <div>
          <Accordion
            sx={{
              backgroundColor: "#4c1d95",
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
                            handleDueChange={handleDueChange}
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
              backgroundColor: "#4c1d95",
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
                        handleDueChange={handleDueChange}
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
