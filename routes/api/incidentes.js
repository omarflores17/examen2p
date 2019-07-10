const express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;


function incidentesInit(db) {

    var incidentesColl = db.collection('incidentes');


    var thingsStruct = {

        descripcion: "",
        fechaYhora: "",
        tipo: "",
        estado: "",
        usuarioRegistra: "",
        usuarioAsignado: "",
        fechaHoraAsignado: "",
        fechaHoraCerrado: ""

    }

    router.get('/', (req, res, next) => {
        incidentesColl.find().toArray((err, things) => {
            if (err) {
                return res.status(200).json([]);
            }
            else {
                return res.status(200).json(things);
            }
        });
    });

    router.get('/:id', (req, res, next) => {
        var query = { "_id": new ObjectID(req.params.id) }
        incidentesColl.findOne(query, (err, doc) => {
            if (err) {
                console.log(err);
                return res.status(404).json('error');
            }
            return res.status(200).json(doc);
        });
    });

    router.post('/', (req, res, next) => {
        var newElement = Object.assign(thingsStruct, req.body, {
            descripcion: "",
            fechaYhora: "",
            tipo: "",
            estado: "",
            usuarioRegistra: "",
            usuarioAsignado: "",
            fechaHoraAsignado: "",
            fechaHoraCerrado: ""
        });
        incidentesColl.insertOne(newElement, {}, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(404).json('error');
            }
            return res.status(200).json({ "n": result.insertedCount, "obj": result.ops[0] });
        });
    });


    return router;
}
module.exports = incidentesInit;