import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./features/games/gamesSlice";

export const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});
