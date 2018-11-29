// Module imports
import React from 'react'





// Component imports
import { connect } from '../store'





@connect
class StatisticsPanel extends React.Component {
  /***************************************************************************\
    Local Properties
  \***************************************************************************/

  static mapStateToProps = ({ statistics }) => ({ statistics })





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    const {
      creatures,
      eggs,
    } = this.props.statistics

    return (
      <div id="statistics-panel">
        <table>
          <tbody>
            <tr>
              <th />

              <th>Eggs</th>

              <th>Creatures</th>
            </tr>

            <tr>
              <th>Alive</th>

              <td>{eggs.alive}</td>

              <td>{creatures.alive}</td>
            </tr>

            <tr>
              <th>Dead</th>

              <td>{eggs.dead}</td>

              <td>{creatures.dead}</td>
            </tr>

            <tr>
              <th>Total</th>

              <td>{eggs.alive + eggs.dead}</td>

              <td>{creatures.alive + creatures.dead}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}





export { StatisticsPanel }
