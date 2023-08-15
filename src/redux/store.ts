import { configureStore } from "@reduxjs/toolkit";
import tasks from "./tasksSlice";
const store = configureStore({
  reducer: tasks,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
