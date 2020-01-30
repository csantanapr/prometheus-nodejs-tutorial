# Using the prom-client express middleware wrapper express-prom-bundle


See the content of [./metrics.js](./metrics.js)
```js
const promBundle = require("express-prom-bundle");

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeUp: false,
  metricType: 'histogram',
  buckets: [0.025, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.5, 0.55, 0.6, 0.75, 1, 2.5, 10],
  promClient: {
    collectDefaultMetrics: {
      timestamps: false
    }
  }
});

module.exports = (app) => {
  app.use(metricsMiddleware)
}
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

Get the metrics via `/metrics`
```bash
curl http://localhost:8080/metrics
```

Here is an example of the output:
```
# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.
# TYPE process_cpu_user_seconds_total counter
process_cpu_user_seconds_total 0.050724 1580409960992

# HELP process_cpu_system_seconds_total Total system CPU time spent in seconds.
# TYPE process_cpu_system_seconds_total counter
process_cpu_system_seconds_total 0.00534 1580409960992

# HELP process_cpu_seconds_total Total user and system CPU time spent in seconds.
# TYPE process_cpu_seconds_total counter
process_cpu_seconds_total 0.056064 1580409960992

# HELP process_start_time_seconds Start time of the process since unix epoch in seconds.
# TYPE process_start_time_seconds gauge
process_start_time_seconds 1580409821

# HELP process_resident_memory_bytes Resident memory size in bytes.
# TYPE process_resident_memory_bytes gauge
process_resident_memory_bytes 27602944 1580409960992

# HELP nodejs_eventloop_lag_seconds Lag of event loop in seconds.
# TYPE nodejs_eventloop_lag_seconds gauge
nodejs_eventloop_lag_seconds 0.000334835 1580409960992

# HELP nodejs_active_handles Number of active libuv handles grouped by handle type. Every handle type is C++ class name.
# TYPE nodejs_active_handles gauge
nodejs_active_handles{type="WriteStream"} 2
nodejs_active_handles{type="ReadStream"} 1
nodejs_active_handles{type="Server"} 1
nodejs_active_handles{type="Socket"} 2

# HELP nodejs_active_handles_total Total number of active handles.
# TYPE nodejs_active_handles_total gauge
nodejs_active_handles_total 6

# HELP nodejs_active_requests Number of active libuv requests grouped by request type. Every request type is C++ class name.
# TYPE nodejs_active_requests gauge

# HELP nodejs_active_requests_total Total number of active requests.
# TYPE nodejs_active_requests_total gauge
nodejs_active_requests_total 0 1580409960992

# HELP nodejs_heap_size_total_bytes Process heap size from node.js in bytes.
# TYPE nodejs_heap_size_total_bytes gauge
nodejs_heap_size_total_bytes 7970816

# HELP nodejs_heap_size_used_bytes Process heap size used from node.js in bytes.
# TYPE nodejs_heap_size_used_bytes gauge
nodejs_heap_size_used_bytes 6371536

# HELP nodejs_external_memory_bytes Nodejs external memory size in bytes.
# TYPE nodejs_external_memory_bytes gauge
nodejs_external_memory_bytes 1346123

# HELP nodejs_heap_space_size_total_bytes Process heap space size total from node.js in bytes.
# TYPE nodejs_heap_space_size_total_bytes gauge
nodejs_heap_space_size_total_bytes{space="read_only"} 262144 1580409960992
nodejs_heap_space_size_total_bytes{space="new"} 1048576 1580409960992
nodejs_heap_space_size_total_bytes{space="old"} 4857856 1580409960992
nodejs_heap_space_size_total_bytes{space="code"} 430080 1580409960992
nodejs_heap_space_size_total_bytes{space="map"} 790528 1580409960992
nodejs_heap_space_size_total_bytes{space="large_object"} 532480 1580409960992
nodejs_heap_space_size_total_bytes{space="code_large_object"} 49152 1580409960992
nodejs_heap_space_size_total_bytes{space="new_large_object"} 0 1580409960992

