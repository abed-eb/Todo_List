import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import { useState } from "react";

interface props {
  title: string;
  handleDelete: (todo: string) => void;
  handleEdit: (todo: string, newTodo: string) => void;
}

const Todo = ({ title, handleDelete, handleEdit }: props) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<string | null>(null);
  const [newTodo, setNewTodo] = useState<string>(title);

  const handleChange = (e: any) => {
    console.log(e.target.checked);
    setCompleted(e.target.checked);
  };

  const onEdit = (todo: string) => {
    setEditingTodo(todo);
  };

  const onEditComplete = (title: string) => {
    setEditingTodo(null);
    console.log(editingTodo);
    handleEdit(title, newTodo);
  };

  return (
    <div className="flex justify-between items-center h-10">
      <div className="flex w-full items-center">
        {!editingTodo ? (
          <div className="flex items-center">
            <div className="flex items-center mr-4 ml-2">
              <input
                type="checkbox"
                checked={completed}
                onChange={handleChange}
                className="accent-sky-200 focus:ring-0 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <h1 className={completed ? "line-through text-gray-500" : ""}>
              {title}
            </h1>
          </div>
        ) : (
          <input
            className="block w-full p-3 ps-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
          />
        )}
      </div>
      <div className="flex w-32 items-center justify-around">
        {!editingTodo ? (
          <IconButton
            onClick={() => onEdit(title)}
            aria-label="edit"
            size="medium"
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => onEditComplete(title)}
            aria-label="edit"
            size="medium"
          >
            <FileDownloadDoneIcon fontSize="inherit" />
          </IconButton>
        )}

        <IconButton
          onClick={() => handleDelete(title)}
          aria-label="delete"
          size="medium"
        >
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
};

export default Todo;
