import { combineReducers } from "redux"
import assembly from "./reducers/assembly"
import emulator from "./reducers/emulator"
import input from "./reducers/input"
import isAssembled from "./reducers/isAssembled"
import isFinished from "./reducers/isFinished"
import isRunning from "./reducers/isRunning"

const reducer = combineReducers({
  assembly,
  emulator,
  input,
  isAssembled,
  isFinished,
  isRunning
})

export default reducer
