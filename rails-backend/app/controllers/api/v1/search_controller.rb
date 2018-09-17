class Api::V1::SearchController < Api::ApplicationController
  def user
    search_keyword = params[:user]
    target_attributes = [:first_name, :last_name]
    queries = target_attributes.map { |attr| "#{attr} ILIKE '%#{search_keyword}%'" }
    matched_users = User.where(queries.join(" OR "))
    render json: matched_users,  each_serializer: SearchUserSerializer
    # render json: data_obj_array_as_json(matched_users, SearchUserSerializer)
    # render json: ActiveModel::ArraySerializer.new(matched_users, each_serializer: SearchUserSerializer).to_json
    # render json: ActiveModelSerializers::SerializableResource.new(matched_users, each_serializer: SearchUserSerializer)
  end
end
