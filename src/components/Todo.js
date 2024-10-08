import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { todosContext } from "../contexts/todosContext";
import { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(todosContext);

  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, isCompleted: !t.isCompleted }; // Return the updated todo
      }
      return t; // Return the unmodified todo
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  const [Dopen, setDopen] = React.useState(false);
  const [Uopen, setUopen] = React.useState(false);
  const [updatedTodo, setUpdatedTodo] = React.useState({
    title: todo.title,
    details: todo.details,
  });

  const handleDeleteClick = () => {
    setDopen(true);
  };

  const handleUpdateClick = () => {
    setUopen(true);
  };

  const handleDeleteDialogClose = () => {
    setDopen(false);
  };

  const handleUpdateDialogClose = () => {
    setUopen(false);
  };

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      if (t.id == todo.id) {
        return false;
      } else return true;
      // Return t.is!=todo.id
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details }; // Update the matching todo
      }
      return t; // Return the unmodified todo
    });

    setTodos(updatedTodos); // Set the updated todos array
    setUopen(false); // Close the update dialog
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  return (
    <>
      {/* DELETE DIALOG */}

      <Dialog
        open={Dopen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">
          {" هل أنت متأكد أنك تريد حذف هذه المهمة"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            في حال حذف المهمة لن يمكنك التراجع عن ذلك
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* UPDATE DIALOG */}
      <Dialog
        open={Uopen}
        onClose={handleUpdateDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">{"تعديل مهمة"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            type="email"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="التفاصيل"
            type="email"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>إغلاق</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>

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
