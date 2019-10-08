import { elements } from './base';

export const getInput = () => {
    elements.searchInput_lat.value;
    elements.searchInput_long.value;
};

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML ='';
};

const renderRecipe = recipe => {
    const markup = `
    <div class="header__bottom--day">
        <div class="header__bottom--day--time">3PM</div>
        <div class="header__bottom--day--icon"><i class="wi wi-cloudy-windy"></i></div>
        <div class="header__bottom--day--summary">Mostly Cloudy</div>
        <div class="header__bottom--day--temp">28 &deg;C</div>
        <div class="header__bottom--day--rain">Chance of Rain: 0 %</div>
    </div>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};