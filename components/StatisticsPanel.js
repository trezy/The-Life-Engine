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
      creaturesAlive,
      creaturesDead,
      eggsAlive,
      eggsDead,
      eggsHatched,
    } = this.props.statistics

    return (
      <div
        className="container with-title"
        id="statistics-panel">
        <h2 className="title">
          Statistics
        </h2>

        <div className="container with-title">
          <h3 className="title">
            Eggs
          </h3>

          <table className="table is-bordered">
            <thead>
              <tr>
                <th>Alive</th>

                <th>Hatch'd</th>

                <th>Dead</th>

                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{eggsAlive}</td>

                <td>{eggsHatched}</td>

                <td>{eggsDead}</td>

                <td>{eggsAlive + eggsHatched + eggsDead}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="container with-title">
          <h3 className="title">
            Creatures
          </h3>

          <table className="table is-bordered">
            <thead>
              <tr>
                <th>Alive</th>

                <th>Dead</th>

                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{creaturesAlive}</td>

                <td>{creaturesDead}</td>

                <td>{creaturesAlive + creaturesDead}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}





export { StatisticsPanel }
