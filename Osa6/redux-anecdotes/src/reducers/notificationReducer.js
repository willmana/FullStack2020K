const messageAtStart = null

export const showMessage = ( message) => {
    return {
        type: 'SHOW_NOTIFICATION',
        data: {
            message: message
        }
    }
}
export const hideMessage = ( ) => {
    return {
        type: 'HIDE_NOTIFICATION',
        data: {
            message: null
        }
    }
}

const reducer = (state = messageAtStart, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return state = action.data.message
        case 'HIDE_NOTIFICATION':
            return state = action.data.message
        default:
            return state
    }

}

export default reducer