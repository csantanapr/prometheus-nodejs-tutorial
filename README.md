# Using prom-client library in Node.js

## Lab 1

Emit the default metrics [lab1](./lab1/README.md)

## Lab 2

Emit garbage collection metrics [lab2](./lab2/README.md)

## Lab 3

Emit http server metrics [lab3](./lab3/README.md)

## Lab 4

Push metrics to [Prometheus push gateway](https://github.com/prometheus/pushgateway) [lab4](./lab4/README.md)

Metrics are not available via scrape endpoint `/metrics` on the Node.js web server.

This use case is useful when the container has a very short life span (ie Serverless/Knative) and the scrape time window is to large to get metrics from the container.

## Lab 5

Combined all examples [lab5](./lab5/README.md)

Putting all the examples together, collects all metrics, sends to push gateway and available via scrape endpoint on the Node.js web server

## Lab 6

Using the prom-client express middleware wrapper [express-prom-bundle](https://www.npmjs.com/package/express-prom-bundle)
