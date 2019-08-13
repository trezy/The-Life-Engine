// Module imports
import clickdrag from 'react-clickdrag'
import React from 'react'





// Component imports
import { connect } from '../store'
import {
  CreatureRenderer,
  EggRenderer,
} from '.'
import isClient from '../helpers/isClient'





@clickdrag
@connect
class Dish extends React.Component {
  /***************************************************************************\
    Local Properties
  \***************************************************************************/

  static mapDispatchToProps = [
    'updateBounds',
  ]

  static mapStateToProps = ({ entities, simulation }) => ({ entities, simulation })

  state = {
    currentX: 0,
    currentY: 0,
    lastX: 0,
    lastY: 0,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _bindEvents () {
    const { updateBounds } = this.props

    window.addEventListener('resize', this._updateBounds)
  }

  _updateBounds = () => {
    const { updateBounds } = this.props

    updateBounds({
      height: window.innerHeight,
      width: window.innerWidth,
    })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidMount () {
    if (isClient()) {
      this._updateBounds()
      this._bindEvents()
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      lastX,
      lastY,
      currentX,
      currentY,
    } = this.state

    if (nextProps.dataDrag.isMoving) {
      this.setState({
        currentX: lastX + nextProps.dataDrag.moveDeltaX,
        currentY: lastY + nextProps.dataDrag.moveDeltaY,
      })
    } else {
      this.setState({
        lastX: currentX,
        lastY: currentY,
      })
    }
  }

  render() {
    const {
      entities,
      simulation,
    } = this.props
    const {
      currentX,
      currentY,
    } = this.state

    return (
      <div id="dish-container">
        <svg
          id="dish"
          height={simulation.bounds.height}
          // viewBox={viewBox.join(' ')}
          width={simulation.bounds.width}>
          <circle
            cx={simulation.bounds.width / 2}
            cy={simulation.bounds.height / 2}
            id="dish-boundary"
            r={simulation.dishSize / 2}
            transform={[
              `scale(${simulation.zoom})`,
              `translate(${currentX} ${currentY})`,
            ].join(' ')} />

          <g
            transform={[
              `scale(${simulation.zoom})`,
              `translate(${currentX} ${currentY})`,
            ].join(' ')}>
            {simulation.running && (
              <React.Fragment>
                <g className="eggs">
                  {entities.eggs.map(egg => (
                    <EggRenderer
                      egg={egg}
                      key={egg.id} />
                  ))}
                </g>

                <g className="creatures">
                  {entities.creatures.map(creature => (
                    <CreatureRenderer
                      creature={creature}
                      key={creature.id} />
                  ))}
                </g>
              </React.Fragment>
            )}
          </g>
        </svg>
      </div>
    )
  }
}





export { Dish }
