import { createStore, applyMiddleware } from 'redux'
import rootReducer from './root-reducer'
//import logger from 'redux-logger'
//const applyMiddlewares = [logger]
//const store = createStore(rootReducer, applyMiddleware(...applyMiddlewares))
const store = createStore(rootReducer, applyMiddleware())

export default store
