class Api::V1::SearchController < ApplicationController
  def user
    search_keyword = params[:user]
    target_attributes = [:first_name, :last_name]
    queries = target_attributes.map { |attr| "#{attr} ILIKE '%#{search_keyword}%'" }
    matched_users = User.where(queries.join(" OR "))
    render json:{matched_users: matched_users}
  end
end
