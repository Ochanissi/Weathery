import Search from './models/Search';
import Geocode from './models/Geocode';
import ReverseGeocode from './models/ReverseGeocode';
import * as Maps from './models/Maps';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';


// Global state of the app
const state = {};
// console.log(state);

// ---------------------------------
// SEARCH CONTROLLER
// ---------------------------------
export const controlSearch = async (lat, lng) => {
    // 1. Get the query from the view
    let query_lat;
    let query_long;

    if (searchView.getInput_lat() && searchView.getInput_long()) {
        query_lat = searchView.getInput_lat();
        query_long = searchView.getInput_long();
    } else {
        query_lat = lat;
        query_long = lng;
    }

    // query_lat = '42.3601'; // TODO 
    // query_long = '-71.0589'; // TODO 
    // console.log(query_lat, query_long);

    if (query_lat && query_long || lat && lng) {
        // 2. New search object and add to state
        state.search = new Search(query_lat, query_long);
        state.reverseGeocode = new ReverseGeocode(query_lat, query_long);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        searchView.clearResList();
        searchView.clearResDaily();
        [elements.searchResList, elements.searchResLeft, elements.searchResRight, elements.searchResDaily].forEach(event => renderLoader(event));    

        // 4. Search for recipes
        await state.search.getResults();
        await state.reverseGeocode.getResults();

        // 5. Render results on UI
        [elements.searchResList, elements.searchResLeft, elements.searchResRight, elements.searchResDaily].forEach(event => clearLoader(event));
        searchView.renderBackgroundImage(state.search.result);
        searchView.renderResHourly(state.search.hourly);
        searchView.renderCurrently(state.search.result, state.reverseGeocode.resLocation);
        searchView.renderResDaily(state.search.daily);
        searchView.renderDailyHeader(state.search.result);

        Maps.addMarker({lat: parseFloat(state.search.query_lat), lng: parseFloat(state.search.query_long)}, state.search.result, state.reverseGeocode.resLocation);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn');

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResList();
        searchView.renderResHourly(state.search.hourly, goToPage);
        searchView.updateUnits(state.search.result, state.search.hourly, state.search.daily, state.clicked, goToPage);
    }
    
});

// Handling the change button clicks
state.clicked = false;
elements.changeUnits.addEventListener('click', e => {
    const btn = e.target.closest('.btn');
    
    if (btn) {
        state.clicked ? state.clicked = false : state.clicked = true;

        state.search.changeUnits(state.clicked);
        searchView.updateUnits(state.search.result, state.search.hourly, state.search.daily, state.clicked);
    }

});


// ---------------------------------
// GEOCODE CONTROLLER
// ---------------------------------
const controlGeocode = async () => {
    // 1. Get the query from the view
    // const query_city = 'Bucharest'; // TODO 
    const query_city = searchView.getInput_location();

    if (query_city) {
        // 2. New search object and add to state
        state.geocode = new Geocode(query_city);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearInput();
        searchView.clearResults();
        searchView.clearResList();
        searchView.clearResDaily();
        [elements.searchResList, elements.searchResLeft, elements.searchResRight, elements.searchResDaily].forEach(event => renderLoader(event));    

        // 4. Search for recipes
        await state.geocode.getResults();

        // 2. New search object and add to state
        state.search = new Search(state.geocode.resCoords.lat, state.geocode.resCoords.lng);

        await state.search.getResults();

        // 5. Render results on UI
        [elements.searchResList, elements.searchResLeft, elements.searchResRight, elements.searchResDaily].forEach(event => clearLoader(event));
        searchView.renderBackgroundImage(state.search.result);
        searchView.renderResHourly(state.search.hourly);
        searchView.renderCurrently(state.search.result, state.geocode.resLocation);
        searchView.renderResDaily(state.search.daily);
        searchView.renderDailyHeader(state.search.result);

        Maps.addMarker({lat: parseFloat(state.search.query_lat), lng: parseFloat(state.search.query_long)});
    }
}

elements.geocodeForm.addEventListener('submit', e => {
    e.preventDefault();
    controlGeocode();
});
