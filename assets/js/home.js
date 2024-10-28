/**
 * @license MIT
 * @copyright 2024 
 * @author 
 */

"use strict";

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


let [$lastActiveTabPanel] = $tabPanels;
let [$lastActiveTabBtn] = $tabBtns;

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
});