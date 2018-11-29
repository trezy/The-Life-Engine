// Module imports
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
    'zoomIn',
    'zoomOut',
  ]

  state = {
    bounds: {
      height: isClient() ? window.innerHeight : 500,
      width: isClient() ? window.innerWidth : 500,
    },
    eggsToSpawn: 100,
  }

  _handleSubmit = event => {
    const {
      simulation,
      startSimulation,
      stopSimulation,
    } = this.props
    const {
      bounds,
      eggsToSpawn,
    } = this.state

    event.preventDefault()

    if (simulation.running) {
      stopSimulation()
    } else {
      startSimulation(eggsToSpawn, bounds)
    }
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    const {
      simulation,
      zoomIn,
      zoomOut,
    } = this.props
    const {
      bounds,
      eggsToSpawn,
    } = this.state

    return (
      <form
        id="control-panel"
        onSubmit={this._handleSubmit}>
        <fieldset>
          <legend>Simulation Parameters</legend>

          <fieldset>
            <legend>Size</legend>

            <div className="input-group">
              <label htmlFor="simulation-width">Width</label>

              <input
                disabled={simulation.running}
                id="simulation-width"
                name="simulation-width"
                onChange={({ target: { value }}) => this.setState({
                  bounds: {
                    ...bounds,
                    width: parseInt(value) || 0,
                  }
                })}
                type="number"
                value={bounds.width} />
            </div>

            <div className="input-group">
              <label htmlFor="simulation-height">Height</label>

              <input
                disabled={simulation.running}
                id="simulation-height"
                name="simulation-height"
                onChange={({ target: { value }}) => this.setState({
                  bounds: {
                    ...bounds,
                    height: parseInt(value) || 0,
                  }
                })}
                type="number"
                value={bounds.height} />
            </div>
          </fieldset>
        </fieldset>

        <fieldset>
          <legend>Entity Controls</legend>
          <label htmlFor="egg-count">Eggs to Spawn:</label>

          <input
            disabled={simulation.running}
            id="egg-count"
            max="1000"
            min="10"
            name="egg-count"
            onChange={({ target: { value }}) => this.setState({ eggsToSpawn: parseInt(value)})}
            step="10"
            type="range"
            value={eggsToSpawn} />
        </fieldset>

        <button
          name="simulation-control"
          type="submit">
          {simulation.running ? 'Stop' : 'Start'} the simulation
        </button>

        <div>
          <button
            name="zoom-in"
            onClick={zoomIn}
            type="button">
            Zoom in
          </button>

          <button
            name="zoom-out"
            onClick={zoomOut}
            type="button">
            Zoom out
          </button>
        </div>
      </form>
    )
  }
}





export { ControlPanel }
