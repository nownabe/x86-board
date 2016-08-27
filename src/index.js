import React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"
import configureStore from "./configureStore"
import Root from "./components/root"

let store = configureStore({})

render(
  <Root store={store} />,
  document.getElementById("app")
)
