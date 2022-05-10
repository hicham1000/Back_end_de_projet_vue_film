import {
    getMoviesList,
    getMovieListTitles
} from './tmdb.js';

import {
    getMovieByTitle,
    getFilteredMovies,
    getMoviesSortedBy,
    getMovieListProp,
    getTopMoviesBy,
    getMoviesSumOf,
    getReadyToPlayMoviesList
} from './omdb.js';

export const titles = getMovieListTitles(await getMoviesList());
export const movies = getFilteredMovies(await Promise.all(titles.map(getMovieByTitle)));

export const moviesSortedByTitle = getMoviesSortedBy(movies, 'Title');
export const moviesSortedByYear = getMoviesSortedBy(movies, 'Year');
export const moviesSortedByRating = getMoviesSortedBy(movies, 'Rated');
export const moviesSortedByMetascore = getMoviesSortedBy(movies, 'Metascore');
export const moviesSortedByImdbRating = getMoviesSortedBy(movies, 'imdbRating');

export const genres = getMovieListProp(movies, 'Genre');
export const directors = getMovieListProp(movies, 'Director');
export const writer = getMovieListProp(movies, 'Writer');
export const actors = getMovieListProp(movies, 'Actors');
export const language = getMovieListProp(movies, 'Language');
export const country = getMovieListProp(movies, 'Country');
export const types = getMovieListProp(movies, 'Type');

export const topByMetascore = getTopMoviesBy(movies, 'Metascore', 5);
export const topByImdbRating = getTopMoviesBy(movies, 'imdbRating', 5);

export const imdbVotesSum = getMoviesSumOf(movies, 'imdbRating');
export const boxOfficeSum = getMoviesSumOf(movies, 'BoxOffice');

export const readyToPlay = getReadyToPlayMoviesList(movies);