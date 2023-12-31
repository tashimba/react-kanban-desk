import { FC, useState } from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack/Stack";
import Card from "./Card";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import { RootState } from "../redux/store";
import { mixTasks } from "../redux/tasksSlice";

export interface IBoardProps {
  kanban: number;
}

export interface ITask {
  id: number;
  title: string;
}

const Board: FC<IBoardProps> = ({ kanban }) => {
  const [openModal, setOpenModal] = useState({ id: -1, open: false });
  const boards = useSelector(
    (state: RootState) => state.kanbans[kanban]?.boards.data
  );
  const tasks = useSelector((state: RootState) => state.kanbans[kanban]?.tasks);
  const dispatch = useDispatch();
  const dragEndHandler = (res: DropResult) => {
    if (res.destination) {
      // if (res.destination.droppableId !== res.source.droppableId)
      {
        const newTask = {
          ...tasks.find((el) => el.id === Number(res.draggableId)),
        };
        newTask.board = Number(res.destination?.droppableId);
        newTask.order = res.destination.index;

        const moveTask = {
          ...tasks
            .filter((el) => el.board === newTask.board)
            .find((el) => el.order === newTask.order),
        };
        console.log(moveTask.title);

        moveTask.order =
          res.destination.index === 0
            ? res.destination.index + 1
            : res.destination.index - 1;

        dispatch(mixTasks({ kanban: kanban, item: newTask }));
        dispatch(mixTasks({ kanban: kanban, item: moveTask }));
        tasks.forEach((el) => {
          if (el.board === Number(res.source.droppableId))
            if (el.order > Number(res.source.index))
              dispatch(
                mixTasks({
                  kanban: kanban,
                  item: { ...el, order: el.order - 1 },
                })
              );
        });
      }
    }
  };

  console.log(boards);

  return (
    <Box
      sx={{
        height: "103vh",
        width: { sm: `calc(100% - ${240}px)` },
        background: "RGBA(242,244,247, 0.4)",
        marginLeft: "auto",
      }}
    >
      {boards && (
        <DragDropContext onDragEnd={(res) => dragEndHandler(res)}>
          <Grid
            sx={{ display: "flex", justifyContent: "space-around" }}
            container
            spacing={3}
            columns={6}
            height={"100%"}
            px={10}
            pt={8}
            pb={2}
          >
            {boards.map((board, i) => (
              <Grid
                key={i}
                sx={{
                  paddingTop: "0px",
                  width: "28%",
                  background: "RGBA(242,244,247)",
                  // padding: "10px 15px",
                  px: 2,
                  py: 1,
                  borderRadius: 3,
                }}
              >
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems="center"
                  mb={1}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      color: "RGBA(102, 112, 133)",
                    }}
                  >
                    {board.title}
                  </Typography>
                  <IconButton
                    onClick={() => setOpenModal({ id: board.id, open: true })}
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>
                <Droppable key={i} droppableId={board.id.toString()}>
                  {(provided) => (
                    <Stack
                      border={"1px dashed RGBA(102, 112, 133, 0.4)"}
                      sx={{ width: "100%" }}
                      spacing={3}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {tasks &&
                        tasks
                          .filter((el) => el.board == board.id)
                          .sort((a, b) => a.order - b.order)
                          .map((task, i) => (
                            <Card
                              key={i}
                              i={i}
                              task={task}
                              board={board.id}
                              cardClick={setOpenModal}
                              kanban={kanban}
                              order={task.order}
                            />
                          ))}
                      {provided.placeholder}
                    </Stack>
                  )}
                </Droppable>
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      )}
      <Modal open={openModal} setOpen={setOpenModal} kanban={kanban} />
    </Box>
  );
};

export default Board;
