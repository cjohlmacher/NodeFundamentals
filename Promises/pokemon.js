const getPokemon = (num) => {
    const pokemonNames = [];
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=2000`).then(resp => {
        const allPokemon = resp.data.results;
        const pokemonCount = allPokemon.length;
        const pokemonPromises = [];
        for (let i=0; i<num; i++) {
            const randomNumber = Math.round(Math.random()*pokemonCount);
            const pokemonUrl = allPokemon[randomNumber].url;
            pokemonPromises.push(axios.get(pokemonUrl));
        }
        return Promise.all(pokemonPromises)
    }).then(responses => {
        const speciesPromises = [];
        for (response of responses) {
            pokemonNames.push(response.data.name);
            speciesPromises.push(axios.get(response.data.species.url));
        };
        return Promise.all(speciesPromises)
    }).then(responses => {
        for (let i=0; i<responses.length; i++) {
            const flavorTexts = responses[i].data.flavor_text_entries;
            const englishText =flavorTexts.find((text) => {
                return text.language.name == 'en';
            });
            if ( englishText ) {
                console.log(pokemonNames[i], englishText.flavor_text)
                $('body').append($(`<p>${pokemonNames[i]}: ${englishText.flavor_text}</p>`));
            } else {
                console.log(pokemonNames[i],'No english flavor text');
                $('body').append($(`<p>${pokemonNames[i]}</p>`));
            }
        };
    });
};


const pokemonData = $('<div class="pokemon"></div>');
$('body').append(pokemonData);
getPokemon(3);