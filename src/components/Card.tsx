import { FC } from "react";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import { Draggable } from "react-beautiful-dnd";
import { ITask } from "./Board";
import ClearIcon from "@mui/icons-material/Clear";
import { deleteTask } from "../redux/tasksSlice";
import { useDispatch } from "react-redux";

type TPropsCard = {
  i: number;
  task: ITask;
  board: number;
  cardClick: React.Dispatch<
    React.SetStateAction<{
      id: number;
      open: boolean;
    }>
  >;
  kanban: number;
  order: number;
};

const Card: FC<TPropsCard> = ({ i, task, board, cardClick, kanban, order }) => {
  const styleFont = { color: "RGBA(102, 112, 133)", fontWeight: "bold" };
  const dispatch = useDispatch();
  const dateNow = () => {
    const today = new Date();
    return {
      day: today.getDate(),
      month:
        today.getMonth() > 10 ? today.getMonth() : "0" + (today.getMonth() + 1),
    };
  };
  dateNow();
  return (
    <Draggable key={task.id} draggableId={task.id.toString()} index={i}>
      {(provided: any) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            p: 2.5,
            boxShadow: 2,
            background: "RGBA(252,252,252)",
            borderRadius: 1.5,
          }}
        >
          <Typography
            variant="h6"
            height={"30%"}
            onClick={() => cardClick({ id: board, open: true })}
          >
            {task.title}
          </Typography>

          <Stack spacing={1} direction="row" mb={4}>
            <Typography sx={styleFont}>
              {dateNow().day + "." + dateNow().month}
            </Typography>
            <Typography sx={styleFont}>Created by </Typography>
          </Stack>
          <Stack direction="row" justifyContent={"space-between"}>
            <IconButton>
              <TextsmsOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={() =>
                dispatch(
                  deleteTask({
                    board: board,
                    id: task.id,
                    kanban: kanban,
                    order,
                  })
                )
              }
            >
              <ClearIcon />
            </IconButton>
          </Stack>
        </Box>
      )}
    </Draggable>
  );
};

export default Card;
