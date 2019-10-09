export const elements = {
    searchForm: document.querySelector('.header__top--search-coords'),
    searchInput_lat: document.querySelector('.header__top--search--input-latitude'),
    searchInput_long: document.querySelector('.header__top--search--input-longitude'),
    searchRes: document.querySelector('.header__bottom'),
    searchResList: document.querySelector('.header__bottom'),
    searchResPages: document.querySelector('.header__right--page')
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