import express from 'express';

const app = express();

app.get('/movies', async (request, response) => {
    // Je souhaite récupérer tous les films
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

app.listen(8080);