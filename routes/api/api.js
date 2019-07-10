const express = require('express');
const router = express.Router();

function routerInit(db) {
    const incidentesApi = require('./incidentes')(db);
    router.get('/', (req, res, next) => {
        res.status(200).json({ "ok": "Version 1" })
    });
    router.use('/incidentes', incidentesApi);
    return router;
}
module.exports = routerInit;