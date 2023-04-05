/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getAllBoards, createBoard, boardData } from './boardsActions';

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    board: null,
    listBoards: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBoards.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.listBoards = action.payload;
      })
      .addCase(getAllBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(boardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(boardData.fulfilled, (state, action) => {
        state.loading = false;
        state.board = action.payload;
      })
      .addCase(boardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default boardSlice.reducer;
