// import { removeToken } from "../../actions/generalActions"

let init = {
    user: {},
    profile: {},
    isAuthenticated: false,
}

const authReducer = (state = init, action) => {

    switch (action.type) {
        case "SET_PROFILE":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case "SET_user":
            return {
                ...state,
                USER: action.payload,
            }
        case "LOGOUT":
            // removeToken()
            return {
                user: {},
                profile: {},
                isAuthenticated: false,
            }

        default:
            return state;
    }
}

export default authReducer