# Push http server metrics

See the content of [./metrics.js](./metrics.js)
```js
const Prometheus = require('prom-client')

const os = require('os')
const gateway = new Prometheus.Pushgateway('http://localhost:9091', {}, Prometheus.register)
const hostname = os.hostname()

// push metrics to prometheus gateway every 5 seconds
setInterval((app) => {
  console.log('pushing metrics...')
  gateway.pushAdd({ jobName: 'http_metrics', groupings: { instance: hostname } }, (err, resp, body) => { if (err) { console.error(err.message) } })
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
  const path = new URL(req.url, `http://${req.hostname}`).pathname
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
```

In a new terminal start the Prometheus gateway.
```bash
docker pull prom/pushgateway
```

```bash
docker run --rm -p 9091:9091 prom/pushgateway
```

Start the application
```bash
npm install
```

```bash
npm start
```

Use the app
```bash
open http://localhost:8080/
```

The web server will push the metrics every 5 seconds as configured in the code.

Metrics are not available via scrape endpoint `/metrics` on the Node.js web server.

You can access the metrics from the gateway using http://localhost:9091/metrics

Open the UI on Prometheus Metrics http://localhost:9091/

Expand the job `http_metrics`, then expand the histogram metric `http_request_duration_seconds`.

![pushgateway user interface](pushgateway.png)
