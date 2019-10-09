import { elements } from './base';

export const getInput_lat = () => elements.searchInput_lat.value;
export const getInput_long = () => elements.searchInput_long.value;

export const clearInput = () => {
    elements.searchInput_lat.value = '';
    elements.searchInput_long.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML ='';
    elements.searchResPages.innerHTML ='';
};

const renderHourly = hourly => {
    const date = new Date(hourly.time * 1000);
    const hours = date.getHours();
    const mins = "0" + date.getMinutes();
    const secs = "0" + date.getSeconds();

    switch (hourly.icon) {
        case 'clear-day':
            hourly.icon = 'wi-day-sunny';
            break;
        case 'clear-night':
            hourly.icon = 'wi-night-clear';
            break;
        case 'rain':
            hourly.icon = 'wi-rain';
            break;
        case 'snow':
            hourly.icon = 'wi-snow';
            break;
        case 'sleet':
            hourly.icon = 'wi-sleet';
            break;
        case 'wind':
            hourly.icon = 'wi-cloudy-windy';
            break;
        case 'fog':
            hourly.icon = 'wi-fog';
            break;
        case 'cloudy':
            hourly.icon = 'wi-cloudy';
            break;
        case 'partly-cloudy-day':
            hourly.icon = 'wi-day-cloudy';
            break;
        case 'partly-cloudy-night':
            hourly.icon = 'wi-night-alt-cloudy';
            break;
        case 'hail':
            hourly.icon = 'wi-hail';
            break;
        case 'thunderstorm':
            hourly.icon = 'wi-thunderstorm';
            break;
        case 'tornado':
            hourly.icon = 'wi-tornado';
            break;
        default:
            hourly.icon = 'wi-cloud';
    }


    const markup = `
        <li class="header__bottom--day">
            <div class="header__bottom--day--time">${hours}:${mins.substr(-2)}</div>
            <div class="header__bottom--day--icon"><i class="wi ${hourly.icon}"></i></div>
            <div class="header__bottom--day--summary">${hourly.summary}</div>
            <div class="header__bottom--day--temp">${Math.round(hourly.temperature)} &deg;C</div>
            <div class="header__bottom--day--rain">Chance of Rain: ${Math.round(hourly.precipProbability * 100)} %</div>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// type: 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);       
        let button = createButton(page, 'next');

    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'next')}
            ${createButton(page, 'prev')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to previous page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (hourly, page = 1, resPerPage = 5) => {
    // Render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    hourly.slice(start, end).forEach(renderHourly);

    // Render pagination buttons
    renderButtons(page, hourly.length, resPerPage);
};