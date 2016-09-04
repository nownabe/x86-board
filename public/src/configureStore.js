import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import createLogger from "redux-logger"
import reducer from "./reducer"

const configureStore = (preloadedStore) => {
  if (window.location.href.includes("dev")) {
    return createStore(
      reducer,
      preloadedStore,
      applyMiddleware(
        thunk,
        createLogger()
      )
    )
  } else {
    return createStore(
      reducer,
      preloadedStore,
      applyMiddleware(
        thunk
      )
    )
  }
}

export default configureStore
