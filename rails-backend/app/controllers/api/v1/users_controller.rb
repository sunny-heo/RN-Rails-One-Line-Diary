class Api::V1::UsersController < Api::ApplicationController  

  def create
    @user = User.new user_params
    @user.email.downcase!
    if @user.save
      session[:user_id] = @user.id
      render json: current_user
    else
      render json: { error: @user.errors }
    end
  end

  def destroy
  end

  private
  def user_params
    params.permit(
      :email,
      :password,
      :password_confirmation,
      :gender,
      :first_name,
      :last_name
    )
  end

end
