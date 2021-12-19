async function getPokemon(num) {
    const pokemonNames = [];
    const resp = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=2000`);
    const allPokemon = resp.data.results;
    const pokemonCount = allPokemon.length;
    const pokemonPromises = [];
    for (let i=0; i<num; i++) {
        const randomNumber = Math.round(Math.random()*pokemonCount);
        const pokemonUrl = allPokemon[randomNumber].url;
        pokemonPromises.push(axios.get(pokemonUrl));
    }
    const pokemonResponses = await Promise.all(pokemonPromises);
    const speciesPromises = [];
    for (let response of pokemonResponses) {
        pokemonNames.push(response.data.name);
        speciesPromises.push(axios.get(response.data.species.url));
    };
    const speciesResponses = await Promise.all(speciesPromises);
    for (let i=0; i<speciesResponses.length; i++) {
        const flavorTexts = speciesResponses[i].data.flavor_text_entries;
        const englishText =flavorTexts.find((text) => {
            return text.language.name == 'en';
        });
        if ( englishText ) {
            $('body').append($(`<p>${pokemonNames[i]}: ${englishText.flavor_text}</p>`));
        } else {
            $('body').append($(`<p>${pokemonNames[i]}</p>`));
        };
    };
};

const pokemonData = $('<div class="pokemon"></div>');
$('body').append(pokemonData);
getPokemon(3);