class IncomingFriendRequestSerializer < ActiveModel::Serializer
  attributes :id, :created_at
  has_one :user, key: :request_sender
  
  class UserSerializer < ActiveModel::Serializer
    attributes :email, :first_name, :last_name
  end
end
