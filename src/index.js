import express from 'express';
import * as Api from './api.js';

const startTime = Date.now();
const app = express();

app.get('/', (_req, res) => {
    const elaspedTime = Date.now() - startTime;
    return res.json({
        alive: true,
        startTime,
        elaspedTime,
    });
});

app.get('/movies', async (_request, response) => {
    // Je souhaite récupérer tous les films
    return response.json(Api.movies);
});

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