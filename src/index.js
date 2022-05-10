import express from 'express';
import * as Api from './api.js';

const startTime = Date.now();
const app = express();

const TOKEN = "Xu5dFkttF9yc49tCM2WYNJ2VYrUceBaL6mSWR9GTmtAfdGtqJS22KPzmKeHdcrdW"

app.use(function (_req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': 'http://localhost:8081',
        'Access-Control-Allow-Methods': 'OPTIONS, HEAD, GET, POST',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': 'Authorization'
    });
    next();
});

app.get('/', (_req, res) => {
    const elaspedTime = Date.now() - startTime;
    return res.json({
        alive: true,
        startTime,
        elaspedTime,
    });
});

app.get('/movies', function (req, res, next) {
    if (req.headers.authorization === TOKEN) {
        next();
    } else {
        return res.status(401).end();
    }
}, async (_request, response) => {
    //je souhaite récuperer tous les films 
    return response.json(Api.movies)
});


// app.get('/movies', async (_request, response) => {
//     // Je souhaite récupérer tous les films
//     return response.json(Api.movies);
// });

app.get('/movies/:title', async (request, response) => {
    const { title } = request.params;
    // Je souhaite récupérer une ressource
});

// app.post('/movies', (request, response) => {
// Je souhaite créer une responsesource de type movie
// });

// app.put('/movies/:titre', (request, response) => {
// Je souhaite remplacer les informations de ce film
// });

// app.delete('/movies/:title', (request, response) => {
// Je souhaite supprimer un film par son titre
// });

app.listen(8080, '0.0.0.0', () => console.log('Server is running...'));