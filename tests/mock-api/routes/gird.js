const Grid = require('../resources/grid')

module.exports = (app) => {
  app.get('/api/grid', (request, response) => {
    const gridData = Grid.getData()
    response.json(gridData)
  })
  app.get('/api/grid2', (request, response) => {
    const gridData = Grid.getData2()
    response.json(gridData)
  })
}
