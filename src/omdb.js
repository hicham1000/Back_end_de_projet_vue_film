import fetch from 'node-fetch';

/**
 * Cette fonction récupère les informations d'un film selon le titre spécifié
 * @param {string} title 
 * @returns {Promise<object|undefined>}
 */
export async function getMovieByTitle(title = '') {
    if(typeof title === 'string' && title !== ''){
        const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=14183770`);
        const m = await response.json();
        if(m.Response === 'True'){
            const Year = Number.parseInt(m.Year);
            const Runtime = Number.parseInt(m.Runtime) * 60 * 1000;
            const Genre = String(m.Genre).split(', ');
            const Director = String(m.Director).split(', ');
            const Writer = String(m.Writer).split(', ');
            const Actors = String(m.Actors).split(', ');
            const Language = String(m.Language).split(', ');
            const Country = String(m.Country).split(', ');
            const Metascore = Number.parseInt(m.Metascore);
            const imdbRating = Number.parseFloat(m.imdbRating);
            const imdbVotes = Number.parseInt(String(m.imdbVotes).replace(/\,/g, ''));
            const BoxOffice = Number.parseInt(String(m.BoxOffice).replace(/\,|\$/g, ''));
            
            return {
                ...m,
                Year,
                Runtime,
                Year,
                Runtime,
                Genre,
                Director,
                Writer,
                Actors,
                Language,
                Country,
                Metascore,
                imdbRating,
                imdbVotes,
                BoxOffice,
            }
        }
    }
}

/**
 * Cette fonction filtre :
 * - Les valeurs "undefined"
 * - Si la prop. "Metascore" est "undefined"
 * - Si la prop. "Metascore" est égale à "N/A"
 * @param {Array<object>} list 
 * @returns {Array<object>}
 */
export function getFilteredMovies(list = []) {
    return list.filter(m => m && m.Metascore !== undefined && !isNaN(m.Metascore))
}

/**
 * Cette fonction retourne la liste des films ordonnés selon la clé spécifiée
 * @param {Array<object>} list 
 * @param {string} key 
 * @returns {Array<object>}
 */
export function getMoviesSortedBy(list = [], key = ''){
    return list.sort((next, current) => {
        switch(typeof next[key]){
            case 'string':
                return next[key].localeCompare(current[key]);
            case 'number':
                const value = next[key] - current[key];
                return isNaN(value) ? -1 : value;
            default:
                return 0;
        }
    });
}

/**
 * Cette fonction retourne le top des films selon la clé spécifiée et le nombre demandé
 * @param {Array<object>} list 
 * @param {string} key 
 * @param {number} count 
 * @returns {Array<object>}
 */
export function getTopMoviesBy(list = [], key = '', count = 5){
    return getMoviesSortedBy(list, key).slice(-count).reverse();
}

/**
 * Cette fonction retourne un tableau de valeurs uniques d'une des prop. de la liste
 * @param {Array<object>} list 
 * @param {string} key 
 * @returns {Array<any>}
 */
export function getMovieListProp(list = [], key = ''){
    return Array.from(new Set(list.flatMap(m => m[key]).filter(Boolean)));
}

/**
 * Cette fonction retourne le total d'une des proprietés de la liste
 * @param {Array<object>} list 
 * @param {string} key 
 * @returns {number}
 */
export function getMoviesSumOf(list = [], key = '') {
    return list.reduce((acc, m) => {
        const n = m[key];
        return acc += isNaN(n) ? 0 : n;
    }, 0);
}

/**
 * Cette fonction retourne un tableau de tableau dont :
 * - le premier élément est le timestamp de passage du film et
 * - dont le deuxième élément est l'objet film
 * ex:
 * [
 *  [ 1234567890, { Title: '' } ],
 *  [ 1234567890, { Title: '' } ],
 *  [ 1234567890, { Title: '' } ],
 * ]
 * @param {Array<object>} list 
 * @param {number} from 
 * @returns {Array<object>}
 */
export function getReadyToPlayMoviesList(list = [], from = Date.now()){
    const [, movies ] = list.reduce((acc, movie) => {
        const [ startAt, movies ] = acc;

        const nextMoviesList = movies.concat([[ startAt, movie ]]);
        const nextStartAt = startAt + movie.Runtime;
        return [ nextStartAt, nextMoviesList ];
    }, [ from, [] ]);

    return movies;
}