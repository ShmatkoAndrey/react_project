class RoomsController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    @rooms = Room.order(created_at: :desc)
    respond_to do |format|
      format.json {render json: {rooms: @rooms}}
    end
  end

  private

  def room_params

  end

end