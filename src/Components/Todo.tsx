import { useState } from "react";

interface props {
  title: string;
}

const Todo = ({ title }: props) => {
  const [completed, setCompleted] = useState<boolean>(false);

  const handleChange = (e: any) => {
    console.log(e.target.checked);
    setCompleted(e.target.checked);
  };
  return (
    <div className="flex bg-sky-300">
      <div className="flex items-center mr-4 ml-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <h1 className={completed ? "line-through text-gray-500" : ""}>{title}</h1>
    </div>
  );
};

export default Todo;
