import { combineReducers } from "redux"
import assembly from "./reducers/assembly"
import emulator from "./reducers/emulator"
import isRunning from "./reducers/isRunning"

const reducer = combineReducers({
  assembly,
  emulator,
  isRunning
})

export default reducer
