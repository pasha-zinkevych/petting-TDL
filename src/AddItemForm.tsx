import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};
export function AddItemForm(props: AddItemFormPropsType) {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    setError(null);
    if (e.code === "Enter") {
      addTask();
    }
  };
  const addTask = () => {
    if (title.trim() !== "") {
      props.addItem(title.trim());
      setTitle("");
    } else {
      setError("Incorrect Entry");
    }
  };

  return (
    <div>
      <TextField
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyPressHandler}
        id="outlined-basic"
        label="Outlined"
        helperText={error ? "Incorrect Entry" : ""}
        error={error ? true : false}
        variant="outlined"
        value={title}
      />
      <Button onClick={addTask} variant="contained" endIcon={<SendIcon />} sx={{ m: 1 }}>
        Add
      </Button>
    </div>
  );
}
