class Api::V1::SessionsController < Api::ApplicationController
  before_action :authenticate_user!, only: [ :destroy ]

  def create
    user = User.find_by_email params[:email]
    if user&.authenticate params[:password]
      session[:user_id] = user.id
      render json: current_user
    else
      render json: { error: {message: "Email or Password is invalid"}}
    end
  end

  def destroy
    session[:user_id] = nil
    head :ok
  end
end

