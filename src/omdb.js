import fetch from 'node-fetch';

/**
 * Cette fonction récupère les informations d'un film selon le titre spécifié
 * @param {string} title 
 * @returns {Promise<object|undefined>}
 */
export async function getMovieByTitle(title = '') {
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
}

/**
 * Cette fonction retourne la liste des films ordonnés selon la clé spécifiée
 * @param {Array<object>} list 
 * @param {string} key 
 * @returns {Array<object>}
 */
export function getMoviesSortedBy(list = [], key = ''){
}

/**
 * Cette fonction retourne le top des films selon la clé spécifiée et le nombre demandé
 * @param {Array<object>} list 
 * @param {string} key 
 * @param {number} count 
 * @returns {Array<object>}
 */
export function getTopMoviesBy(list = [], key = '', count = 5){
}

/**
 * Cette fonction retourne un tableau de valeurs uniques d'une des prop. de la liste
 * @param {Array<object>} list 
 * @param {string} key 
 * @returns {Array<any>}
 */
export function getMovieListProp(list = [], key = ''){
}

/**
 * Cette fonction retourne le total d'une des proprietés de la liste
 * @param {Array<object>} list 
 * @param {string} key 
 * @returns {number}
 */
export function getMoviesSumOf(list = [], key = '') {
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
}