import {combineReducers} from 'redux'
import authReducers from './authSlice'


const rootReducer = combineReducers({
    auth: authReducers
})

export default rootReducer