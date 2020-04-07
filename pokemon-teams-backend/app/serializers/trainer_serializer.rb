# # Attemp with Fast JSON API gem
# class TrainerSerializer
#   include FastJsonapi::ObjectSerializer
#   attributes :id, :name
#   has_many :pokemons
# end


# Manual attempt
class TrainerSerializer < ApplicationSerializer

  @@options = {
    except: except_defaults,
    include: {
      pokemons: { except: except_defaults}
    }
  }

  def initialize(trainer)
    @trainer = trainer
  end

  def serialize_to_json
    @trainer.to_json(@@options)
  end

  def serialize_to_hash
    @trainer.as_json(@@options)
  end

end
