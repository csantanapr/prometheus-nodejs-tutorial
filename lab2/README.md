# Emit garbage collection metrics

See the content of [./metrics.js](./metrics.js)
```js
const Prometheus = require('prom-client')
const gcStats = require('prometheus-gc-stats')

const promRegister = Prometheus.register
const startGcStats = gcStats(promRegister)

startGcStats()

module.exports = (app) => {
  app.get('/metrics', (req, res, next) => {
    res.set('Content-Type', promRegister.contentType)
    res.end(promRegister.metrics())
  })
}
```


```bash
npm install
```

```bash
npm start
```

Get the metrics via `/metrics`
```
curl localhost:8080/metrics
```

Here is an example of the output:
```
# HELP nodejs_gc_runs_total Count of total garbage collections.
# TYPE nodejs_gc_runs_total counter
nodejs_gc_runs_total{gctype="Scavenge"} 1
nodejs_gc_runs_total{gctype="IncrementalMarking"} 2
nodejs_gc_runs_total{gctype="MarkSweepCompact"} 2

# HELP nodejs_gc_pause_seconds_total Time spent in GC Pause in seconds.
# TYPE nodejs_gc_pause_seconds_total counter
nodejs_gc_pause_seconds_total{gctype="Scavenge"} 0.000574468
nodejs_gc_pause_seconds_total{gctype="IncrementalMarking"} 0.000137987
nodejs_gc_pause_seconds_total{gctype="MarkSweepCompact"} 0.003263329

# HELP nodejs_gc_reclaimed_bytes_total Total number of bytes reclaimed by GC.
# TYPE nodejs_gc_reclaimed_bytes_total counter
nodejs_gc_reclaimed_bytes_total{gctype="Scavenge"} 2758376
nodejs_gc_reclaimed_bytes_total{gctype="MarkSweepCompact"} 2075792
```