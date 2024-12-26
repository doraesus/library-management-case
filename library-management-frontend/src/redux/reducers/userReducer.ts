import { createReducer } from '@reduxjs/toolkit';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserDetailsRequest,
  fetchUserDetailsSuccess,
  fetchUserDetailsFailure,
  returnBookRequest,
  returnBookSuccess,
  returnBookFailure,
  borrowBookRequest,
  borrowBookSuccess,
  borrowBookFailure,
  fetchEligibleUsersRequest,
  fetchEligibleUsersSuccess,
  fetchEligibleUsersFailure,
} from '../actions/userActions';
import { UserState } from '../types/userTypes';

const initialState: UserState = {
  userList: [],
  userDetails: null,
  eligibleUsers: [],
  loading: false,
  error: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder

    .addCase(fetchUsersRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUsersSuccess, (state, action) => {
      state.userList = action.payload;
      state.loading = false;
    })
    .addCase(fetchUsersFailure, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })


    .addCase(fetchUserDetailsRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserDetailsSuccess, (state, action) => {
      state.userDetails = action.payload;
      state.loading = false;
    })
    .addCase(fetchUserDetailsFailure, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })


    .addCase(fetchEligibleUsersRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchEligibleUsersSuccess, (state, action) => {
      state.eligibleUsers = action.payload;
      state.loading = false;
    })
    .addCase(fetchEligibleUsersFailure, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })


    .addCase(returnBookRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(returnBookSuccess, (state) => {
      state.loading = false;
    })
    .addCase(returnBookFailure, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })


    .addCase(borrowBookRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(borrowBookSuccess, (state) => {
      state.loading = false;
    })
    .addCase(borrowBookFailure, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    })

});

export default userReducer;
