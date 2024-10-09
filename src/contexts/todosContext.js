import { createContext, useReducer, useContext } from "react";
import todosReducer from "../reducers/todosReducer";

export const todosContext = createContext([]);
export const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);

  return (
    <todosContext.Provider value={{ todos: todos, dispatch: dispatch }}>
      {children}
    </todosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(todosContext);
};
