import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//make api call
export const userLoginLifeCycle = createAsyncThunk(
  "login",
  async (userCredObj, { rejectWithValue }) => {
    let res = await axios.post("http://localhost:4000/user/login", userCredObj);

    if (res.data.message === "success") {
      //store token in local storage
      localStorage.setItem("token", res.data.token);
      return res.data;
    } else {
      return rejectWithValue(res.data);
    }
  }
);

export const userLoginSlice = createSlice({
  name: "login",
  initialState: {
    userObj: {},
    isPending: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state, action) => {
      state.userObj = {};
      state.isPending = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [userLoginLifeCycle.pending]: (state, action) => {
      state.isPending = true;
    },
    [userLoginLifeCycle.fulfilled]: (state, action) => {
     
      state.userObj = action.payload.payload;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
      state.isPending = false;
    },
    [userLoginLifeCycle.rejected]: (state, action) => {
      //console.log("action in rejected", action);
      state.userObj = {};
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload.message;
      state.isPending = false;
    },
  },
});

//export action ctreator functions
export const { clearState } = userLoginSlice.actions;
//export reducer
export default userLoginSlice.reducer;
