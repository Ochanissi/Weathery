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
    elements.searchResRight.innerHTML = '';
};

export const clearResList = () => {
    elements.searchResList.innerHTML ='';
    elements.searchResPages.innerHTML ='';
};

export const clearResDaily = () => {
    elements.searchResDaily.innerHTML ='';
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
        // default:
        //     data.icon = 'wi-cloud';
    };
};

export const renderBackgroundImage = result => {
    getIcons(result.currently);
    
    header.style.backgroundImage = `
        url(/img/background--${result.currently.icon}.jpg)
    `;
};

export const renderCurrently = result => {


    const markupLeft = `
        <div class="header__left--icon"><i class="wi ${result.currently.icon}"></i></div>
        <div class="header__left--summary">${result.currently.summary}</div>
        <div class="header__left--city">${result.timezone.split("/").reverse().join(" - ").replace(/[_]/gi,' ')}</div>
        <div class="header__left--temp">${Math.round(result.currently.temperature)} &deg;C</div>
    `;
    elements.searchResLeft.insertAdjacentHTML('afterbegin', markupLeft);

    const markupRight = `
        <div class="header__right--block">
            <span class="header__right--icon"><i class="wi wi-humidity"></i></span>
            <div class="header__right--content">
                    <span class="header__right--content--title">Humidity</span>
                    <span class="header__right--content--text">${Math.round(result.currently.humidity * 100)} %</span>
            </div>
        </div>
        <div class="header__right--block">
            <span class="header__right--icon"><i class="wi wi-barometer"></i></span>
            <div class="header__right--content">
                <span class="header__right--content--title">Air Pressure</span>
                <span class="header__right--content--text">${Math.round(result.currently.pressure)} PS</span>
            </div>
        </div>
        <div class="header__right--block">
            <span class="header__right--icon"><i class="wi wi-sleet"></i></span>
            <div class="header__right--content">
                <span class="header__right--content--title">Chance of Rain</span>
                <span class="header__right--content--text">${Math.round(result.currently.precipProbability * 100)} %</span>
            </div>
        </div>
        <div class="header__right--block">
            <span class="header__right--icon"><i class="wi wi-strong-wind"></i></span>
            <div class="header__right--content">
                <span class="header__right--content--title">Wind Speed</span>
                <span class="header__right--content--text header__right--content--text--speed">${result.currently.windSpeed.toFixed(2)} km/h</span>
            </div>
        </div>
    `;
    elements.searchResRight.insertAdjacentHTML('afterbegin', markupRight);
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

    elements.searchResPages.insertAdjacentHTML('beforeend', button);
};

export const renderResHourly = (hourly, page = 1, resPerPage = 5) => {
    // Render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    hourly.slice(start, end).forEach(renderHourly);

    // Render pagination buttons
    renderButtons(page, hourly.length, resPerPage);   
};

const renderDailyBackground = daily => {
    getIcons(daily);
    
    document.querySelector(`.weather-card__image-section--${daily.icon}`).style.backgroundImage = `
        url(/img/background--${daily.icon}.jpg)
    `;
    
};

const renderDaily = daily => {
    getIcons(daily);

    const date = new Date(daily.time * 1000);
    const hours = date.getHours();
    const mins = "0" + date.getMinutes();
    const secs = "0" + date.getSeconds();

    const time = date.toString().split(" ");



    const markup = `
        <article class="weather-card">
            <div class="weather-card__image-section weather-card__image-section--${daily.icon}">
                <span class="weather-card__image-section--date">${time[0]} | ${time[1] + " " + time[2]}</span>
                <div class="weather-card__image-section--icon"><i class="wi ${daily.icon}"></i></div>
                <div class="weather-card__image-section--humidity">
                    <i class="wi wi-humidity"></i>
                    <div class="weather-card__image-section--humidity--text">${Math.round(daily.humidity * 100)} %</div>
                </div>
                <div class="weather-card__image-section--wind">
                    <i class="wi wi-strong-wind"></i>
                    <div class="weather-card__image-section--wind--text">${daily.windSpeed.toFixed(2)} km/h</div>
                </div>
            </div>
            <div class="weather-card__info-section">
                <div class="weather-card__info-section--wave"></div>
                <div class="weather-card__info-section--layer-1"></div>
                <div class="weather-card__info-section--layer-2"></div>
                <div class="weather-card__info-section--layer-3"></div>
                <div class="weather-card__info-section--contents">
                    <span class="weather-card__info-section--contents--temperature">${Math.round((daily.temperatureHigh + daily.temperatureLow) / 2)} &deg;C</span>
                    <span class="weather-card__info-section--contents--summary">${daily.summary}</span>
                    <span class="weather-card__info-section--contents--rain-chance">Chance of rain: ${Math.round(daily.precipProbability * 100)} %</span>
                    <div class="weather-card__info-section--contents--min-max">
                        <span class="weather-card__info-section--contents--min">Min: ${Math.round(daily.temperatureLow)} &deg;C</span>     
                        <span class="weather-card__info-section--contents--between"> | </span>  
                        <span class="weather-card__info-section--contents--max">Max: ${Math.round(daily.temperatureHigh)} &deg;C</span>
                    </div>
                </div>
            </div>
        </div>
        </article>
    `;

    
    elements.searchResDaily.insertAdjacentHTML('beforeend', markup);


};

export const renderResDaily = daily => {

    daily.slice(0, daily.length).forEach(renderDaily);

};

export const renderResDailyBackground = daily => {

    daily.slice(0, daily.length).forEach(renderDailyBackground);

};



export const updateUnits = (result, hourly, daily, bool, page = 1, resPerPage = 5) => {
    
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    const classes = document.getElementsByClassName('header__bottom--day--temp');
    const dailyWind = document.getElementsByClassName('weather-card__image-section--wind--text');

    hourly.slice(start, end).forEach((x, i) => {
        classes[i].textContent = `${Math.round(x.temperature)} °${bool ? 'F' : 'C'}`;
    });

    daily.slice(0, daily.length).forEach((x, i) => {
        dailyWind[i].textContent = `${x.windSpeed.toFixed(2)} ${bool ? 'mi' : 'km'}/h`;
    });

    // console.log('kek ' + daily[0].windSpeed.toFixed(2)) ;


    document.querySelector('.header__left--temp').textContent = `${Math.round(result.currently.temperature)} °${bool ? 'F' : 'C'}`;


    document.querySelector('.header__right--content--text--speed').textContent = `${result.currently.windSpeed.toFixed(2)} ${bool ? 'mi' : 'km'}/h`;
}
