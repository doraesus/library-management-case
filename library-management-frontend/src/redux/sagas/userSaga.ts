import { call, put, takeLatest } from 'redux-saga/effects';
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
  fetchEligibleUsersSuccess,
  fetchEligibleUsersFailure,
  fetchEligibleUsersRequest,
} from '../actions/userActions';
import api from '../../services/api';
import { fetchBookDetailsRequest } from '../actions/bookActions';

function* fetchUsers(action: ReturnType<typeof fetchUsersSuccess>): Generator<any, void, any> {
  try {
    const response = yield call(api.get, '/users');
    yield put(fetchUsersSuccess(response.data));
  } catch (error: any) {
    yield put(fetchUsersFailure(error.message));
  }
}

function* fetchUserDetails(action: ReturnType<typeof fetchUserDetailsRequest>): Generator<any, void, any> {
    try {
      const response = yield call(api.get, `/users/${action.payload}/books`);
      yield put(fetchUserDetailsSuccess(response.data));
    } catch (error: any) {
      yield put(fetchUserDetailsFailure(error.message));
    }
}

function* fetchEligibleUsers(action: ReturnType<typeof fetchEligibleUsersSuccess>): Generator<any, void, any> {
  try {
    const response = yield call(api.get, '/users/eligible-borrowers');
    yield put(fetchEligibleUsersSuccess(response.data));
  } catch (error: any) {
    yield put(fetchEligibleUsersFailure(error.message));
  }
}

function* borrowBook(action: ReturnType<typeof borrowBookRequest>) {
  try {
    const { userId, bookId } = action.payload;
    yield call(api.post, `/users/${userId}/borrow/${bookId}`);
    yield put(borrowBookSuccess());
    yield put(fetchBookDetailsRequest(bookId));
  } catch (error: any) {
    yield put(borrowBookFailure(error.message));
  }
}


function* returnBook(action: ReturnType<typeof returnBookRequest>) {
  try {
    const { userId, bookId, score } = action.payload;
    yield call(api.post, `/users/${userId}/return/${bookId}`, { score });
    yield put(returnBookSuccess());
    yield put(fetchUserDetailsRequest(userId));
  } catch (error: any) {
    yield put(returnBookFailure(error.message));
  }
}


export default function* userSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsers);
  yield takeLatest(fetchUserDetailsRequest.type, fetchUserDetails);
  yield takeLatest(fetchEligibleUsersRequest.type, fetchEligibleUsers);
  yield takeLatest(borrowBookRequest.type, borrowBook);
  yield takeLatest(returnBookRequest.type, returnBook);
}
