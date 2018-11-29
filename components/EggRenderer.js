// Module imports
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Component imports
import { connect } from '../store'
import { Egg } from '../modules'





@connect
class EggRenderer extends React.Component {
  /***************************************************************************\
    Local Properties
  \***************************************************************************/

  static defaultProps = {}

  static mapDispatchToProps = ['hatchEgg', 'killEgg']

  static propTypes = { egg: PropTypes.instanceOf(Egg).isRequired }

  state = {
    dead: false,
    hatched: false,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidMount () {
    const {
      egg,
      hatchEgg,
      killEgg,
    } = this.props

    egg.on('death', () => {
      killEgg(egg)
      this.setState({ dead: true })
    })

    egg.on('hatch', () => {
      console.log('Egg is hatching!')
      hatchEgg(egg)
      this.setState({ hatched: true })
    })
  }

  render () {
    const { egg } = this.props
    const {
      dead,
      hatched,
    } = this.state
    const {
      x,
      y,
    } = egg.data.position

    return (
      <g
        className={classnames('egg', { dead })}
        id={egg.id}
        transform={`translate(${x}, ${y})`}>
        <title />

        <circle
          fill={`rgba(${egg.phenotype.color.join(', ')}, ${hatched ? 0.3 : 1})`}
          r={egg.phenotype.size / 2} />

        {dead && (
          <text textAnchor="middle">
            💀
          </text>
        )}
        <div>{egg.genotype.map(dna => dna.genes.join(', ')).join(' | ')}</div>
      </g>
    )
  }
}





export { EggRenderer }
