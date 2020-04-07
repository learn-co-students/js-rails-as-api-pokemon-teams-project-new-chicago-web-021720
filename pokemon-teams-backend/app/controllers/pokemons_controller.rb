class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons.map { |pokemon| PokemonSerializer.new(pokemon).serialize_to_hash }
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: PokemonSerializer.new(pokemon).serialize_to_json
    end

    def create

        # With 'Content-Type': 'application/json', the body comes through in the `params`!
        # body = JSON.parse(request.body.read)
        
        # # Required Headers:
        # # {'Content-Type': 'application/json'}
        # unless request.headers['Content-Type'] == 'application/json'
        #     render json: {status: 400, message: 'Unrecognized or missing Content-Type'}
        # end

        # Make sure the required `trainer_id` was passed
        if !params[:pokemon] || !params[:pokemon][:trainer_id]
            render json: {status: 400, message: 'Pokemon trainer_id is required.'}
        end

        # Make the new (random) pokemon
        pokemon = Pokemon.new(
            species: Faker::Games::Pokemon.name,
            nickname: Faker::Name.first_name,
            trainer_id: params[:pokemon][:trainer_id]
        )

        if pokemon.save
            render json: PokemonSerializer.new(pokemon).serialize_to_json
        else
            render json: {status: 500, message: 'Failed to create pokemon.'}
        end
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        serialized_pokemon = PokemonSerializer.new(pokemon).serialize_to_json
        pokemon.destroy
        render json: serialized_pokemon
    end

end
