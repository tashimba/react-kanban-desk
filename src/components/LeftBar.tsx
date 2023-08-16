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
    setAddingKanban(false);
    addingName.length && dispatch(createKanban(addingName));
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
        <List
          sx={{
            width: 240,
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
            <Typography>Создать новую доску</Typography>
            <AddIcon
              sx={{
                width: 20,
              }}
            />
          </ListItemButton>
          {addingKanban && (
            <List
              sx={{ display: "flex", justifyContent: "space-between", mx: 2 }}
            >
              <TextField
                value={addingName}
                onChange={(e) => setAddingName(e.target.value)}
                size="small"
                id="standard-basic"
                label="Название доски"
                variant="standard"
                sx={{
                  width: "70%",
                }}
              />
              <IconButton onClick={() => addKanban()} sx={{}}>
                <CheckIcon
                  sx={{
                    width: 25,
                  }}
                />
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
      {openKanban.open ? (
        <Board kanban={openKanban.id} />
      ) : (
        <Box
          sx={{
            height: "103vh",
            width: { sm: `calc(100% - ${240}px)` },
            background: "RGBA(242,244,247, 0.4)",
            marginLeft: "auto",
          }}
        >
          <img
            src="src\assets\free-icon-rotated-right-arrow-with-broken-line-64784.png"
            alt=""
            style={{
              transform: "rotate(180deg)",
              width: "80px",
              padding: "50px 15px",
            }}
          />
        </Box>
      )}
    </>
  );
};

export default LeftBar;
