class Api::ApplicationController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  private
  def authenticate_user!
    unless user_singed_in
      render json: {status: :unauthorized}, status: :unauthorized 
    end
  end
end
