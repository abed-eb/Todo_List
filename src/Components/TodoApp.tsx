import { useState } from "react";
import { HiBellAlert } from "react-icons/hi2";
import Todo from "./Todo";

const TodoApp = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);

  const handleChange = (e: any) => {
    setTodo(e.target.value);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    let todosCopy = [...todos];
    todosCopy.push(todo);
    setTodos(todosCopy);
    setTodo("");
  };

  return (
    <div className="container mx-auto h-screen">
      <div>
        <form>
          <div className="flex justify-center items-center text-white font-bold h-10">
            <h1>Type your tasks</h1>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <HiBellAlert size={20} color="white" />
            </div>
            <input
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange}
              value={todo}
              placeholder="Type you todo"
            />
            <button
              type="submit"
              onClick={handleClick}
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4">
        {todos.map((todo, index) => {
          return (
            <div className="mt-2" key={index}>
              <Todo title={todo} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoApp;
