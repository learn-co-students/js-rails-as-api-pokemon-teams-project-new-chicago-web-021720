# # Attemp with Fast JSON API gem
# class PokemonSerializer
#   include FastJsonapi::ObjectSerializer
#   attributes :id, :nickname, :species, :trainer_id
#   belongs_to :trainer
# end


# Manual attempt
class PokemonSerializer < ApplicationSerializer

  @@options = {
    except: [:trainer_id] + except_defaults,
    include: {
      trainer: { except: except_defaults}
    }
  }

  def initialize(pokemon)
    @pokemon = pokemon
  end

  def serialize_to_json
    @pokemon.to_json(@@options)
  end

  def serialize_to_hash
    @pokemon.as_json(@@options)
  end

end