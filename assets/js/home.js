/**
 * @license MIT
 * @copyright 2024 
 * @author 
 */

"use strict";


/**
 * Import
 */


import { fetchData } from "./api.js";
import { $skeletonCard, cardQueries } from "./global.js";


/**
 * Home Page Search
 */
const $searchField = document.querySelector("[data-search-field]");
const $searchBtn = document.querySelector("[data-search-btn]");





$searchBtn.addEventListener("click", function() {
    if ($searchField.value) window.location = `/recipes.html?q=${$searchField.value}`
});

$searchField.addEventListener("keydown", e => {
    if ( e.key === "Enter" ) $searchBtn.click();
});



const $tabBtns = document.querySelectorAll("[data-tab-btn]");
const $tabPanels = document.querySelectorAll("[data-tab-panel]");


let /** {NodeElement} */ [$lastActiveTabPanel] = $tabPanels;
let /** {NodeElement} */ [$lastActiveTabBtn] = $tabBtns;

// TAB PANEL
addEventOnElements($tabBtns, "click", function() {
    $lastActiveTabPanel.setAttribute("hidden", "");
    $lastActiveTabBtn.setAttribute("aria-selected", "false");
    $lastActiveTabBtn.setAttribute("tabindex", "-1");

    const $currentTabPanel = document.querySelector(`#${this.getAttribute("aria-controls")}`);
    $currentTabPanel.removeAttribute("hidden");
    this.setAttribute("aria-selected", "true");
    this.setAttribute("tabindex", "0");

    $lastActiveTabPanel = $currentTabPanel;
    $lastActiveTabBtn = this;
    addTabContent(this, $currentTabPanel);
    
});


/**
 * Navigate Tab with arrow key
 */
addEventOnElements($tabBtns, "keydown", function(e) {
    const $nextElement = this.nextElementSibling;
    const $previousElement = this.previousElementSibling;

    if (e.key === "ArrowRight" && $nextElement) {
        this.setAttribute("tabindex", -1);
        $nextElement.setAttribute("tabindex", 0);
        $nextElement.focus();
    } else if (e.key === "ArrowLeft" && $previousElement) {
        this.setAttribute("tabindex", -1);
        $previousElement.setAttribute("tabindex", 0);
        $previousElement.focus();
    } else if (e.key === "Tab") {
        this.setAttribute("tabindex", -1);
        $lastActiveTabBtn.setAttribute("tabindex", 0);
    }

});



/**
 * Work with API
 * fetch data for tab content
 */
const addTabContent = ($currentTabBtn, $currentTabPanel) => {
    
    const /** {NodeElement} */ $gridList = document.createElement("div");
    $gridList.classList.add("grid-list");

    $currentTabPanel.innerHTML = `
        <div class="grid-list">
            ${$skeletonCard.repeat(12)}
        </div>
    `;

    fetchData([['mealType', $currentTabBtn.textContent.trim().toLowerCase()], ...cardQueries], function( data ) {
        $currentTabPanel.innerHTML = "";

        for (let i = 0; i < 12; i++) {
            const {
                recipe : {
                    image,
                    label: title,
                    totalTime: cookingTime,
                    uri
                }
            } = data.hits[i];

            const /** {NodeElement} */ $card = document.createElement("div");
            $card.classList.add("card");
            $card.style.animationDelay  = `${100 * i}ms`;

            $card.innerHTML = `
                <div class="grid-list">
                    <div class="card">

                        <figure class="card-media img-holder">
                            <img src="${image}"  width="195" height="195" loading="lazy" alt="${title}" class="img-cover">
                        </figure>

                        <div class="card-body">
                            <h3 class="title-small">
                                <a href="./detail.html" class="card-link">${title ?? "Untitled"}</a>
                            </h3>

                            <div class="meta-wrapper">
                                <div class="meta-item">
                                    <span class="material-symbols-outlined" aria-hidden="true">schedule</span>
                                    <span class="label-medium">${cookingTime || "<1"} minutes</span>
                                </div>
                                <button class="icon-btn has-state removed" aria-label="Add to saved recipes">
                                    <span class="material-symbols-outlined bookmark-add" aria-hidden="true">bookmark_add</span>
                                    <span class="material-symbols-outlined bookmark" aria-hidden="true">bookmark</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            `;


            $gridList.appendChild($card);
        }

        $currentTabPanel.appendChild($gridList);
        
        $currentTabPanel.innerHTML += `
            <a href="./recipes.html" class="btn btn-secondary label-large has-state">Show more</a>
        `;
    });
    
}
addTabContent($lastActiveTabBtn, $lastActiveTabPanel);


