class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private

  def broadcast(channel, hash)
    message = {:channel => channel, :data => hash, :ext => {:auth_token => FAYE_TOKEN}}
    uri = URI.parse('http://socketmiamitalks.herokuapp.com/faye')
    Net::HTTP.post_form(uri, :message => message.to_json)
  end
  helper_method 'broadcast'
end
