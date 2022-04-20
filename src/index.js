import express from 'express'
import fetch from 'node-fetch'

const app = express();

app.get('/metas', () => {

});

app.get('/movies', async (request, response) => {
    // Je souhaite récupérer tous les films
    const { items } = await fetch('https://api.themoviedb.org/3/list/1?api_key=7248330eaedc659a3fb3ab4ff9069bc2&language=en-US')
    .then(response => response.json());
    return response.json(items);
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

// app.listen(8080);