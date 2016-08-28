import { combineReducers } from "redux"
import computer from "./reducers/computer"
import assembly from "./reducers/assembly"

const reducer = combineReducers({
  computer,
  assembly
})

export default reducer
