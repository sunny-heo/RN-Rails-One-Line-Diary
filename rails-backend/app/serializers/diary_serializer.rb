class DiarySerializer < ActiveModel::Serializer
  attributes :id, :name, :disclose_date, :created_at, :updated_at

  # belongs_to :user, key: :owner
  
  # class UserSerializer < ActiveModel::Serializer
  #   attributes :id, :first_name, :last_name
  # end

end
