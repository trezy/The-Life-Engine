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
    eggsToSpawn: 100,
    running: false,
    zoom: 1,
  },
  statistics: {
    eggs: {
      alive: 0,
      dead: 0,
      hatched: 0,
    },
    creatures: {
      alive: 0,
      dead: 0,
    }
  }
}





export default initialState
