const initialState = {
  entities: {
    creatures: [],
    eggs: [],
  },
  simulation: {
    bounds: {
      height: 0,
      width: 0,
    },
    canZoomOut: true,
    dishSize: 500,
    eggsToSpawn: 100,
    running: false,
    zoom: 1,
  },
  statistics: {
    eggsAlive: 0,
    eggsDead: 0,
    eggsHatched: 0,
    creaturesAlive: 0,
    creaturesDead: 0,
  }
}





export default initialState
