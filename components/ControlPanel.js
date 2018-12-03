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
        className="container form"
        id="control-panel"
        onSubmit={this._handleSubmit}>
        <div className="container with-title">
          <h3 className="title">
            Simulation Parameters
          </h3>

          <div className="field is-inline">
            <label htmlFor="simulation-width">Width</label>

            <input
              className="input"
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

          <div className="field is-inline">
            <label htmlFor="simulation-height">Height</label>

            <input
              className="input"
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
              onChange={({ target: { value }}) => this.setState({ eggsToSpawn: parseInt(value)})}
              step="10"
              type="range"
              value={eggsToSpawn} />
            <span>{eggsToSpawn}</span>
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
