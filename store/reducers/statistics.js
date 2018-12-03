import actionTypes from '../actionTypes'
import initialState from '../initialState'





export default function statisticsReducer (state = initialState.statistics, action) {
  const {
    payload,
    type,
  } = action

  let newState = { ...state }

  switch (type) {
    case actionTypes.HATCH_EGG:
      newState.creaturesAlive = newState.creaturesAlive + 1
      newState.eggsAlive = newState.eggsAlive - 1
      newState.eggsHatched = newState.eggsHatched + 1
      break

    case actionTypes.KILL_EGG:
      newState.eggsAlive = newState.eggsAlive - 1
      newState.eggsDead = newState.eggsDead + 1
      break

    case actionTypes.START_SIMULATION:
      newState.eggsAlive = payload.eggsToSpawn
      break

    case actionTypes.STOP_SIMULATION:
      newState = initialState.statistics
      break

    default:
      break
  }

  return newState
}
