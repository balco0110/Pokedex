const inputElement = document.querySelector('#search-input');
const searchIcon = document.querySelector('#search-close-icon');
const sortWrapper = document.querySelector('.sort-wrapper');

const handleInputChange = function (inputElement) {
    const inputValue = inputElement.value;

    if (inputValue.length !== '') {
        document
            .querySelector('.search-close-icon')
            .classList.add('search-close-icon-visible');
    } else {
        document
            .querySelector('.search-close-icon')
            .classList.remove('search-close-icon-visible');
    }
};

const handleSearchCloseOnClick = function () {
    document.querySelector('#search-input').value = '';
    document
        .querySelector('.search-close-icon')
        .classList.remove('search-close-icon-visible');
};

const handleSortIconOnClick = function () {
    document
        .querySelector('.filter-wrapper')
        .classList.toggle('filter-wrapper-open');
    document.querySelector('.body').classList.toggle('filter-wrapper-overlay');
};

inputElement.addEventListener('input', () => {
    handleInputChange(inputElement);
});

searchIcon.addEventListener('click', handleSearchCloseOnClick);

sortWrapper.addEventListener('click', handleSortIconOnClick);
