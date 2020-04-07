class TrainersController < ApplicationController

    def index
        trainers = Trainer.all
        render json: trainers.map { |trainer| TrainerSerializer.new(trainer).serialize_to_hash }
    end

    def show
        trainer = Trainer.find(params[:id])
        render json: TrainerSerializer.new(trainer).serialize_to_json
    end

end
