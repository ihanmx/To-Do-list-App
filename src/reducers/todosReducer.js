import { v4 as uuidv4 } from "uuid";

export default function todosReducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.titleInput,
        details: "",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }

    case "deleted": {
      const updatedTodos = currentTodos.filter(
        (t) => t.id !== action.payload.deleteDialogTodo.id
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "updated": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.updateDialogTodo.id) {
          return {
            ...t,
            title: action.payload.updatedTodo.title,
            details: action.payload.updatedTodo.details,
          }; // Update the matching todo
        }
        return t; // Return the unmodified todo
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos; // Set the updated todos array
    }

    case "handleCheckClick": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          // Compare with action.payload.id
          return { ...t, isCompleted: !t.isCompleted }; // Toggle the isCompleted status
        }
        return t; // Return the unmodified todo
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "getTodosForfirstRender": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }
    default:
      throw Error("Unknown action" + action.type);
  }
}
