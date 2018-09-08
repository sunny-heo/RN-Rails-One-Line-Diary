class Api::V1::FriendRequestsController < Api::ApplicationController
  before_action :find_friend_request, except: [:index, :create]

  def index
    # @incoming_requests = FriendRequest.where(:friend => current_user).order(created_at: :desc)
    # @outgoing_requests = current_user.friend_requests
    
    # render json: @outgoing_requests, each_serializer: OutgoingFriendRequestSerializer, @incoming_requests

    incoming_requests = FriendRequest.select('id', 'user_id', 'created_at').where(:friend => current_user).order(created_at: :desc)
    outgoing_requests = current_user.friend_requests.select('id', 'friend_id', 'created_at')

    render json: {
      incoming_requests: incoming_requests, 
      outgoing_requests: outgoing_requests
    }  
  end 
    

  def create
    friend = User.find(params[:friend_id])
    friend_request = FriendRequest.new(user: current_user, friend: friend)

    if friend_request.save
      render json: friend_request
    else
      render json: { error: friend_request.errors }
    end

  end

  def update
    @friend_request.accept
  end

  def destroy
    @friend_request.destroy

  end

  private
  def find_friend_request
    @friend_request = FriendRequest.find(params[:id])
  end

end
