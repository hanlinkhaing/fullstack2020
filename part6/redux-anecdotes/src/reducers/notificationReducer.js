const initialState = "";

const notificationReducer = (state = initialState, action) => {
  if (action.type === "NOTIFICATION") {
    return action.data.notification;
  }

  return state;
};

export const setNotification = (notification, timeSec) => {
  return async (dispatch) => {
    dispatch({
      type: "NOTIFICATION",
      data: {
        notification,
      },
    });
    setTimeout(
      () =>
        dispatch({
          type: "NOTIFICATION",
          data: {
            notification: "",
          },
        }),
      timeSec * 1000
    );
  };
};

export default notificationReducer;
