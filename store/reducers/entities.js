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

    case actionTypes.START_SIMULATION:
      const { 
        bounds,
        dishSize,
      } = payload

      const center = {
        x: bounds.width / 2,
        y: bounds.height / 2,
      }

      newState.eggs = []

      while (newState.eggs.length < payload.eggsToSpawn) {
        const egg = new Egg

        const a = Math.random() * 2 * Math.PI
        const r = ((dishSize / 2) - egg.phenotype.size) * Math.sqrt(Math.random())

        egg.data.position = {
          x: (r * Math.cos(a)) + (egg.phenotype.size / 2) + center.x,
          y: (r * Math.sin(a)) + (egg.phenotype.size / 2) + center.y,
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
