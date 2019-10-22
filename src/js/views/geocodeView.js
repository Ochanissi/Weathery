import { elements } from './base';

export const getInput_location = () => elements.searchInput_location.value;

export const renderLocation = (location) => {
    const loc = location.split(" ");
    const locX = loc[0] + " - " + loc[loc.length - 1];

    console.log(locX.replace(/[\W_]+/g,' - '));

    const markup = `
        <div class="header__left--kek">Location ${locX.replace(/[\W_]+/g,' - ')}</div>
    `;
    elements.searchResLeft.insertAdjacentHTML('beforeend', markup);
}

export const renderCoords = (coords) => {
    const markup = `
        <div class="header__left--kek">Lat: ${coords.lat} | Lng: ${coords.lng}</div>
    `;
    elements.searchResLeft.insertAdjacentHTML('beforeend', markup);
}