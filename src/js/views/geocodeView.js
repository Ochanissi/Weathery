import { elements } from './base';

export const renderLocation = (city, country) => {
    const markup = `
        <div class="header__left--kek">City: ${city} | Country: ${country}</div>
    `;
    elements.searchResLeft.insertAdjacentHTML('beforeend', markup);
}

export const renderCoords = (coords) => {
    const markup = `
        <div class="header__left--kek">Lat: ${coords.lat} | Lng: ${coords.lng}</div>
    `;
    elements.searchResLeft.insertAdjacentHTML('beforeend', markup);
}