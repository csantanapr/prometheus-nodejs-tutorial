const Prometheus = require('prom-client')

const promRegister = Prometheus.register
const collectDefaultMetrics = Prometheus.collectDefaultMetrics

// timestamp its not remove from all metrics
collectDefaultMetrics({ timestamps: false })

module.exports = (app) => {
  app.get('/metrics', (req, res, next) => {
    res.set('Content-Type', promRegister.contentType)
    res.end(promRegister.metrics())
  })
}
