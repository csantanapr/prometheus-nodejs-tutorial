# Emit the default metrics

See the content of [./metrics.js](./metrics.js)
```js
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
# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.
# TYPE process_cpu_user_seconds_total counter
process_cpu_user_seconds_total 0.001651 1580339919314

# HELP process_cpu_system_seconds_total Total system CPU time spent in seconds.
# TYPE process_cpu_system_seconds_total counter
process_cpu_system_seconds_total 0.000067 1580339919314

# HELP process_cpu_seconds_total Total user and system CPU time spent in seconds.
# TYPE process_cpu_seconds_total counter
process_cpu_seconds_total 0.001718 1580339919314

# HELP process_start_time_seconds Start time of the process since unix epoch in seconds.
# TYPE process_start_time_seconds gauge
process_start_time_seconds 1580339919

# HELP process_resident_memory_bytes Resident memory size in bytes.
# TYPE process_resident_memory_bytes gauge
process_resident_memory_bytes 30318592 1580339919314

# HELP nodejs_eventloop_lag_seconds Lag of event loop in seconds.
# TYPE nodejs_eventloop_lag_seconds gauge
nodejs_eventloop_lag_seconds 0.005228952 1580339919319

# HELP nodejs_active_handles Number of active libuv handles grouped by handle type. Every handle type is C++ class name.
# TYPE nodejs_active_handles gauge
nodejs_active_handles{type="WriteStream"} 1

# HELP nodejs_active_handles_total Total number of active handles.
# TYPE nodejs_active_handles_total gauge
nodejs_active_handles_total 1

# HELP nodejs_active_requests Number of active libuv requests grouped by request type. Every request type is C++ class name.
# TYPE nodejs_active_requests gauge

# HELP nodejs_active_requests_total Total number of active requests.
# TYPE nodejs_active_requests_total gauge
nodejs_active_requests_total 0 1580339919314

# HELP nodejs_heap_size_total_bytes Process heap size from node.js in bytes.
# TYPE nodejs_heap_size_total_bytes gauge
nodejs_heap_size_total_bytes 10432512

# HELP nodejs_heap_size_used_bytes Process heap size used from node.js in bytes.
# TYPE nodejs_heap_size_used_bytes gauge
nodejs_heap_size_used_bytes 6357792

# HELP nodejs_external_memory_bytes Nodejs external memory size in bytes.
# TYPE nodejs_external_memory_bytes gauge
nodejs_external_memory_bytes 1233566

# HELP nodejs_heap_space_size_total_bytes Process heap space size total from node.js in bytes.
# TYPE nodejs_heap_space_size_total_bytes gauge
nodejs_heap_space_size_total_bytes{space="read_only"} 262144 1580339919315
nodejs_heap_space_size_total_bytes{space="new"} 4194304 1580339919315
nodejs_heap_space_size_total_bytes{space="old"} 4304896 1580339919315
nodejs_heap_space_size_total_bytes{space="code"} 425984 1580339919315
nodejs_heap_space_size_total_bytes{space="map"} 528384 1580339919315
nodejs_heap_space_size_total_bytes{space="large_object"} 667648 1580339919315
nodejs_heap_space_size_total_bytes{space="code_large_object"} 49152 1580339919315
nodejs_heap_space_size_total_bytes{space="new_large_object"} 0 1580339919315

# HELP nodejs_heap_space_size_used_bytes Process heap space size used from node.js in bytes.
# TYPE nodejs_heap_space_size_used_bytes gauge
nodejs_heap_space_size_used_bytes{space="read_only"} 31432 1580339919315
nodejs_heap_space_size_used_bytes{space="new"} 761512 1580339919315
nodejs_heap_space_size_used_bytes{space="old"} 4283656 1580339919315
nodejs_heap_space_size_used_bytes{space="code"} 172704 1580339919315
nodejs_heap_space_size_used_bytes{space="map"} 454480 1580339919315
nodejs_heap_space_size_used_bytes{space="large_object"} 655456 1580339919315
nodejs_heap_space_size_used_bytes{space="code_large_object"} 3456 1580339919315
nodejs_heap_space_size_used_bytes{space="new_large_object"} 0 1580339919315

# HELP nodejs_heap_space_size_available_bytes Process heap space size available from node.js in bytes.
# TYPE nodejs_heap_space_size_available_bytes gauge
nodejs_heap_space_size_available_bytes{space="read_only"} 230400 1580339919315
nodejs_heap_space_size_available_bytes{space="new"} 1333144 1580339919315
nodejs_heap_space_size_available_bytes{space="old"} 672 1580339919315
nodejs_heap_space_size_available_bytes{space="code"} 0 1580339919315
nodejs_heap_space_size_available_bytes{space="map"} 72 1580339919315
nodejs_heap_space_size_available_bytes{space="large_object"} 0 1580339919315
nodejs_heap_space_size_available_bytes{space="code_large_object"} 0 1580339919315
nodejs_heap_space_size_available_bytes{space="new_large_object"} 2094656 1580339919315

# HELP nodejs_version_info Node.js version info.
# TYPE nodejs_version_info gauge
nodejs_version_info{version="v12.9.1",major="12",minor="9",patch="1"} 1
```