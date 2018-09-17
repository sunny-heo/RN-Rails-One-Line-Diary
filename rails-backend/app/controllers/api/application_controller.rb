class Api::ApplicationController < ApplicationController
  skip_before_action :verify_authenticity_token

  private
  def user_signed_in?
    current_user.present?
  end

  def current_user
    if session[:user_id].present?
      @current_user ||= User.find_by(id: session[:user_id])
    end
  end

  def authenticate_user!
    unless user_signed_in?
      render json: {status: :unauthorized}, status: :unauthorized 
    end
  end

  def data_obj_array_as_json(data_obj_array, serializer)
    ActiveModelSerializers::SerializableResource.new(data_obj_array, each_serializer: serializer)
  end
end
