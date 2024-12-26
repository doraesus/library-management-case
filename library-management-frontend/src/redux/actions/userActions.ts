import { createAction } from '@reduxjs/toolkit';
import { User, ReturnBookPayload, BorrowBookPayload } from '../types/userTypes';

export const fetchUsersRequest = createAction('FETCH_USERS_REQUEST');
export const fetchUsersSuccess = createAction<User[]>('FETCH_USERS_SUCCESS');
export const fetchUsersFailure = createAction<string>('FETCH_USERS_FAILURE');

export const fetchUserDetailsRequest = createAction<number>('FETCH_USER_DETAILS_REQUEST');
export const fetchUserDetailsSuccess = createAction<User>('FETCH_USER_DETAILS_SUCCESS');
export const fetchUserDetailsFailure = createAction<string>('FETCH_USER_DETAILS_FAILURE');

export const fetchEligibleUsersRequest = createAction('FETCH_ELIGIBLE_USERS_REQUEST');
export const fetchEligibleUsersSuccess = createAction<User[]>('FETCH_ELIGIBLE_USERS_SUCCESS');
export const fetchEligibleUsersFailure = createAction<string>('FETCH_ELIGIBLE_USERS_FAILURE');

export const borrowBookRequest = createAction<BorrowBookPayload>('BORROW_BOOK_REQUEST');
export const borrowBookSuccess = createAction('BORROW_BOOK_SUCCESS');
export const borrowBookFailure = createAction<string>('BORROW_BOOK_FAILURE');

export const returnBookRequest = createAction<ReturnBookPayload>('RETURN_BOOK_REQUEST');
export const returnBookSuccess = createAction('RETURN_BOOK_SUCCESS');
export const returnBookFailure = createAction<string>('RETURN_BOOK_FAILURE');