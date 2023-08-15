import React, { useState, FC } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { ClickAwayListener } from "@mui/base";

import { useDispatch } from "react-redux";
import { createTask } from "../redux/tasksSlice";

interface IPropsModal {
  open: { id: number; open: boolean };
  setOpen: React.Dispatch<
    React.SetStateAction<{
      id: number;
      open: boolean;
    }>
  >;
  kanban: number;
}

const Modal: FC<IPropsModal> = ({ open, setOpen, kanban }) => {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log(inputValue);
    dispatch(createTask({ board: open.id, title: inputValue, kanban: kanban }));
    // dispatch(editTask({ id: 0, title: inputValue }));
    setOpen({ id: -1, open: false });
    setInputValue("");
  };

  return (
    <Dialog
      open={open.open}
      fullWidth
      onClose={() => setOpen({ id: -1, open: false })}
    >
      <DialogContent>
        <DialogContentText>Описание</DialogContentText>
        <TextField
          value={inputValue}
          autoFocus
          margin="dense"
          fullWidth
          onChange={(e) => handleInput(e)}
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
