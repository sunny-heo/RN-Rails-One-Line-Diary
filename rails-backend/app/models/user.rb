class User < ApplicationRecord
  has_secure_password

  has_many :diaries, dependent: :destroy
  has_many :friend_requests, dependent: :destroy
  has_many :pending_friends, through: :friend_request, source: :friend

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  validates :email, format: VALID_EMAIL_REGEX, presence: true, uniqueness: true
  validates :first_name, :last_name, length: { in: 1..25 }, presence: true
  validates :gender, inclusion: { in: %w[neither female male] }, presence: true
  validate :password_complexity
  
  private
  def password_complexity
    return if password.blank? || password =~ /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,70}$/
    errors.add :password, 'Complexity requirement not met. Length should be 8-70 characters and include: 1 uppercase, 1 lowercase, 1 digit and 1 special character'
  end
end
