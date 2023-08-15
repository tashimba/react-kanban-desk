import { createSlice } from "@reduxjs/toolkit";

export interface ITaskSlice {
  kanbans: {
    name: string;
    boards: {
      // orderValue: number;
      data: {
        id: number;
        title: string;
        orderValue: number;
      }[];
    };
    tasks: {
      board: number;
      id: number;
      title: string;
      order: number;
    }[];
    maxId: number;
  }[];
}

// const initialStateBoard = {
//   name: "kanban",
//   boards: {
//     data: [
//       {
//         id: 0,
//         title: "TO DO",
//         orderValue: 0,
//       },
//       {
//         id: 1,
//         title: "DOING",
//         orderValue: 0,
//       },
//       {
//         id: 2,
//         title: "DONE",
//         orderValue: 0,
//       },
//     ],
//   },
//   tasks: [
//     { board: 0, id: 0, title: "0", order: 0 },
//     { board: 1, id: 1, title: "1", order: 0 },
//     { board: 2, id: 2, title: "2", order: 0 },
//   ],
//   maxId: 2,
// };

const initialStateBoard = {
  name: "kanban",
  boards: {
    data: [
      {
        id: 0,
        title: "TO DO",
        orderValue: 0,
      },
      {
        id: 1,
        title: "DOING",
        orderValue: 0,
      },
      {
        id: 2,
        title: "DONE",
        orderValue: 0,
      },
    ],
  },
  tasks: [],
  maxId: 0,
};

export const initialStateTasks: ITaskSlice = {
  kanbans: [initialStateBoard],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialStateTasks,
  reducers: {
    createTask(state, action) {
      state.kanbans[action.payload.kanban].boards.data[
        action.payload.board
      ].orderValue =
        state.kanbans[action.payload.kanban].boards.data[action.payload.board]
          .orderValue + 1;

      state.kanbans[action.payload.kanban].tasks.push({
        board: action.payload.board,
        id: 1 + state.kanbans[action.payload.kanban].maxId++,
        title: action.payload.title,
        order:
          state.kanbans[action.payload.kanban].boards.data[action.payload.board]
            .orderValue,
      });

      //
      console.log(
        "order value: ",
        state.kanbans[action.payload.kanban].boards.data[action.payload.board]
          .orderValue,
        state.kanbans[action.payload.kanban].tasks[
          state.kanbans[action.payload.kanban].tasks.length - 1
        ].order
      );
      //
    },
    deleteTask(state, action) {
      state.kanbans[action.payload.kanban].tasks = state.kanbans[
        action.payload.kanban
      ].tasks.filter((el) => el.id != action.payload.id);

      state.kanbans[action.payload.kanban].tasks.map(
        (el) => el.order > action.payload.order && el.order--
      );
    },
    mixTasks(state, action) {
      state.kanbans[action.payload.kanban].tasks = state.kanbans[
        action.payload.kanban
      ].tasks.map((el) =>
        el.id === action.payload.item.id
          ? (el = { ...action.payload.item })
          : el
      );
    },
    editTask(state, action) {
      state.kanbans[action.payload.kanban].tasks.map((el) => {
        if (el.id === action.payload.id) el.title = action.payload.title;
      });
    },
    createKanban(state, action) {
      state.kanbans.push({ ...initialStateBoard, name: action.payload });
    },
    deleteKanban(state, action) {
      state.kanbans = state.kanbans.filter((_, i) => i !== action.payload);
    },
  },
});

export const {
  createTask,
  deleteTask,
  mixTasks,
  editTask,
  createKanban,
  deleteKanban,
} = tasksSlice.actions;
export default tasksSlice.reducer;
