import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchBooksSuccess, fetchBooksFailure, fetchBookDetailsSuccess, fetchBookDetailsFailure, fetchBooksRequest, fetchBookDetailsRequest } from '../actions/bookActions';
import api from '../../services/api';
import { Book } from '../types/bookTypes';

function* fetchBooksSaga(): Generator<any, void, any> {
  try {
    const response = yield call(api.get, '/books');
    yield put(fetchBooksSuccess(response.data)); 
  } catch (error: any) {
    yield put(fetchBooksFailure(error.message));
  }
}

function* fetchBookDetailsSaga(action: { type: string; payload: number }): Generator<any, void, any> {
  try {
    const response = yield call(api.get, `/books/${action.payload}/with-borrower`);
    yield put(fetchBookDetailsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchBookDetailsFailure(error.message));
  }
}

function* bookSaga() {
  yield takeLatest(fetchBooksRequest.type, fetchBooksSaga);
  yield takeLatest(fetchBookDetailsRequest.type, fetchBookDetailsSaga);
}


export default bookSaga;
