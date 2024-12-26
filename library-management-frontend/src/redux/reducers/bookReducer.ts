import { createReducer } from '@reduxjs/toolkit';
import {
  fetchBooksRequest,
  fetchBooksSuccess,
  fetchBooksFailure,
  fetchBookDetailsRequest,
  fetchBookDetailsSuccess,
  fetchBookDetailsFailure,
} from '../actions/bookActions';
import { BookState } from '../types/bookTypes';

const initialState: BookState = {
  bookList: [],
  bookDetails: null,
  loading: false,
  error: null,
};

const bookReducer = createReducer(initialState, (builder) => {
  builder
  
    .addCase(fetchBooksRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchBooksSuccess, (state, action) => {
      state.bookList = action.payload;
      state.loading = false;
    })
    .addCase(fetchBooksFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })


    .addCase(fetchBookDetailsRequest, (state) => {
      state.loading = true;
      state.error = null;
      state.bookDetails = null;
    })
    .addCase(fetchBookDetailsSuccess, (state, action) => {
      state.bookDetails = action.payload;
      state.loading = false;
    })
    .addCase(fetchBookDetailsFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default bookReducer;
