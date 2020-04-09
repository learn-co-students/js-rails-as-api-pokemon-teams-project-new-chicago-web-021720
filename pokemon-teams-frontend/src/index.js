const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main');

document.addEventListener('DOMContentLoaded',()=>{
  const fetchPokemon = () => {
    fetch(TRAINERS_URL)
      .then(response => response.json())
      .then(trainers => trainers.forEach(trainer => renderTrainer(trainer)));
  }

  function renderTrainer(trainer) {

    let trainerCard = `<div class="card" data-id="${trainer.id}">
                        <p>${trainer.name}</p>
                        <button data-trainer-id="${trainer.id}">Add Pokemon</button>
                        <ul>

                        `;
    const pokemons = trainer.pokemon.map(pokemon =>
        `<li>${pokemon.nickname}<button class="release" data-pokemon-id="${pokemon.id}">
        Release</button></li>`).join('');

    trainerCard = trainerCard + pokemons + `</ul></div>`;
    main.innerHTML += trainerCard;
  }

  fetchPokemon();
   main.addEventListener('click',function(){
  //
     if(event.target.tagName === "BUTTON"){
       if(event.target.className === 'release'){
         const parentNode = event.target.parentNode;
         fetch(POKEMONS_URL + `/${event.target.dataset.pokemonId}`,{method: 'DELETE'})
          .then(response => response.json())
          .then(data => parentNode.remove());
        }
       else {

       if(event.target.nextElementSibling.children.length < 6){
           const id = event.target.dataset.trainerId;
           const ul = event.target.nextElementSibling;
           const reqObj = {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({ trainer_id: id})
           };
           fetch(POKEMONS_URL, reqObj)
            .then(resp => resp.json())
            .then(pokeObj => {
              const pokeLi = `<li>${pokeObj.nickname} (${pokeObj.species})
                        <button class="release" data-pokemon-id=${pokeObj.id}>
                          Release</button></li>`;
              ul.innerHTML += pokeLi;
            });

          }
        }
      }
     });
  });
