import fs from 'fs';
import util from 'util';

import * as tmdb from './src/tmdb.js';
import * as omdb from './src/omdb.js';

const toJson = (json) => JSON.stringify(json, null, 2)
const toFile = (...args) => util.promisify(fs.writeFile)(...args)
const fromFile = (...args) => util.promisify(fs.readFile)(...args)
const fromJson = (json) => JSON.parse(json)

// await toFile('./data.json', toJson(await tmdb.getMoviesList()));

// const titles = tmdb.getMovieListTitles(await tmdb.getMoviesList());
// const movies = omdb.getFilteredMovies(await Promise.all(titles.map(omdb.getMovieByTitle)));
// await toFile('./movies.omdb.json', toJson(movies));

describe('tmdb.js', () => {
    let movies;
    beforeEach(async () => {
        movies = fromJson(await fromFile('./movies.tmdb.json'));
    });
    
    describe("Le module doit exporter une function nommée", () => {
        test.each([
            'getMoviesList',
            'getMovieListTitles'
        ])("%s", fxname => {
            expect(fxname in tmdb).toBe(true);
            expect(tmdb[fxname] instanceof Function).toBe(true);
        })
    });

    test('getMoviesListTitle doit retourner tous les titres de la liste', async () => {
        const titles = tmdb.getMovieListTitles(movies);
        expect(titles).toEqual(expect.arrayContaining(['Spider-Man: No Way Home']));
    });
})

describe('omdb.js', () => {
    let list, movies;

    beforeEach(async () => {
        list = fromJson(await fromFile('./movies.tmdb.json'));
        movies = fromJson(await fromFile('./movies.omdb.json'));
    });

    describe("Le module doit exporter une function nommée :", () => {
        test.each([
            'getMovieByTitle',
            'getFilteredMovies',
            'getMoviesSortedBy',
            'getMovieListProp',
            'getTopMoviesBy',
            'getMoviesSumOf',
            'getReadyToPlayMoviesList'
        ])("%s", fxname => {
            expect(fxname in omdb).toBe(true);
            expect(omdb[fxname] instanceof Function).toBe(true);
        });
    })

    describe("'getFilteredMovies' doit retourner la liste des films n'ayant pas la prop. 'Metascore' égale à 'N/A' ou undefined", () => {
        test("getFilteredMovies(movies)", () => {
            const results = omdb.getFilteredMovies(movies);
            expect(results.map(m => m.Title)).toEqual(expect.not.arrayContaining(['X-Men: Apocalypse', 'X-Men: Days of Future Past']));
        })
    });

    describe("'getMovieByTitle' doit retourner le film", () => {
        test("Si la prop. 'Response' est égale à 'False', retourner undefined", async () => {
            const movie = await omdb.getMovieByTitle('ECN-Wiztivi-22');
            expect(movie).toBe(undefined);
        })
        test.each([
            'Spider-Man: No Way Home',
        ])("getMovieByTitle('%s')", async () => {
            const [ first ] = list;
            const movie = await omdb.getMovieByTitle(first.title);
            expect(movie).toMatchObject({
                Title: 'Spider-Man: No Way Home',
                Year: 2021,
                Rated: 'PG-13',
                Genre: ['Action', 'Adventure', 'Fantasy'],
                Director: ['Jon Watts'],
                Writer: ['Chris McKenna', 'Erik Sommers', 'Stan Lee'],
                Actors: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch'],
                Language: ['English'],
                Country: ['United States'],
                Metascore: 71,
                imdbRating: 8.5,
                imdbVotes: 555922,
                Type: 'movie',
                BoxOffice: 800588139,
            });
        })
    });

    describe('', () => {
        let movies;
        beforeEach(async () => {
            movies = omdb.getFilteredMovies(fromJson(await fromFile('./movies.omdb.json')));
        })
        describe("'getMoviesSortedBy' doit retourner les films ordonnés en fonction de la clé et du type de la valeur à traiter", () => {
            test.each([
                ['Title', 'string'],
                ['Year', 'number'],
                ['Rated', 'string'],
                ['Metascore', 'number'],
                ['imdbRating', 'number'],
            ])("getMoviesSortedBy(movies, '%s', '%s')",
            (key, type) => {
                const [ firstChar, ...restChar ] = key;
                expect(omdb.getMovieListProp(omdb.getMoviesSortedBy(movies, key, type), 'Title'))
                .toMatchSnapshot(`moviesSortedBy${firstChar.toUpperCase() + restChar.join()}`);
            });
        })
    
        describe("'getMovieListProp' doit retourner toutes les valeurs unique des films en fonction de la clé", () => {
            test.each([
                ['Genre', 'genres'],
                ['Director', 'directors'],
                ['Writer', 'writer'],
                ['Actors', 'actors'],
                ['Language', 'language'],
                ['Country', 'country'],
                ['Type', 'types'],
            ])("getMovieListProp(movies, '%s')", (key, name) => {
                expect(omdb.getMovieListProp(movies, key)).toMatchSnapshot(name);
            });
        })
    
        describe("'getTopMoviesBy' doit retourner le top des films du plus grand au plus petit en fonction de la clé et du type de la valeur à traiter", () => {
            test.each([
                ['Metascore'],
                ['imdbRating'],
            ])("getTopMoviesBy(movies, '%s')", (key) => {
                expect(omdb.getMovieListProp(omdb.getTopMoviesBy(movies, key, 5), 'Title')).toMatchSnapshot();
            })
        })
    
        describe("'getMoviesSumOf' doit retourner la valeur totale d'une propriété des films en fonction de la clé et du type de valeur à traiter", () => {
            test.each([
                ['imdbRating', 'string'],
                ['BoxOffice', 'string'],
            ])("getMoviesSumOf(movies, '%s', '%s')", (key, type) => {
                expect(omdb.getMoviesSumOf(movies, key, type)).toMatchSnapshot(key + 'Sum');
            })
        })
    })
})