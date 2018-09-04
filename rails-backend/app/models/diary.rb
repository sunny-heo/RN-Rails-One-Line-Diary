class Diary < ApplicationRecord
  belongs_to :user
  
  has_many :daily_contents, dependent: :destroy
end
