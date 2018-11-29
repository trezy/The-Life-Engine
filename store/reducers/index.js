import { combineReducers } from 'redux'
import entities from './entities'
import simulation from './simulation'
import statistics from './statistics'





export default combineReducers({
  entities,
  simulation,
  statistics,
})
