import config from '../config'
import { Base } from '.'





class Creature extends Base {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (egg) {
    super()

    this.birthDate = new Date
    this.egg = egg
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  // Proxy `genotype` from the egg
  get egg () {
    return this._egg
  }

  get genotype () {
    return this._egg.genotype
  }

  get phenotype () {
    if (!this._phenotype && this._phenotype === undefined) {
      const { genes } = this.egg.prime

      Object.defineProperty(this, '_phenotype', {
        value: {
          color: [
            genes[3],
            genes[4],
            genes[5],
          ],
          size: genes[1],
        },
      })
    }

    return this._phenotype
  }

  get phenotype () {
    if (!this._phenotype && this._phenotype === undefined) {
      const { genes } = this.prime

      const color = [
        genes[3],
        genes[4],
        genes[5],
      ]
      const energy = genes[2]
      const size = this._numGen(genes[1], config.creature.size.min, config.creature.size.max)
      const consumptionRate = size * genes[6]

      Object.defineProperty(this, '_phenotype', {
        value: {
          color,
          consumptionRate,
          energy,
          size,
        },
        writable: true,
      })
    }

    return this._phenotype
  }

  // Proxy `prime` gene from the egg
  get prime () {
    return this.egg.prime
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  // Proxy `genotype` to the egg
  set genotype (value) {
    this._egg.genotype = value
  }

  set egg (value) {
    if (!this._egg) {
      Object.defineProperty(this, '_egg', {
        value: value
      })
    } else {
      throw new Error('Egg may only be set once')
    }
  }

  set phenotype (value) {
    throw new Error('Phenotype may not be set')
  }
}





export { Creature }
