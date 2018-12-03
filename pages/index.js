// Module imports
import { connect } from '../store'
import React from 'react'





// Component imports
import '../scss/app.scss'
import '../helpers/bootstrap'
import {
  ControlPanel,
  Dish,
  StatisticsPanel,
} from '../components'





@connect
class Home extends React.Component {
  /***************************************************************************\
    Local Properties
  \***************************************************************************/

  static mapStateToProps = ({ simulation }) => ({ simulation })





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    const { simulation } = this.props

    return (
      <React.Fragment>
        <Dish
          eggsToSpawn={simulation.eggsToSpawn}
          running={simulation.running} />

        <ControlPanel />

        {simulation.running && (
          <StatisticsPanel />
        )}
      </React.Fragment>
    )
  }
}





export default Home
