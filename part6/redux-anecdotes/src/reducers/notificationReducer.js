const initialState = ''

const notificationReducer = (state = initialState, action) => {
    if (action.type === 'NOTIFICATION') {
        return action.data.notification
    }

    return state
}

export const setNotification = (notification) => {
    return {
        type: 'NOTIFICATION',
        data: {
            notification
        }
    }
}

export const removeNotification = () => {
    return {
        type: 'NOTIFICATION',
        data: {
            notification: ''
        }
    }
}

export default notificationReducer