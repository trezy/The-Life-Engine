import EventEmitter from 'events'
import uuid from 'uuid/v4'





class Base extends EventEmitter {
  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  // Calculate the position between `min` and `max` for `value`
  // Set returnFixed to `true` to remove decimals
  _numGen (value, min, max, returnFixed = false) {
    max = parseInt(max)
    min = parseInt(min)
    value = parseInt(value)

    if (value >= 1) {
      value = value * 0.01
    }

    let num = value * (max - min) + min

    if (returnFixed) {
      num = num.toFixed()
    }

    return num
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor () {
    super()

    this.destroyExceptions = []
  }

  destroy () {
    this.removeAllListeners()
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  // Arbitrary data object for holding external info
  get data () {
    if (!this._data && this._data === undefined) {
      Object.defineProperty(this, '_data', { value: {} })
    }

    return this._data
  }

  get destroyExceptions () {
    if (!this._destroyExceptions && this._destroyExceptions !== undefined) {
      Object.defineProperty(this, '_destroyExceptions', {
        value: []
      })
    }

    return this._destroyExceptions
  }

  get id () {
    if (!this._id && this._id === undefined) {
      Object.defineProperty(this, '_id', {
        value: uuid(), // (Date.now() + parseInt(this.genes.join(''))).toString(36)
      })
    }

    return this._id
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set data (value) {
    throw new Error('The values inside an entity\'s data may be altered, but the object itself may not be set')
  }

  set destroyExceptions (value) {
    if (!Array.isArray(value)) {
      throw new Error('destroyExceptions must be an array')
    } else {
      this._destroyExceptions = value
    }
  }

  set id (value) {
    throw new Error('ID cannot be set')
  }
}





export { Base }
