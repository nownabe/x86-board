import { combineReducers } from "redux"
import emulator from "./reducers/emulator"

console.log(emulator)

const reducer = combineReducers({
  emulator
})

export default reducer
