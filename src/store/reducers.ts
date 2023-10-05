import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "./store";

const initialStateData: State = {
  id: "",
  project: {
    id: "",
    name: "",
    width: 0,
    height: 0,
    items: [],
  },
};

export interface DataState {
  data: State | null;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  data: initialStateData,
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchIdRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchIdSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    fetchDataRequest: (state, action: PayloadAction<string>) => {
      state.data = initialStateData;
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<State>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      console.log("Fail", action.payload);
    },
  },
});

export const {
  fetchIdRequest,
  fetchIdSuccess,
  fetchDataRequest,
  fetchDataSuccess,
  fetchFailure,
} = dataSlice.actions;

export default dataSlice.reducer;
