// Module imports
import PropTypes from 'prop-types'





// Component imports
import { Creature } from '../modules'





class CreatureRenderer extends React.Component {
  /***************************************************************************\
    Local Properties
  \***************************************************************************/

  static defaultProps = {}

  static propTypes = {
    creature: PropTypes.instanceOf(Creature).isRequired,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    const { creature } = this.props
    const {
      x,
      y,
    } = this.position

    console.log('rendering creature!')

    return (
      <g
        className="creature"
        data-egg-id={creature.egg.id}
        id={creature.id}
        transform={`translate(${x - (creature.phenotype.size / 2)}, ${y - (creature.phenotype.size / 2)})`}>
        <title />

        <rect
          fill={`rgb(${creature.phenotype.color.join(', ')})`}
          height={creature.phenotype.size}
          rx={creature.phenotype.size / 6}
          ry={creature.phenotype.size / 6}
          width={creature.phenotype.size} />

        {/* <div>{egg.dnaMap.map(dna => dna.genes.join(', ')).join(' | ')}</div> */}
      </g>
    )
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get position () {
    const { creature } = this.props

    if (!this._position) {
      return this._position = creature.egg.data.position
    }

    return this._position = {
      x: this._position.x,
      y: this._position.y,
    }
  }
}





export { CreatureRenderer }
