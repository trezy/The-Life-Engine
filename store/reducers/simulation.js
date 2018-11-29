import actionTypes from '../actionTypes'
import initialState from '../initialState'





export default function simulationReducer (state = initialState.simulation, action) {
  const {
    payload,
    type,
  } = action

  const newState = { ...state }

  switch (type) {
    case actionTypes.START_SIMULATION:
      newState.bounds = payload.bounds
      newState.running = true
      break

    case actionTypes.STOP_SIMULATION:
      newState.running = false
      break

    case actionTypes.ZOOM_IN:
      newState.zoom = state.zoom + 0.25
      break

    case actionTypes.ZOOM_OUT:
      newState.zoom = state.zoom - 0.25
      break

    default:
      break
  }

  return newState
}
