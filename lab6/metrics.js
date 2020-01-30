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