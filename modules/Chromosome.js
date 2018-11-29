class Chromosome {
  _generateBit () {
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

  constructor () {
    /******************************************************************************\
      bit1: Gestation period
    \******************************************************************************/

    return this.chromosome = this._generateBit()
  }
}





export { Chromosome }
