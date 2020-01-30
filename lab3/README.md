# Emit garbage collection metrics

See the content of [./metrics.js](./metrics.js)
```js
const url = require('url');
const Prometheus = require('prom-client');
const promRegister = Prometheus.register;

const httpRequestHistogram = new Prometheus.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds histogram',
    labelNames: ['code', 'handler', 'method'],
    buckets: [0.025, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.45, 0.5, 0.55, 0.6, 0.75, 1, 2.5]
});

module.exports = (app) => {
    app.get('/metrics', (req, res, next) => {
        res.set('Content-Type', promRegister.contentType);
        res.end(promRegister.metrics());
    });
    app.use(httpResponseMiddleware)
}

const httpResponseMiddleware = (req, res, next) => {
    const path = url.parse(req.url).pathname;
    res.histogramEnd = httpRequestHistogram.startTimer({
        method: req.method,
        handler: path
    });
    res.on('finish', () => {
        res.histogramEnd({
            code: res.statusCode
        });
    });
    next();
};
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
# HELP http_request_duration_seconds Duration of HTTP requests in seconds histogram
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{le="0.025",method="GET",handler="/",code="200"} 17
http_request_duration_seconds_bucket{le="0.05",method="GET",handler="/",code="200"} 17
http_request_duration_seconds_bucket{le="0.1",method="GET",handler="/",code="200"} 17
http_request_duration_seconds_bucket{le="0.15",method="GET",handler="/",code="200"} 25
http_request_duration_seconds_bucket{le="0.2",method="GET",handler="/",code="200"} 25
http_request_duration_seconds_bucket{le="0.25",method="GET",handler="/",code="200"} 25
http_request_duration_seconds_bucket{le="0.3",method="GET",handler="/",code="200"} 25
http_request_duration_seconds_bucket{le="0.35",method="GET",handler="/",code="200"} 25
http_request_duration_seconds_bucket{le="0.45",method="GET",handler="/",code="200"} 25
http_request_duration_seconds_bucket{le="0.5",method="GET",handler="/",code="200"} 25
http_request_duration_seconds_bucket{le="0.55",method="GET",handler="/",code="200"} 25
http_request_duration_seconds_bucket{le="0.6",method="GET",handler="/",code="200"} 25
http_request_duration_seconds_bucket{le="0.75",method="GET",handler="/",code="200"} 25
http_request_duration_seconds_bucket{le="1",method="GET",handler="/",code="200"} 25
http_request_duration_seconds_bucket{le="2.5",method="GET",handler="/",code="200"} 25
http_request_duration_seconds_bucket{le="+Inf",method="GET",handler="/",code="200"} 25
http_request_duration_seconds_sum{method="GET",handler="/",code="200"} 0.848463098
http_request_duration_seconds_count{method="GET",handler="/",code="200"} 25
```