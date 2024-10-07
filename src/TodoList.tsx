import { Button, Checkbox, IconButton, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FilterValuesType } from "./App";
import { ChangeEvent } from "react";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
  changeTaskTitle: (id: string, newValue: string, todoListId: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todoListId: string) => void;
  changeTodoListTitle: (id: string, newTitle: string) => void;
};

export default function TodoList(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };
  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle);
  };
  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div className="">
      <h3>
        {" "}
        <EditableSpan onChange={changeTodoListTitle} title={props.title}></EditableSpan>
        <Button onClick={removeTodoList} variant="outlined" startIcon={<DeleteIcon />} sx={{ m: 1 }}>
          Delete
        </Button>
      </h3>
      <AddItemForm addItem={addTask} />
      <div>
        {props.tasks.map((t) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id, props.id);
          };
          const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
          };

          return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
              <Checkbox defaultChecked color="success" onChange={onChangeCheckboxHandler} checked={t.isDone} />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <IconButton onClick={onRemoveHandler} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div>
        <Stack direction="row" spacing={2}>
          <Button
            variant={props.filter === "all" ? "contained" : "outlined"}
            color="primary"
            onClick={onAllClickHandler}>
            All
          </Button>
          <Button
            variant={props.filter === "active" ? "contained" : "outlined"}
            color="info"
            onClick={onActiveClickHandler}>
            Active
          </Button>
          <Button
            variant={props.filter === "completed" ? "contained" : "outlined"}
            color="success"
            onClick={onCompletedClickHandler}>
            Completed
          </Button>
        </Stack>
      </div>
    </div>
  );
}