# HELP nodejs_heap_space_size_used_bytes Process heap space size used from node.js in bytes.
# TYPE nodejs_heap_space_size_used_bytes gauge
nodejs_heap_space_size_used_bytes{space="read_only"} 33040 1580409960992
nodejs_heap_space_size_used_bytes{space="new"} 1005984 1580409960992
nodejs_heap_space_size_used_bytes{space="old"} 4272040 1580409960992
nodejs_heap_space_size_used_bytes{space="code"} 181120 1580409960992
nodejs_heap_space_size_used_bytes{space="map"} 354240 1580409960992
nodejs_heap_space_size_used_bytes{space="large_object"} 524344 1580409960992
nodejs_heap_space_size_used_bytes{space="code_large_object"} 2784 1580409960992
nodejs_heap_space_size_used_bytes{space="new_large_object"} 0 1580409960992

# HELP nodejs_heap_space_size_available_bytes Process heap space size available from node.js in bytes.
# TYPE nodejs_heap_space_size_available_bytes gauge
nodejs_heap_space_size_available_bytes{space="read_only"} 0 1580409960992
nodejs_heap_space_size_available_bytes{space="new"} 41440 1580409960992
nodejs_heap_space_size_available_bytes{space="old"} 570664 1580409960992
nodejs_heap_space_size_available_bytes{space="code"} 12000 1580409960992
nodejs_heap_space_size_available_bytes{space="map"} 434640 1580409960992
nodejs_heap_space_size_available_bytes{space="large_object"} 0 1580409960992
nodejs_heap_space_size_available_bytes{space="code_large_object"} 0 1580409960992
nodejs_heap_space_size_available_bytes{space="new_large_object"} 1047424 1580409960992

# HELP nodejs_version_info Node.js version info.
# TYPE nodejs_version_info gauge
nodejs_version_info{version="v13.7.0",major="13",minor="7",patch="0"} 1

# HELP http_request_duration_seconds duration histogram of http responses labeled with: status_code, method, path
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{le="0.025",status_code="200",method="GET",path="/"} 12
http_request_duration_seconds_bucket{le="0.05",status_code="200",method="GET",path="/"} 12
http_request_duration_seconds_bucket{le="0.1",status_code="200",method="GET",path="/"} 12
http_request_duration_seconds_bucket{le="0.15",status_code="200",method="GET",path="/"} 17
http_request_duration_seconds_bucket{le="0.2",status_code="200",method="GET",path="/"} 17
http_request_duration_seconds_bucket{le="0.25",status_code="200",method="GET",path="/"} 17
http_request_duration_seconds_bucket{le="0.3",status_code="200",method="GET",path="/"} 17
http_request_duration_seconds_bucket{le="0.35",status_code="200",method="GET",path="/"} 17
http_request_duration_seconds_bucket{le="0.45",status_code="200",method="GET",path="/"} 17
http_request_duration_seconds_bucket{le="0.5",status_code="200",method="GET",path="/"} 17
http_request_duration_seconds_bucket{le="0.55",status_code="200",method="GET",path="/"} 17
http_request_duration_seconds_bucket{le="0.6",status_code="200",method="GET",path="/"} 17
http_request_duration_seconds_bucket{le="0.75",status_code="200",method="GET",path="/"} 17
http_request_duration_seconds_bucket{le="1",status_code="200",method="GET",path="/"} 17
http_request_duration_seconds_bucket{le="2.5",status_code="200",method="GET",path="/"} 17
http_request_duration_seconds_bucket{le="10",status_code="200",method="GET",path="/"} 17
http_request_duration_seconds_bucket{le="+Inf",status_code="200",method="GET",path="/"} 17
http_request_duration_seconds_sum{status_code="200",method="GET",path="/"} 0.5371957699999999
http_request_duration_seconds_count{status_code="200",method="GET",path="/"} 17
```

