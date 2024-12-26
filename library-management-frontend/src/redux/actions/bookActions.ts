import { createAction } from '@reduxjs/toolkit';
import { Book } from '../types/bookTypes';

export const fetchBooksRequest = createAction('FETCH_BOOKS_REQUEST');
export const fetchBooksSuccess = createAction<Book[]>('FETCH_BOOKS_SUCCESS');
export const fetchBooksFailure = createAction<string>('FETCH_BOOKS_FAILURE');

export const fetchBookDetailsRequest = createAction<number>('FETCH_BOOK_DETAILS_REQUEST');
export const fetchBookDetailsSuccess = createAction<Book>('FETCH_BOOK_DETAILS_SUCCESS');
export const fetchBookDetailsFailure = createAction<string>('FETCH_BOOK_DETAILS_FAILURE');