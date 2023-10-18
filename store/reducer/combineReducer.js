import {combineReducers} from 'redux'
import authReducers from './authReducer'
import chatReducer from './chatReducer'
import notificationReducer from './notificationReducer'
import navigationReducer from './navigationReducer'

const rootReducer = combineReducers({
    auth: authReducers,
    chat:chatReducer,
    notification:notificationReducer,
    navigations:navigationReducer,
})

export default rootReducer