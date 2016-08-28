import { applyMiddleware, createStore } from "redux"
import createLogger from "redux-logger"
import reducer from "./reducer"

const configureStore = (preloadedStore) => {
  return createStore(
    reducer,
    preloadedStore,
    applyMiddleware(
      createLogger()
    )
  )
}

export default configureStore
