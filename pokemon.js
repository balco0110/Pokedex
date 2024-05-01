const MAX_POKEMON = 200;
const listWrapper = document.querySelector('.list-wrapper');
const searchInput = document.querySelector('.search-input');
const numberFilter = document.querySelector('#number');
const nameFilter = document.querySelector('#name');
const notFoundMessage = document.querySelector('#not-found-message');
const closeBtn = document.querySelector('.search-close-icon');

let allPokemons = [];

const fetchPokemons = async function () {
    try {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`
        );
        const data = await response.json();
        allPokemons = data.results;
        renderPokemon(allPokemons);
    } catch (error) {
        console.error('Failed to fetch Pokemons');
    }
};

// fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}}`)
//     .then((response) => response.json())
//     .then((data) => {
//         allPokemons = data.results;
//         renderPokemon(allPokemons);
//});

const fetchPokemonDataBeforeRedirect = async function (id) {
    try {
        const [pokemon, pokemonSpecies] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
                res.json()
            ),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(
                (res) => res.json()
            ),
        ]);
        return true;
    } catch (error) {
        console.error('Failed to fetch Pokemon data before redirect');
    }
};

const renderPokemon = function (pokemon) {
    listWrapper.innerHTML = '';

    pokemon.forEach((pokemon) => {
        const pokemonId = pokemon.url.split('/')[6];
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        listItem.innerHTML = `
        <div class="number-wrap">
            <p class="caption-fonts">#${pokemonId}</p>
        </div>
        <div class="img-wrap">
            <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg" alt="${pokemon.name}" />
        </div>
        <div class="name-wrap">
            <p class="body3-fonts">#${pokemon.name}</p>
        </div>
    `;

        listItem.addEventListener('click', async () => {
            const success = await fetchPokemonDataBeforeRedirect(pokemonId);
            if (success) {
                window.location.href = `./detail.html?id=${pokemonId}`;
            }
        });

        listWrapper.appendChild(listItem);
    });
};

searchInput.addEventListener('keyup', () => {
    const searchValue = searchInput.value.toLowerCase();
    let filteredPokemons;

    if (numberFilter.checked) {
        filteredPokemons = allPokemons.filter((pokemon) => {
            const pokemonId = pokemon.url.split('/')[6];
            return pokemonId.startsWith(searchValue);
        });
    } else if (nameFilter.checked) {
        filteredPokemons = allPokemons.filter((pokemon) => {
            return pokemon.name.startsWith(searchValue);
        });
    } else {
        filteredPokemons = allPokemons.filter((pokemon) => {
            return pokemon.name.startsWith(searchValue);
        });
    }

    renderPokemon(filteredPokemons);
    if (filteredPokemons.length === 0) {
        notFoundMessage.style.display = 'block';
    }
});

closeBtn.addEventListener('click', () => {
    searchInput.value = '';
    renderPokemon(allPokemons);
    notFoundMessage.style.display = 'none';
});

fetchPokemons();
