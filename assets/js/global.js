/**
 * @license MIT
 * @copyright 2024
 * @author 
 */

"use strict";

/**
 * Add event on multiple elements
 * @param {NodeList} $elements NodeList 
 * @param {String} eventtyoe Event type string 
 * @param {Function} callback Callback function 
 */

// addEventOnElements JS dilinin bir parçası deyil və özümüz uydurmuşuq.    window.addEventOnElements yazılışı funksiyanı qlobal kontekstdə təyin etmək üçündür. Bu halda funksiyanı window obyektinə əlavə etməklə bütün səhifədə hər yerdən asanlıqla çağırıla bilər. 
window.addEventOnElements = function($elements, eventType, callback) { 
    for (const $element of $elements) {
        $element.addEventListener(eventType, callback);
    }
}


export const /** {Array} */ cardQueries = [
    ["fields", "uri"],
    ["fields", "label"],
    ["fields", "image"],
    ["fields", "totalTime"],
];

export const /** {String} */ $skeletonCard = `
    <div class="card skeleton-card">
        <div class="skeleton card-banner"></div>

        <div class="card-body">
            <div class="skeleton card-title"></div>

            <div class="skeleton card-text"></div>
        </div>
    </div>
`;
