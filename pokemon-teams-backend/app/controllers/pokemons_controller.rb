class PokemonsController < ApplicationController

    def create
        trainer = Trainer.find(params["trainer-id"])
        if trainer.pokemons.length < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.create(nickname: name, species: species, trainer: trainer)
            render json: pokemon
        else
            render json: {message: "This team is full"}
        end
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy

        render json: pokemon
    end
end
