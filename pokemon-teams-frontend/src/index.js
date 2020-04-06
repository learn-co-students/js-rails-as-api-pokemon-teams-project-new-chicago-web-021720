const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main")

fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => {
        for(const trainer of trainers) {
            displayTrainer(trainer)
        }
    })


function displayTrainer(trainer) {
    const card = document.createElement("div")
    card.class = "card"
    card.dataset.id = trainer.id
    textToAdd = `<p>${trainer.name}</p><button class="add" data-trainer-id="${trainer.id}">Add Pokemon</button><ul>`
    trainer.pokemons.forEach(pokemon => {
        textToAdd += displayPokemon(pokemon)
    })
    textToAdd += "</ul>"
    card.innerHTML = textToAdd
    main.appendChild(card)
}

function displayPokemon(pokemon) {
    return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
}

main.addEventListener("click", event => {
    if(event.target.className === "add") {
        addPokemon(event.target)
    } else if (event.target.className === "release") {
        releasePokemon(event.target)
    }
})

function addPokemon(target) {
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"trainer-id": target.dataset.trainerId})
    })
        .then(resp => resp.json())
        .then(newPokemon => {
            if (newPokemon.message) {
                alert(newPokemon.message)
            } else {
                target.parentElement.children[2].innerHTML += displayPokemon(newPokemon)
            }
        })
}

function releasePokemon(target) {
    const url = POKEMONS_URL + `/${target.dataset.pokemonId}`
    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resp => resp.json())
        .then(deleted => {
            target.parentElement.parentElement.removeChild(target.parentElement)
        })
}