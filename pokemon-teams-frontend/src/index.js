const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// Find the <main> tag to which we're going to be adding Trainer cards
const mainTag = document.querySelector('main');

const getTrainers = () => fetch(TRAINERS_URL).then(resp => resp.json());

const createPokemonLi = (pokemon) => {
    const li = document.createElement('li');
    li.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`;
    return li
}

const loadTrainerCards = async () => {

    // Hit the API to return the trainer data (wait for the promise to resolve)
    const trainers = await getTrainers()

    // Iterate over trainers, making a card for each one and appending it to the <main> tag
    trainers.forEach( trainer => {

        // Card element <div>
        const div = document.createElement('div');
        div.className = 'card';
        div.dataset.id = trainer.id;
        div.innerHTML += `<p>${trainer.name}</p><button data-trainer-id="${trainer.id}">Add Pokemon</button>`;
        
        // <ul> to contain list of pokemon for the trainer
        const ul = document.createElement('ul');
        div.appendChild(ul);

        // For each pokemon, make a <li> and append it to the <ul>
        trainer.pokemons.forEach( pokemon => {
            const li = createPokemonLi(pokemon);
            ul.appendChild(li);
        });

        // Append the whold constructed card <div> to the <main> tag
        mainTag.appendChild(div);  
    });
}

const addRandomPokemon = trainer_id => {

    reqObj = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            trainer_id: trainer_id
        })
    }

    return fetch(POKEMONS_URL, reqObj).then(resp => resp.json())
}

const destroyPokemon = (pokemon_id) => {

    reqObj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Make the DELETE request
    fetch(`${POKEMONS_URL}/${pokemon_id}`, reqObj);      
}

const handleMainClick = async (event) => {
    
    // Grab the node that was clicked on
    const target = event.target;

    // We're only looking for button clicks here. There are 2 kinds of buttons: "Add Pokemon" and "Release" pokemon.
    if (target.matches('button')) {
    
        // Add Pokemon button
        if (target.dataset.trainerId) {
            // Count the <li> in the <ul>, which is the current number of pokemon. Only add a new pokemon if trainer has room for it.
            if (target.nextElementSibling.querySelectorAll('li').length >= 6) {
                alert('A trainer can only have 6 pokemon!');
            } else {
                // Make the POST request to add a random pokemon to the trainer, and wait for the response.
                const newPokemon = await addRandomPokemon(target.dataset.trainerId);
                // Update the DOM by adding the new pokemon as another <li>
                const li = createPokemonLi(newPokemon);
                target.nextElementSibling.appendChild(li);
            }
        } 
        
        // Release pokemon button
        else if (target.dataset.pokemonId) {
            // DELETE the pokemon
            destroyPokemon(target.dataset.pokemonId)
            // Update the DOM by removing the pokemon's <li> node
            target.parentNode.remove();
        }
    
    }
}

// Populate the page with trainer card <div> elements
loadTrainerCards();

// Listen for clicks on the <main> tag (right now only act on button clicks)
mainTag.addEventListener('click', handleMainClick)
