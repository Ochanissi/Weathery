import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

// Global state of the app
// - Search object
// - Current recipe object
// - Liked recipes
const state = {};
console.log(state);

// ---------------------------------
// SEARCH CONTROLLER
// ---------------------------------
const controlSearch = async () => {
    // 1. Get the query from the view
    const query_lat = '42.3601'; // TODO 
    const query_long = '-71.0589'; // TODO 
    // const query_lat = searchView.getInput_lat();
    // const query_long = searchView.getInput_long();

    if (query_lat && query_long) {
        // 2. New search object and add to state
        state.search = new Search(query_lat, query_long);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        searchView.clearResList();
        searchView.clearResDaily();
        [elements.searchResList, elements.searchResLeft, elements.searchResRight, elements.searchResDaily].forEach(event => renderLoader(event));
        // renderLoader(elements.searchResList);
        // renderLoader(elements.searchResLeft);       
        // renderLoader(elements.searchResRight);       

        // 4. Search for recipes
        await state.search.getResults();

        // 5. Render results on UI
        // console.log(state.search.result);
        [elements.searchResList, elements.searchResLeft, elements.searchResRight, elements.searchResDaily].forEach(event => clearLoader(event));
        // clearLoader(elements.searchResList);
        // clearLoader(elements.searchResLeft);
        // clearLoader(elements.searchResRight);
        searchView.renderBackgroundImage(state.search.result);
        searchView.renderResHourly(state.search.hourly);
        searchView.renderCurrently(state.search.result);
        searchView.renderResDaily(state.search.daily);
        searchView.renderResDailyBackground(state.search.daily);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn');
    // console.log(btn);

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResList();
        searchView.renderResHourly(state.search.hourly, goToPage);
        searchView.updateUnits(state.search.result, state.search.hourly, state.search.daily, state.clicked);


        // console.log(goToPage);
    }
    
});

// Handling recipe button clicks
state.clicked = false;
elements.changeUnits.addEventListener('click', e => {
    const btn = e.target.closest('.btn');
    // console.log(btn);
    
    if (btn) {
        state.clicked ? state.clicked = false : state.clicked = true;
        // console.log(state.clicked);

        state.search.changeUnits(state.clicked);
        searchView.renderResDailyBackground(state.search.daily);
        searchView.updateUnits(state.search.result, state.search.hourly, state.search.daily, state.clicked);
        // searchView.clearResults();
        // searchView.renderCurrently(state.search.result);
        // searchView.renderResHourly(state.search.hourly);
    }

});