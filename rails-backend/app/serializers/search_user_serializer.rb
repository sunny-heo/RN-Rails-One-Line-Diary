class SearchUserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :gender
end
