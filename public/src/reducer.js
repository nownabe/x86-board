import { combineReducers } from "redux"
import assembly from "./reducers/assembly"
import binary from "./reducers/binary"
import computer from "./reducers/computer"

const reducer = combineReducers({
  assembly,
  binary,
  computer
})

export default reducer
