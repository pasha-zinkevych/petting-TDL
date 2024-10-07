import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};
export function EditableSpan(props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  let [inputText, setInputText] = useState("");
  const activateEditMode = () => {
    setEditMode(true);
    setInputText(props.title);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.onChange(inputText);
  };
  const onChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
  };
  return editMode ? (
    <TextField value={inputText} onChange={onChangeInputText} onBlur={deactivateEditMode} autoFocus />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}
