import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer'
import logger from 'redux-logger'
const applyMiddlewares = [logger]
export const store = createStore(rootReducer, applyMiddleware(...applyMiddlewares))
//const store = createStore(rootReducer, applyMiddleware())
export const persistor = persistStore(store);

export default { store, persistor };
