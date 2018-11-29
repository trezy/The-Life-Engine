import actionTypes from '../actionTypes'
import initialState from '../initialState'
import {
  Creature,
  Egg,
} from '../../modules'





export default function statisticsReducer (state = initialState.statistics, action) {
  const {
    payload,
    type,
  } = action

  let newState = { ...state }

  switch (type) {
    case actionTypes.HATCH_EGG:
      newState.creatures.alive = newState.creatures.alive + 1
      newState.eggs.hatched = newState.eggs.hatched + 1
      break

    case actionTypes.KILL_EGG:
      newState.eggs.alive = newState.eggs.alive - 1
      newState.eggs.dead = newState.eggs.dead + 1
      break

    case actionTypes.START_SIMULATION:
      newState.eggs.alive = payload.eggsToSpawn
      break

    case actionTypes.STOP_SIMULATION:
      newState = initialState.statistics
      break

    default:
      break
  }

  return newState
}
