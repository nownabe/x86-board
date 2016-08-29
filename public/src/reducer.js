import { combineReducers } from "redux"
import assembly from "./reducers/assembly"
import binary from "./reducers/binary"
import eflags from "./reducers/eflags"
import memory from "./reducers/memory"
import registers from "./reducers/registers"
import program_counter from "./reducers/program_counter"

const reducer = combineReducers({
  assembly,
  binary,
  eflags,
  memory,
  registers,
  program_counter
})

export default reducer
