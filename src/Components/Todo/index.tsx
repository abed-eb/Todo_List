import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { useState, useEffect } from "react";
import moment from "moment";

interface props {
  todo: todo;
  handleDelete: (todo: todo) => void;
  handleEdit: (todo: todo, newTodo: todo) => void;
  handleCompletion: (todo: todo) => void;
  handleDueChange: (e: any) => void;
}

const Todo = ({
  todo,
  handleDelete,
  handleEdit,
  handleCompletion,
  handleDueChange,
}: props) => {
  const [editingTodo, setEditingTodo] = useState<todo | null>(null);
  const [newDue, setNewDue] = useState<Date | null>(moment(todo.due).toDate());
  const [newTodo, setNewTodo] = useState<todo>({
    id: todo.id,
    text: todo.text,
    completed: todo.completed,
    due: todo.due,
  });

  const handleChange = (todo: todo | null) => {
    if (todo) handleCompletion(todo);
  };

  const onEdit = (todo: todo) => {
    setEditingTodo(todo);
  };
  const onTextChange = (e: any) => {
    setNewTodo((prevState) => ({
      ...prevState,
      text: e.target.value,
    }));
  };

  const onDueChange = (e: any) => {
    let due = moment(e.target.value).toDate();
    setNewDue(due);
    setNewTodo((prevState) => ({
      ...prevState,
      due: due,
    }));
  };

  const onEditComplete = (todo: todo) => {
    setEditingTodo(null);
    handleEdit(todo, newTodo);
  };

  return (
    <div className="flex justify-between items-center h-10">
      <div className="flex w-full items-center">
        {!editingTodo ? (
          <div className="flex w-full flex-row justify-between items-center">
            <div className="flex flex-row items-center basis-1/2">
              <div className="flex items-center mr-4 ml-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleChange(todo)}
                  className="accent-sky-200 focus:ring-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <h1
                className={todo.completed ? "line-through text-gray-500" : ""}
              >
                {todo.text}
              </h1>
            </div>
            <div className="basis-1/4">
              Due: {moment(todo.due).format("MMMM Do YYYY, h:mm:ss a")}
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-row items-center">
            <div className="basis-1/2">
              <input
                className="block outline-0 w-full p-4 ps-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                onChange={(e) => onTextChange(e)}
                value={newTodo.text}
              />
            </div>
            <div className="basis-1/2 ml-2 mr-2">
              <input
                className="block dark:[color-scheme:dark] w-full p-4 ps-2 text-sm text-gray-900 border outline-0 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                onChange={(e) => onDueChange(e)}
                type="datetime-local"
                value={moment(newDue).format("YYYY-MM-DDTHH:mm")}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex w-32 items-center justify-around">
        {!editingTodo ? (
          <IconButton
            onClick={() => onEdit(todo)}
            aria-label="edit"
            size="medium"
          >
            <EditIcon sx={{ color: "#ffffff" }} fontSize="inherit" />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => onEditComplete(todo)}
            aria-label="edit"
            size="medium"
          >
            <FileDownloadDoneIcon
              sx={{ color: "#ffffff" }}
              fontSize="inherit"
            />
          </IconButton>
        )}

        <IconButton
          onClick={() => handleDelete(todo)}
          aria-label="delete"
          size="medium"
        >
          <DeleteIcon sx={{ color: "#ffffff" }} fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
};

export default Todo;
