import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { v4 as uuidv4 } from "uuid";

// MUI
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//contexts
import { useTodos } from "../contexts/todosContext";
import { ToastContext } from "../contexts/ToastContext";

// Reducer
import todosReducer from "../reducers/todosReducer";

export default function TodoList() {
  const [alignment, setAlignment] = useState("left");
  const { todos, dispatch } = useTodos();

  const { showHideToast } = useContext(ToastContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodos] = useState("all");
  const [Dopen, setDopen] = useState(false);
  const [Uopen, setUopen] = React.useState(false);
  const [deleteDialogTodo, setdeleteDialogTodo] = useState("");
  const [updateDialogTodo, setupdateDialogTodo] = useState("");

  // Initialize updatedTodo with default values or from updateDialogTodo when it's available
  const [updatedTodo, setUpdatedTodo] = React.useState({
    title: updateDialogTodo.title, // Avoid null access
    details: updateDialogTodo.details,
  });
  useEffect(() => {
    dispatch({ type: "getTodosForfirstRender" });
  }, []);

  // Handlers
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  function changeDisplayType(e) {
    setDisplayedTodos(e.target.value);
  }

  function handleAddClick() {
    dispatch({ type: "added", payload: { titleInput } });
    setTitleInput("");
    showHideToast("تمت إضافة مهمة جديدة بنجاح");
  }

  function showDeleteDialog(todo) {
    setdeleteDialogTodo(todo);
    setDopen(true);
  }

  function showUpdateDialog(todo) {
    setupdateDialogTodo(todo);
    setUpdatedTodo({
      title: todo.title,
      details: todo.details,
    });
    setUopen(true);
  }

  function handleDeleteConfirm() {
    dispatch({ type: "deleted", payload: { deleteDialogTodo } });
    setDopen(false);
    showHideToast("تم الحذف بنجاح");
  }

  const handleDeleteDialogClose = () => {
    setDopen(false);
  };

  const handleUpdateDialogClose = () => {
    setUopen(false);
  };

  function handleUpdateConfirm() {
    dispatch({ type: "updated", payload: { updateDialogTodo, updatedTodo } });
    setUopen(false); // Close the update dialog

    showHideToast("تم التحديث بنجاح");
  }

  // Filtered Todos
  const completedTodos = useMemo(() => {
    return todos.filter((t) => t.isCompleted);
  }, [todos]);

  const inCompletedTodos = useMemo(() => {
    return todos.filter((t) => !t.isCompleted);
  }, [todos]);

  let todosTobeRendered = todos;
  if (displayedTodosType === "all") {
    todosTobeRendered = todos;
  } else if (displayedTodosType === "complete") {
    todosTobeRendered = completedTodos;
  } else if (displayedTodosType === "incomplete") {
    todosTobeRendered = inCompletedTodos;
  }

  const todosmap = todosTobeRendered.map((t) => (
    <Todo
      key={t.id}
      todo={t}
      showDelete={showDeleteDialog}
      showUpdate={showUpdateDialog}
    />
  ));

  return (
    <React.Fragment>
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

      {/* MAIN CONTENT */}
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
            {/* Input */}
            <Grid
              size={8}
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <TextField
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                style={{ width: "100%" }}
                value={titleInput}
                onChange={(i) => setTitleInput(i.target.value)}
              />
            </Grid>

            {/* Button */}
            <Grid
              size={4}
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"center"}
            >
              <Button
                variant="contained"
                style={{ width: "100%", height: "100%" }}
                onClick={handleAddClick}
                disabled={titleInput.length == 0}
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
