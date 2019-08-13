// Component imports
import actionTypes from '../actionTypes'





export const startSimulation = () => (dispatch, getState) => {
  const { 
    simulation: { 
      bounds,
      dishSize,
      eggsToSpawn,
    },
  } = getState()

  dispatch({
    payload: { 
      bounds,
      dishSize,
      eggsToSpawn,
    },
    type: actionTypes.START_SIMULATION,
  })
}

export const stopSimulation = () => dispatch => dispatch({ type: actionTypes.STOP_SIMULATION })

export const updateBounds = bounds => dispatch => dispatch({
  payload: { bounds },
  type: actionTypes.UPDATE_BOUNDS,
})

export const updateDishSize = size => dispatch => dispatch({
  payload: { size },
  type: actionTypes.UPDATE_DISH_SIZE,
})

export const updateEggsToSpawn = eggsToSpawn => dispatch => dispatch({
  payload: { eggsToSpawn },
  type: actionTypes.UPDATE_EGGS_TO_SPAWN,
})

export const zoomIn = () => dispatch => dispatch({ type: actionTypes.ZOOM_IN })

export const zoomOut = () => dispatch => dispatch({ type: actionTypes.ZOOM_OUT })
