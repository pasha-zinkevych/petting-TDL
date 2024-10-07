import React, { useState } from "react";
import "./App.css";
import TodoList, { TaskType } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { AppBar, Button, Container, Grid2, Toolbar, Typography } from "@mui/material";

export type FilterValuesType = "all" | "completed" | "active";

type TodoListType = { id: string; title: string; filter: FilterValuesType };
type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todoListId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function addTask(title: string, todoListId: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todoListId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTasks({ ...tasksObj });
  }
  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }
  function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj });
    }
  }
  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }
  function changeTodoListTitle(id: string, newTitle: string) {
    const changedTodoList = todoLists.find((tl) => tl.id === id);
    if (changedTodoList) {
      changedTodoList.title = newTitle;
      setTodoLists([...todoLists]);
    }
  }
  function removeTodoList(todoListId: string) {
    let filtereTodoList = todoLists.filter((tl) => tl.id !== todoListId);
    setTodoLists(filtereTodoList);
    delete tasksObj[todoListId];
    setTasks({ ...tasksObj });
  }

  let todoListId1 = v1();
  let todoListId2 = v1();
  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: "first one", filter: "all" },
    { id: todoListId2, title: "second one", filter: "all" },
  ]);

  let [tasksObj, setTasks] = useState<TasksStateType>({
    [todoListId1]: [
      { id: v1(), title: "TDL1 - 1", isDone: true },
      { id: v1(), title: "TDL1 - 2", isDone: true },
      { id: v1(), title: "TDL1 - 3", isDone: false },
      { id: v1(), title: "TDL1 - 4", isDone: true },
      { id: v1(), title: "TDL1 - 5", isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "TDL2 - 1", isDone: true },
      { id: v1(), title: "TDL2 - 2", isDone: true },
      { id: v1(), title: "TDL2 - 3", isDone: false },
      { id: v1(), title: "TDL2 - 4", isDone: true },
      { id: v1(), title: "TDL2 - 5", isDone: false },
    ],
  });

  function addTodoList(title: string) {
    let todoList: TodoListType = {
      id: v1(),
      filter: "all",
      title: title,
    };
    setTodoLists([todoList, ...todoLists]);
    setTasks({ ...tasksObj, [todoList.id]: [] });
  }

  return (
    <div className="App">
      <AppBar position="static" color="info">
        <Toolbar>
          <Typography variant="h6">Navigating the b</Typography>
          <Button color="inherit"> (mama mia)</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid2 container sx={{ m: 1 }}>
          <AddItemForm addItem={addTodoList} />
        </Grid2>
        <Grid2 container spacing={5}>
          {todoLists.map((tl) => {
            let taskForTodoList = tasksObj[tl.id];
            if (tl.filter === "completed") {
              taskForTodoList = taskForTodoList.filter((t) => t.isDone === true);
            }
            if (tl.filter === "active") {
              taskForTodoList = taskForTodoList.filter((t) => t.isDone === false);
            }
            return (
              <TodoList
                key={tl.id}
                id={tl.id}
                title={tl.title}
                tasks={taskForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                changeTaskTitle={changeTaskTitle}
                filter={tl.filter}
                removeTodoList={removeTodoList}
                changeTodoListTitle={changeTodoListTitle}
              />
            );
          })}
        </Grid2>
      </Container>
    </div>
  );
}

export default App;
