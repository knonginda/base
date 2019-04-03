const Grid = require('../resources/grid')

module.exports = (app) => {
  app.get('/api/grid', (request, response) => {
    const gridData = Grid.getData()
    response.json(gridData)
  })
}
