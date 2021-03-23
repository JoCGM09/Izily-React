const functions = require("firebase-functions");
const admin = require ('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

app.get('/publicaciones', (req, res) => {
    admin
        .firestore()
        .collection('publicaciones')
        .orderBy('createAt', 'desc')
        .get()
        .then((data) => {
            let publicaciones = [];
            data.forEach(doc => {
                publicaciones.push({
                    publicacionId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createAt: doc.data().createAt
                });
            });
            return res.json(publicaciones);
        })
        .catch((err) => console.error(err));
});

app.post('/publicacion', (req, res) => {
    const newPublicacion = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createAt: new Date().toISOString()
    };

    admin.firestore()
        .collection('publicaciones')
        .add(newPublicacion)
        .then(() => {
            res.json({ message:'document ${doc.id} created successfully.'});
        })
        .catch(err => {
            res.status(500).json({ error: "something went wrong"});
            console.error(err);
        });
});

// https://baseurl.com/api/

exports.api = functions.region('europe-west1').https.onRequest(app);