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
    elements.searchResLeft.innerHTML = '';
};

const getIcons = (data) => {
    switch (data.icon) {
        case 'clear-day':
            data.icon = 'wi-day-sunny';
            break;
        case 'clear-night':
            data.icon = 'wi-night-clear';
            break;
        case 'rain':
            data.icon = 'wi-rain';
            break;
        case 'snow':
            data.icon = 'wi-snow';
            break;
        case 'sleet':
            data.icon = 'wi-sleet';
            break;
        case 'wind':
            data.icon = 'wi-cloudy-windy';
            break;
        case 'fog':
            data.icon = 'wi-fog';
            break;
        case 'cloudy':
            data.icon = 'wi-cloudy';
            break;
        case 'partly-cloudy-day':
            data.icon = 'wi-day-cloudy';
            break;
        case 'partly-cloudy-night':
            data.icon = 'wi-night-alt-cloudy';
            break;
        case 'hail':
            data.icon = 'wi-hail';
            break;
        case 'thunderstorm':
            data.icon = 'wi-thunderstorm';
            break;
        case 'tornado':
            data.icon = 'wi-tornado';
            break;
        default:
            data.icon = 'wi-cloud';
    };
};


const renderCurrently = currently => {
    getIcons(currently);

    const markup = `
        <div class="header__left--icon"><i class="wi ${currently.icon}"></i></div>
        <div class="header__left--summary">${currently.summary}</div>
        <div class="header__left--city">City Name</div>
        <div class="header__left--temp">${Math.round(currently.temperature)} &deg;C</div>
        <div class="header__left--change">
            <button class="btn">
                <span>Change Units</span>
            </button>
        </div>
    `;
    elements.searchResLeft.insertAdjacentHTML('afterbegin', markup);
};

const renderHourly = hourly => {
    getIcons(hourly);

    const date = new Date(hourly.time * 1000);
    const hours = date.getHours();
    const mins = "0" + date.getMinutes();
    const secs = "0" + date.getSeconds();

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

export const renderResults = (hourly, currently, page = 1, resPerPage = 5) => {
    // Render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    hourly.slice(start, end).forEach(renderHourly);

    // Render pagination buttons
    renderButtons(page, hourly.length, resPerPage);

    // Render currently results
    renderCurrently(currently);
};


