export const elements = {
    searchForm: document.querySelector('.header__top--search-coords'),
    searchInput_lat: document.querySelector('.header__top--search--input-latitude'),
    searchInput_long: document.querySelector('.header__top--search--input-longitude'),
    searchResList: document.querySelector('.header__bottom'),
    searchResPages: document.querySelector('.header__right--page'),
    searchResLeft: document.querySelector('.header__left'),
    searchResRight: document.querySelector('.header__right--blocks')
};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};