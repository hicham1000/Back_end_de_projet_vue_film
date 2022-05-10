import fetch from 'node-fetch';

/**
 * Cette fonction retourne une liste de film de l'api themoviedb.org
 * @param {string|number} list 
 * @returns {Array<object>}
 */
export async function getMoviesList(list = '1') {
    const response = await fetch(`https://api.themoviedb.org/3/list/${list}?api_key=7248330eaedc659a3fb3ab4ff9069bc2&language=en-US`);
    const json = await response.json();
    const { items } = json;

    if(Array.isArray(items)){
        return items;
    }

    throw new Error('INVALID_MOVIE_LIST');
}

/**
 * Cette fonction retourne les noms des films d'une liste provenant de themoviedb.org
 * @param {Array<object>} list 
 * @returns {Array<string>}
 */
export function getMovieListTitles(list = []) {
    return list.map(m => m.title);
}