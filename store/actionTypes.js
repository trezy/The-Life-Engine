const actionTypes = [
  'HATCH_EGG',
  'KILL_EGG',
  'START_SIMULATION',
  'STOP_SIMULATION',
  'UPDATE_EGGS_TO_SPAWN',
  'ZOOM_IN',
  'ZOOM_OUT',
].reduce((acc, actionType) => ({
  ...acc,
  [actionType]: actionType,
}), {})





export default actionTypes
