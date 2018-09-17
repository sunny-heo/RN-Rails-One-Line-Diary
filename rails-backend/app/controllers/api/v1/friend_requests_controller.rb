class Api::V1::FriendRequestsController < Api::ApplicationController
  before_action :find_friend_request, except: [:index, :create]

  def index
    incoming_requests = FriendRequest.where(:friend => current_user).order(created_at: :desc)
    outgoing_requests = current_user.friend_requests.order(created_at: :desc)
    
    render json: { 
      incoming_requests: data_obj_array_as_json(incoming_requests, IncomingFriendRequestSerializer),
      outgoing_requests: data_obj_array_as_json(outgoing_requests, OutgoingFriendRequestSerializer)
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
    request_user = @friend_request.user
    accept_user = @friend_request.friend
    # render json: {
    #   request_user: request_user, 
    #   accept_user: accept_user
    # } 
    render json: @friend_request.id
  end

  def destroy
    @friend_request.destroy
    render json: @friend_request.id
  end

  private
  def find_friend_request
    @friend_request = FriendRequest.find(params[:id])
  end



  def get_incoming_outcoming_requests
    incoming_requests = FriendRequest.where(:friend => current_user).order(created_at: :desc)
    outgoing_requests = current_user.friend_requests.order(created_at: :desc)

    render json: {
      incoming_requests: incoming_requests.as_json(
        :only => [ :id, :created_at ], 
        include: { 
          user: {
            only: [:email, :first_name, :last_name]
          }
        }
      ), 
      outgoing_requests: outgoing_requests.as_json(
        :only => [ :friend_id, :created_at ], 
        include: {
          friend: {
            only: [:email, :first_name, :last_name]
          }
        }
      )
    }  
  end

end
