class OutgoingFriendRequestSerializer < ActiveModel::Serializer
  attributes :id, :created_at
  has_one :friend, key: :request_receiver
  
  class UserSerializer < ActiveModel::Serializer
    attributes :email, :first_name, :last_name
  end
end
