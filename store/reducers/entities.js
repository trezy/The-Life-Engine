import actionTypes from '../actionTypes'
import initialState from '../initialState'
import {
  Creature,
  Egg,
} from '../../modules'





export default function entitiesReducer (state = initialState.entities, action) {
  const {
    payload,
    type,
  } = action

  const newState = { ...state }

  switch (type) {
    case actionTypes.HATCH_EGG:
      const { egg } = payload
      const creature = new Creature(egg)

      creature.data.position = { ...egg.data.position }

      newState.creatures.push(creature)
      break

    // case actionTypes.KILL_EGG:
    //   break

    case actionTypes.START_SIMULATION:
      newState.eggs = []

      while (newState.eggs.length < payload.eggsToSpawn) {
        const { bounds } = payload
        const egg = new Egg

        egg.data.position = {
          x: (Math.random() * (bounds.width - egg.phenotype.size)) + (egg.phenotype.size / 2),
          y: (Math.random() * (bounds.height - egg.phenotype.size)) + (egg.phenotype.size / 2),
        }

        newState.eggs.push(egg)
      }
      break

    case actionTypes.STOP_SIMULATION:
      for (const egg of state.eggs) {
        egg.destroy()
      }
      newState.eggs = []
      break

    default:
      break
  }

  return newState
}
