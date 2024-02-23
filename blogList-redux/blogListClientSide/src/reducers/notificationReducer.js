import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(_, action) {
      const notification = action.payload;
      const newState = notification;
      return newState;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const notification = (message, secs) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
    await timeout(secs * 1000);
    dispatch(setNotification(null));
  };
};

export default notificationSlice.reducer;