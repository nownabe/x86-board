import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import createLogger from "redux-logger"
import reducer from "./reducer"

const configureStore = (preloadedStore) => {
  return createStore(
    reducer,
    preloadedStore,
    applyMiddleware(
      thunk,
      createLogger()
    )
  )
}

export default configureStore
