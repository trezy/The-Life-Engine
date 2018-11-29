import config from '../config'
import {
  Base,
  DNA,
} from '.'





class Egg extends Base {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _consume = () => {
    this.emit('consume')

    if (this.phenotype.energy) {
      this.phenotype.energy = this.phenotype.energy - 1
    } else {
      this._die()
    }

    return this
  }

  _die () {
    this._stopConsumption()
    this._stopGestation()
    this.state = 'dead'
    this.emit('death', this)

    return this
  }

  _hatch = () => {
    this._stopConsumption()
    this._stopGestation()
    // this.creature = new Creature(this)
    this.state = 'hatched'
    this.emit('hatch', this)

    return this
  }

  _stopConsumption () {
    if (this.consumption) {
      clearInterval(this.consumption)
    }
  }

  _stopGestation () {
    if (this.gestation) {
      clearTimeout(this.gestation)
    }
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor () {
    super()

    this.gestation = setTimeout(this._hatch, this.phenotype.gestationPeriod)
    this.consumption = setInterval(this._consume, this.phenotype.consumptionRate)

    return this
  }

  destroy () {
    super.destroy()
    // Clear out the timers
    this._stopConsumption()
    this._stopGestation()

    // // Remove references to the egg from the creature and vice versa
    // if (this.creature) {
    //   delete this.creature.egg
    //   delete this.creature
    // }

    return this
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get creature () {
    if (!this._creature && this._creature === undefined) {
      Object.defineProperty(this, '_creature', {
        value: null,
        writable: true,
      })
    }

    return this._creature
  }

  get genotype () {
    if (!this._genotype && this._genotype === undefined) {
      let dnaCount = this._numGen(Math.random() * 100, config.egg.DNA.min, config.egg.DNA.max, true)

      Object.defineProperty(this, '_genotype', { value: [] })

      for (let i = 0; i < dnaCount; i++) {
        this._genotype.push(new DNA)
      }
    }

    return this._genotype
  }

  // Proxy `genes` from the prime DNA
  get genes () {
    return this.prime.genes
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
      const gestationPeriod = this._numGen(genes[0], config.egg.gestation.min, config.egg.gestation.max)
      const size = this._numGen(genes[1], config.egg.size.min, config.egg.size.max)
      const consumptionRate = size * genes[6]

      Object.defineProperty(this, '_phenotype', {
        value: {
          color,
          consumptionRate,
          energy,
          gestationPeriod,
          size,
        },
        writable: true,
      })
    }

    return this._phenotype
  }

  get prime () {
    if (!this._prime && this._prime === undefined) {
      // Generate a random index to select our prime DNA strand for the egg
      let primeIndex = (Math.random() * (this.genotype.length - 1)).toFixed()

      Object.defineProperty(this, '_prime', {
        value: this.genotype[primeIndex]
      })
    }

    return this._prime
  }

  get state () {
    if (!this._state && this._state === undefined) {
      Object.defineProperty(this, '_state', {
        value: 'alive',
        writable: true,
      })
    }

    return this._state
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set creature (value) {
    this._creature = value
  }

  set genotype (value) {
    throw new Error('genotype cannot be set')
  }

  // Proxy `genes` to the prime DNA
  set genes (value) {
    this.prime.genes = value
  }

  set phenotype (value) {
    this._phenotype = value
  }

  set prime (value) {
    throw new Error('prime cannot be set')
  }

  set state (value) {
    this._state = value
  }
}





export { Egg }
