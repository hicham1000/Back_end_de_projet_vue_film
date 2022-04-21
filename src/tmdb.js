import fetch from 'node-fetch';

/**
 * Cette fonction retourne une liste de film de l'api themoviedb.org
 * @param {string|number} list 
 * @returns {Array<object>}
 */
export async function getMoviesList(list = '1') {
}

/**
 * Cette fonction retourne le nom des films d'une liste provenant de themoviedb.org
 * @param {Array<object>} list 
 * @returns {Array<string>}
 */
export function getMovieListTitles(list = []) {
}