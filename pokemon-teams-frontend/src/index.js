const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.getElementsByTagName('main')[0]

// big wet ass function
const bigWetAss = (input = 'big wet ass') => {
    console.log(input)
}
bigWetAss()

//for adding individual card to main
const renderTrainer = (trainer) => {
    let card = `<div class="card" data-id=${trainer.id}><p>${trainer.name}</p><button data-trainer-id=${trainer.id}>Add Pokemon</button><ul id=${trainer.id}></ul></div>`
    main.innerHTML += card 
    
}
//adds a pokemon to the ul of its trainer
const renderPokemon = (poke) => {
    let li = `<li>${poke.nickname} (${poke.species}) <button class="release" data-pokemon-id=${poke.id}>Release</button></li>`
    let ul = document.getElementById(poke.trainer_id)
    ul.innerHTML += li
}

//display trainer cards in main node
const displayTrainers = () => {
    fetch(TRAINERS_URL).then(r => r.json())
    .then(trainers => trainers.forEach(trainer => {
    renderTrainer(trainer)
    trainer.pokemon.forEach(poke => renderPokemon(poke))
    }))
}

//add click listener to main
const addReleaseButtonListener = () => {
    main.addEventListener('click', handleClickListener)
}

//handle what's clicked in main
const handleClickListener = () => {
    if (event.target.dataset.trainerId){
        handleAddButton(event)
    } else if (event.target.dataset.pokemonId){
        handleReleaseButton(event)
    }
}

//add a pokemon when add button clicked
const handleAddButton = (event) => {
    const getTrainerId = event.target.dataset.trainerId
    const ul = event.target.nextElementSibling
    if (ul.children.length < 6) {
        // for post fetch
        postObj = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: getTrainerId
            })
        }
        // create pokemon in back end 
        fetch(POKEMONS_URL, postObj)
        .then(r => r.json())
        .then(pokemon => renderPokemon(pokemon))
    }
}

//release a pokemon when release button clicked
const handleReleaseButton = (event) => {
    pokeId = event.target.dataset.pokemonId

    fetch(POKEMONS_URL + '/' + pokeId, {method: 'DELETE'})
    .then(r => r.json())
    .then(pokemon => {
        console.log(pokemon)
        alert(`You released ${pokemon.nickname}!`)
        event.target.parentElement.remove()
    })
}

//run all starting functions
const run = () => {
    displayTrainers()
    addReleaseButtonListener()
}
run()