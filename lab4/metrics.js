const url = require('url')
const os = require('os')
const Prometheus = require('prom-client')

const gateway = new Prometheus.Pushgateway('http://localhost:9091', {}, Prometheus.register)
const hostname = os.hostname()

// push metrics to prometheus gateway every 5 seconds
setInterval((app) => {
  console.log('pushing metrics...')
  gateway.pushAdd({ jobName: 'http_metrics', groupings: { instance: hostname } }, function (err, resp, body) { })
}, 5000)

const httpRequestHistogram = new Prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds histogram',
  labelNames: ['code', 'handler', 'method'],
  buckets: [0.025, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.5, 0.55, 0.6, 0.75, 1, 2.5]
})

module.exports = (app) => {
  app.use(httpResponseMiddleware)
}

const httpResponseMiddleware = (req, res, next) => {
  const path = url.parse(req.url).pathname
  res.histogramEnd = httpRequestHistogram.startTimer({
    method: req.method,
    handler: path
  })
  res.on('finish', () => {
    res.histogramEnd({
      code: res.statusCode
    })
  })
  next()
}
