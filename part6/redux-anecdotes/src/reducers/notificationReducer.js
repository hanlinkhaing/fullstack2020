const initialState = "";

const notificationReducer = (state = initialState, action) => {
  if (action.type === "NOTIFICATION") {
    return action.data.notification;
  }

  return state;
};

export const setNotification = (notification, timeSec, getId) => {
  return async (dispatch) => {
    dispatch({
      type: "NOTIFICATION",
      data: {
        notification,
      },
    });
    const id = setTimeout(
      () =>
        dispatch({
          type: "NOTIFICATION",
          data: {
            notification: "",
          },
        }),
      timeSec * 1000
    );
    getId(id)
  };
};

export default notificationReducer;
