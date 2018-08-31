# class Api::V1::SessionsController < Api::ApplicationController
#   # skip_before_action :verify_authenticity_token

#   def create
#     user = User.find_by_email(params[:email])
#     if user&.authenticate(params[:password])
#       session[:user_id] = user.id
#       render(json: { id: user.id})
#     else
#       head :not_found
#     end
#   end

#   def destroy
#     session[:user_id] = nil
#     head :ok
#   end
# end
class Api::V1::SessionsController < Api::ApplicationController
  # skip_before_action :verify_authenticity_token

  def create
    user = User.find_by_email(params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render(json: { id: user.id})
    else
      head :not_found
    end
  end

  def destroy
    session[:user_id] = nil
    head :ok
  end
end

