import TodoList from "./components/TodoList";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { todosContext } from "./contexts/todosContext.js";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { ToastProvider } from "./contexts/ToastContext.js";
import { TodosProvider } from "./contexts/todosContext.js";
const theme = createTheme({
  typography: {
    fontFamily: ["A"],
  },

  palette: { primary: { main: "#dd2c00" } },
});

const initialtodos = [
  {
    id: uuidv4(),
    title: "قراءة كتاب ",
    details: "اكمال القراءة",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب ",
    details: "اكمال القراءة",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءة كتاب ",
    details: "اكمال القراءة",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialtodos);

  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div
            style={{
              direction: "rtl",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#191b1f",
            }}
          >
            <TodoList />
          </div>
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
