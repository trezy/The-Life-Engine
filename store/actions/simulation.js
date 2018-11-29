// Component imports
import actionTypes from '../actionTypes'





export const startSimulation = (eggsToSpawn, bounds) => dispatch => dispatch({
  payload: {
    bounds,
    eggsToSpawn,
  },
  type: actionTypes.START_SIMULATION,
})

export const stopSimulation = () => dispatch => dispatch({ type: actionTypes.STOP_SIMULATION })

export const zoomIn = () => dispatch => dispatch({ type: actionTypes.ZOOM_IN })

export const zoomOut = () => dispatch => dispatch({ type: actionTypes.ZOOM_OUT })

// export const updateEggsToSpawn = eggsToSpawn => dispatch => dispatch({
//   payload: { eggsToSpawn },
//   type: actionTypes.UPDATE_EGGS_TO_SPAWN,
// })
