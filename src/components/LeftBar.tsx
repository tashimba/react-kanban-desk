import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
  Divider,
  Collapse,
  ListItemText,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { createKanban, deleteKanban } from "../redux/tasksSlice";
import { RootState } from "../redux/store";
import Board from "./Board";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";

const LeftBar = () => {
  const dispatch = useDispatch();
  const kanbans = useSelector((state: RootState) => state.kanbans);
  const [openKanban, setOpenKanban] = useState({ id: 0, open: false });
  const [addingKanban, setAddingKanban] = useState(false);
  const [addingName, setAddingName] = useState("");
  const addKanban = () => {
    dispatch(createKanban(addingName));
    setAddingKanban(false);
    setAddingName("");
  };

  return (
    <>
      <Drawer
        container={window.document.body}
        variant="permanent"
        open={true}
        sx={{
          width: 240,
        }}
      >
        {/* <Stack></Stack> */}
        <List
          sx={{
            width: 240,
            // height: "100vh",
            background: "fff",
          }}
        >
          <ListItemButton
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography>UserName</Typography>
            <LogoutIcon
              sx={{
                width: 20,
              }}
            />
          </ListItemButton>
          <Divider sx={{ mt: 1, mb: 2 }} />
          <ListItemButton
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={() => setAddingKanban(true)}
          >
            <Typography>Add new board</Typography>
            <AddIcon
              sx={{
                width: 20,
              }}
            />
          </ListItemButton>
          {addingKanban && (
            <List sx={{ display: "flex", justifyContent: "space-around" }}>
              <TextField
                value={addingName}
                onChange={(e) => setAddingName(e.target.value)}
                size="small"
                id="standard-basic"
                label="Название новой доски"
                variant="standard"
              />
              <IconButton onClick={() => addKanban()} sx={{}} size="small">
                <CheckIcon />
              </IconButton>
            </List>
          )}
          <Collapse in={true} timeout="auto" unmountOnExit>
            {kanbans.map((kanban, i) => (
              <List component="div" disablePadding key={i}>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={(e) => {
                    console.log(e);
                    //@ts-ignore
                    e.target.dataSet?.testid !==
                      "svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.css-i4bv87-MuiSvgIcon-root";
                    setOpenKanban({ id: i, open: true });
                  }}
                >
                  <ListItemIcon>
                    <FiberManualRecordIcon />
                  </ListItemIcon>
                  <ListItemText primary={kanban.name} />
                  <IconButton onClick={() => dispatch(deleteKanban(i))}>
                    <ClearIcon />
                  </IconButton>
                </ListItemButton>
              </List>
            ))}
          </Collapse>
        </List>
      </Drawer>
      {openKanban.open && <Board kanban={openKanban.id} />}
    </>
  );
};

export default LeftBar;
