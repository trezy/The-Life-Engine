// Component imports
import actionTypes from '../actionTypes'





export const hatchEgg = egg => dispatch => dispatch({
  payload: { egg },
  type: actionTypes.HATCH_EGG,
})

export const killEgg = egg => dispatch => dispatch({
  payload: { egg },
  type: actionTypes.KILL_EGG,
})
