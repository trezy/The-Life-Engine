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
    const { simulation } = this.props
    const {
      currentX,
      currentY,
      lastX,
      lastY,
    } = this.state

    if (nextProps.dataDrag.isMoving) {
      const currentX = lastX + nextProps.dataDrag.moveDeltaX
      const currentY = lastY + nextProps.dataDrag.moveDeltaY
      const newState = {}
      const overdrawGutterX = simulation.bounds.width * 0.5
      const overdrawGutterY = simulation.bounds.height * 0.5

      let canDragEast = currentX < overdrawGutterX
      let canDragNorth = currentY < overdrawGutterY
      let canDragSouth = currentY > -overdrawGutterY
      let canDragWest = currentX > -overdrawGutterX

      const canDragHorizontally = canDragEast && canDragWest
      const canDragVertically = canDragNorth && canDragSouth

      if (canDragHorizontally) {
        newState.currentX = currentX
      } else if (canDragEast && (newState.currentX !== -overdrawGutterX)) {
        newState.currentX = -overdrawGutterX
      } else if (canDragWest && (newState.currentX !== overdrawGutterX)) {
        newState.currentX = overdrawGutterX
      }

      if (canDragVertically) {
        newState.currentY = currentY
      } else if (canDragNorth && (newState.currentY !== -overdrawGutterY)) {
        newState.currentY = -overdrawGutterY
      } else if (canDragSouth && (newState.currentY !== overdrawGutterY)) {
        newState.currentY = overdrawGutterY
      }

      if (Object.keys(newState).length) {
        this.setState(newState)
      }
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
          <g
            transform={[
              `translate(${currentX + simulation.offset.x} ${currentY + simulation.offset.y})`,
              `scale(${simulation.zoom})`,
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

            <circle
              cx={simulation.bounds.width / 2}
              cy={simulation.bounds.height / 2}
              id="dish-boundary"
              r={simulation.dishSize / 2} />
          </g>
        </svg>
      </div>
    )
  }
}





export { Dish }
