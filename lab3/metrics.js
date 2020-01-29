const Prometheus = require('prom-client');
const gcStats = require('prometheus-gc-stats');

const promRegister = Prometheus.register;
const startGcStats = gcStats(promRegister);

startGcStats();

module.exports = (app) => {
    app.get('/metrics', (req, res, next) => {
        res.set('Content-Type', promRegister.contentType);
        res.end(promRegister.metrics());
    });
}