import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  reaultsCount: 0,
  games: [],
  page_size: 10,
  key: "",
  apiRequestState: "",
  apiErrorMessage: "",
  search: "",
  page: 1,
  isSearching: false,
};

export const fetchGames = createAsyncThunk("games/fetchGames", async ({ key, search, page, page_size }) => {
  if (!key || !search) return;

  const params = { key, search, page, page_size };

  const response = await axios.get(`https://api.rawg.io/api/games`, { params });
  const data = response.data;

  return data;
});

export const games = createSlice({
  name: "games",
  initialState,
  reducers: {
    updateKey: (state, action) => {
      state.key = action.payload;
      state.page = 1;
      state.reaultsCount = 0;
      state.isSearching = true;
    },
    updateSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
      state.reaultsCount = 0;
      state.apiErrorMessage = "";

      if (!action.payload) {
        state.isSearching = false;
      }

      if (action.payload && state.key) {
        state.isSearching = true;
      }
    },
    updatePage: (state, action) => {
      state.page = action.payload;
    },
    updateApiErrorMessage: (state, action) => {
      state.apiErrorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGames.pending, (state) => {
      state.apiRequestState = "pending";
      state.isSearching = true;
    });
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      state.apiRequestState = "fulfilled";
      state.isSearching = false;
      state.games = action.payload.results;
      state.reaultsCount = action.payload.count;
    });
    builder.addCase(fetchGames.rejected, (state, action) => {
      state.apiRequestState = "rejected";
      state.isSearching = false;
      state.apiErrorMessage = action.error.message;
    });
  },
});

export const { updateKey, updateSearch, updatePage, updateApiErrorMessage } = games.actions;

export default games.reducer;
