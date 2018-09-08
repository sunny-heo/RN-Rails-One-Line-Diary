class Api::V1::FriendRequestsController < ApplicationController
  before_action :find_friend_request, except: [:index, :create]

  def index
  end

  def create
  end

  def update
  end

  def destroy
  end

  private
  def find_friend_request
    @friend_request = FriendRequest.find(params[:id])
  end
end
