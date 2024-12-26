import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchBooksSuccess, fetchBooksFailure, fetchBookDetailsSuccess, fetchBookDetailsFailure, fetchBooksRequest, fetchBookDetailsRequest } from '../actions/bookActions';
import api from '../../services/api';
import { toast } from 'react-toastify';

function* fetchBooksSaga(): Generator<any, void, any> {
  try {
    const response = yield call(api.get, '/books');
    yield put(fetchBooksSuccess(response.data)); 
  } catch (error: any) {
    yield put(fetchBooksFailure(error.message));
    toast.error(`Error: Books cannot be fetched.`, {
      position: 'top-right',
      autoClose: 5000,
    }); 
  }
}

function* fetchBookDetailsSaga(action: ReturnType<typeof fetchBookDetailsRequest>): Generator<any, void, any> {
  try {
    const response = yield call(api.get, `/books/${action.payload}/with-borrower`);
    yield put(fetchBookDetailsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchBookDetailsFailure(error.message));
    toast.error(`Error: Book details cannot be fetched.`, {
      position: 'top-right',
      autoClose: 5000,
    }); 
  }
}

function* bookSaga() {
  yield takeLatest(fetchBooksRequest.type, fetchBooksSaga);
  yield takeLatest(fetchBookDetailsRequest.type, fetchBookDetailsSaga);
}


export default bookSaga;
