// Module imports
import classnames from 'classnames'
import React from 'react'





// Component imports
import { connect } from '../store'
import isClient from '../helpers/isClient'





@connect
class ControlPanel extends React.Component {
  /***************************************************************************\
    Local Properties
  \***************************************************************************/

  static mapStateToProps = ({ simulation }) => ({ simulation })

  static mapDispatchToProps = [
    'startSimulation',
    'stopSimulation',
    'updateDishSize',
    'updateEggsToSpawn',
    'zoomIn',
    'zoomOut',
  ]

  _handleDishSizeChange = ({ target: { value }}) => {
    const { updateDishSize } = this.props

    updateDishSize(value)
  }

  _handleEggCountChange ({ target: { value }}) {
    const { updateEggsToSpawn } = this.props
    
    updateEggsToSpawn(parseInt(value))
  }

  _handleSubmit = event => {
    const {
      simulation,
      startSimulation,
      stopSimulation,
    } = this.props

    event.preventDefault()

    if (simulation.running) {
      stopSimulation()
    } else {
      startSimulation()
    }
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidMount () {
    const { updateDishSize } = this.props

    if (isClient()) {
      updateDishSize(Math.round(Math.min(window.innerHeight, window.innerWidth) / 2))
    }
  }

  render () {
    const {
      simulation,
      zoomIn,
      zoomOut,
    } = this.props

    return (
      <form
        className="container form"
        id="control-panel"
        onSubmit={this._handleSubmit}>
        <div className="container with-title">
          <h3 className="title">
            Simulation Parameters
          </h3>

          <div className="field is-inline">
            <label htmlFor="simulation-dish-size">Dish Size</label>

            <input
              className="input"
              disabled={simulation.running}
              id="simulation-dish-size"
              name="simulation-dish-size"
              onChange={this._handleDishSizeChange}
              type="number"
              value={simulation.dishSize} />
          </div>
        </div>

        <div className="container with-title">
          <h3 className="title">Entity Controls</h3>

          <label htmlFor="egg-count">Eggs to Spawn:</label>

          <div className="field is-inline">
            <input
              disabled={simulation.running}
              id="egg-count"
              max="1000"
              min="10"
              name="egg-count"
              onChange={this._handleEggCountChange}
              step="10"
              type="range"
              value={simulation.eggsToSpawn} />
            <span>{simulation.eggsToSpawn}</span>
          </div>
        </div>

        <menu type="toolbar">
          <div className="primary">
            <button
              className={classnames('btn', {
                'is-error': simulation.running,
                'is-primary': !simulation.running,
              })}
              name="simulation-control"
              type="submit">
              <img
                className="small sixteen-bit-icon"
                src={`/static/icons/${simulation.running ? 'stop' : 'play'}.svg`} />
            </button>
          </div>

          <div className="secondary">
            <button
              className="btn"
              name="zoom-in"
              onClick={zoomIn}
              type="button">
              <img
                className="small sixteen-bit-icon"
                src="/static/icons/magnifying-glass.zoom-in.svg" />
            </button>

            <button
              className="btn"
              disabled={!simulation.canZoomOut}
              name="zoom-out"
              onClick={zoomOut}
              type="button">

              <img
                className="small sixteen-bit-icon"
                src="/static/icons/magnifying-glass.zoom-out.svg" />
            </button>
          </div>
        </menu>
      </form>
    )
  }
}





export { ControlPanel }
