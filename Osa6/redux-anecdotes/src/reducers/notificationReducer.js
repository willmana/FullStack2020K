const messageAtStart = null

export const setNotification = ( message, timeout) => {
    return async dispatch => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: message
        })
        setTimeout(()=> {
            dispatch({
                type: 'HIDE_NOTIFICATION'
            })
        }, timeout * 1000)
    }
}


const reducer = (state = messageAtStart, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return state = action.data
        case 'HIDE_NOTIFICATION':
            return messageAtStart
        default:
            return state
    }

}

export default reducer