import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import configureStore from "./configureStore"
import Root from "./components/root"

let store = configureStore({})

render(
  <Provider store={store}>
    <Root store={store} />
  </Provider>,
  document.getElementById("app")
)

import { sprintf } from "sprintf-js"

window.sprintf = sprintf
