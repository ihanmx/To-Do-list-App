import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useTodos } from "../contexts/todosContext";
import { useContext } from "react";
import * as React from "react";
import { useToast } from "../contexts/ToastContext";

export default function Todo({ todo, showDelete, showUpdate }) {
  const { todos, dispatch } = useTodos();
  const { showHideToast } = useToast();

  function handleCheckClick() {
    dispatch({ type: "handleCheckClick", payload: { todo } });
    showHideToast("تم التعديل بنجاح");
  }

  const handleDeleteClick = () => {
    showDelete(todo);
  };

  const handleUpdateClick = () => {
    showUpdate(todo);
  };

  return (
    <>
      <Card
        className="todoCard"
        sx={{
          minWidth: 545,
          backgroundColor: "#283593",
          color: "white",
          marginTop: "5px",
        }}
      >
        <CardContent>
          {/* Task */}
          <Grid container>
            <Grid size={8}>
              <Typography
                variant="h5"
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6">{todo.details}</Typography>
            </Grid>

            {/* Action Buttons */}
            <Grid size={4} display={"flex"} justifyContent={"space-around"}>
              {/* DELETE BUTTON */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "red",
                  backgroundColor: "white",
                  border: "solid red 3px ",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
              {/* CHECHICONBUTTON */}
              <IconButton
                className="iconButton"
                aria-label="Chek"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  backgroundColor: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px ",
                }}
                onClick={handleCheckClick}
              >
                <CheckIcon />
              </IconButton>

              {/* UPDATE ICON */}
              <IconButton
                className="iconButton"
                aria-label="update"
                style={{
                  color: "#1769aa",
                  backgroundColor: "white",
                  border: "solid #1769aa 3px ",
                }}
                onClick={handleUpdateClick}
              >
                <BorderColorIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
