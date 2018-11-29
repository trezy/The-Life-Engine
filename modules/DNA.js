import config from '../config'
import { Base } from '.'





class DNA extends Base {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _generateChromosome () {
    // Generate a random value between 0 and 255
    let bit = Math.random() * 255

    // Verify that the bit hasn't done anything crazy and gone out of range
    if (0 > bit || bit > 255) {
      throw new Error('Bit is out of range')
      return
    }

    // Convert the bit to a string so we can add 0 padding
    bit = bit.toFixed()

    // Add 0 padding
    if (bit.length < 2) bit = 0 + bit
    if (bit.length < 3) bit = 0 + bit

    return bit
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor () {
    super()

    return this
  }





  /******************************************************************************\
    Getters
  \******************************************************************************/

  get genes () {
    if (!this._genes) {
      Object.defineProperty(this, '_genes', {
        value: []
      })

      for (let chromosomesGenerated = 0; chromosomesGenerated < config.DNA.chromosomeCount; chromosomesGenerated++) {
        this._genes.push(this._generateChromosome())
      }
    }

    return this._genes
  }





  /******************************************************************************\
    Setters
  \******************************************************************************/

  set genes (value) {
    throw new Error('Genes cannot be set')
  }
}





export { DNA }
