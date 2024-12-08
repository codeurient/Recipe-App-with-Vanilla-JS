/**
 * @license MIT
 * @copyright 2024 
 * @author 
 */

"use strict";

window.ACCESS_POINT = "https://api.edamam.com/api/recipes/v2";
const /** {String} */ API_ID = "a6e5a5b3";
const /** {String} */ API_KEY = "d6a6e5a5b3a6e5a5b3a6e5a5b3a6e5a5";
const /** {String} */ TYPE = "public";


/**
 * @param {Array} queries Query array
 * @param {Function} successCallback Success callback function
*/

export const fetchData = async function(queries, successCallback) {
    const /** {String} */ query = queries?.join("&")
        .replace(/,/g, "=")
        .replace(/ /g, "%20")
        .replace(/\+/g, "%2B");

    const /** {String} */ url = `${ACCESS_POINT}?app_id=${API_ID}&app_key=${API_KEY}&type=${TYPE}${query ? `&${query}` : ""}`;

    console.log(url);
    


    const /** {Object} */ response = await fetch(url);

    if(response.ok) {
        const data = await response.json();
        successCallback(data);
    }


}