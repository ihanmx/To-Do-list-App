import React, { useContext, useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { todosContext } from "../contexts/todosContext";

export default function TodoList() {
  const [alignment, setAlignment] = useState("left");
  const { todos, setTodos } = useContext(todosContext); // Destructure context

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [titleInput, setTitlenput] = useState("");
  const [displayedTodosType, setDisplayedTodos] = useState("all");

  // FILTERAION ARRAYS
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });

  const inCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosTobeRendered = todos;
  if (displayedTodosType == "all") {
    todosTobeRendered = todos;
  } else if (displayedTodosType == "complete") {
    todosTobeRendered = completedTodos;
  } else if (displayedTodosType == "incomplete") {
    todosTobeRendered = inCompletedTodos;
  }

  const todosmap = todosTobeRendered.map((t) => <Todo key={t.id} todo={t} />);

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(storageTodos);
  }, []);
  function changeDisplayType(e) {
    setDisplayedTodos(e.target.value);
  }
  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitlenput("");
  }

  return (
    // DELETE MODAL

    <React.Fragment>
      <Container maxWidth="md">
        <Card
          sx={{ minWidth: 275, padding: "20px" }}
          style={{ maxHeight: "80vh", overflow: "scroll" }}
        >
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              gutterBottom
              variant="h2"
              style={{ fontWeight: "bold" }}
            >
              مهامي
            </Typography>
            <Divider />
            {/* Filter buttons */}
            <ToggleButtonGroup
              value={displayedTodosType}
              exclusive
              onChange={changeDisplayType}
              aria-label="text alignment"
              style={{ direction: "ltr", marginTop: "30px" }}
              color="primary"
            >
              <ToggleButton value="incomplete">غير المنجز</ToggleButton>
              <ToggleButton value="complete">المنجز</ToggleButton>
              <ToggleButton value="all">الكل</ToggleButton>
            </ToggleButtonGroup>
            {/* Todos */}
            {todosmap}
          </CardContent>

          {/* INPUT+ADD button */}
          <Grid container style={{ marginTop: "20px" }} spacing={2}>
            {/* input */}
            <Grid
              size={8}
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              {" "}
              <TextField
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                style={{ width: "100%" }}
                value={titleInput}
                onChange={(i) => {
                  setTitlenput(i.target.value);
                }}
              />
            </Grid>
            {/* Button */}
            <Grid
              size={4}
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              {" "}
              <Button
                variant="contained"
                style={{ width: "100%", height: "100%" }}
                onClick={handleAddClick}
                disabled={titleInput == 0}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </React.Fragment>
  );
}
