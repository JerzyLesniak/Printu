import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";

import { PayloadAction } from "@reduxjs/toolkit";
import Api, { FetchIdResponse } from "./Api";
import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchFailure,
  fetchIdRequest,
  fetchIdSuccess,
} from "./reducers";
import { State } from "./store";
import { getApiErrorMessage, isState } from "../utils/utils";

function* fetchData(action: PayloadAction<string>) {
  try {
    const data: State = yield call(Api.fetchData, action.payload);
    if (isState(data)) {
      yield put(fetchDataSuccess(data));
    } else {
      throw new Error("Invalid project data");
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    yield put(fetchFailure(getApiErrorMessage(axiosError)));
  }
}

function* fetchId() {
  try {
    const response: FetchIdResponse = yield call(Api.fetchId);
    yield put(fetchDataRequest(response.id));
    yield put(fetchIdSuccess());
  } catch (error) {
    const axiosError = error as AxiosError;
    yield put(fetchFailure(getApiErrorMessage(axiosError)));
  }
}

export function* watchFetchData() {
  yield takeLatest(fetchDataRequest.type, fetchData);
}

export function* watchFetchId() {
  yield takeLatest(fetchIdRequest.type, fetchId);
}
