import { createStore } from 'redux'
import rootReducer from './reducer/combineReducer'
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import AsyncStorage from '@react-native-async-storage/async-storage';

// Secure storage


const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
    // blacklist: ['auth']
}
const init = {}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, init)
let persistor = persistStore(store)
export default store
export { persistor }

//  ,
//  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())