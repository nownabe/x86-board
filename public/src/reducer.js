import { combineReducers } from "redux"
import assembly from "./reducers/assembly"
import emulator from "./reducers/emulator"
import isAssembled from "./reducers/isAssembled"
import isFinished from "./reducers/isFinished"
import isRunning from "./reducers/isRunning"

const reducer = combineReducers({
  assembly,
  emulator,
  isAssembled,
  isFinished,
  isRunning
})

export default reducer
