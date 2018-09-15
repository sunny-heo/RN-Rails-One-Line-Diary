# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

PASSWORD = "superSecret1@"

User.destroy_all
FriendRequest.destroy_all
Friendship.destroy_all
Diary.destroy_all
DailyContent.destroy_all

super_user = User.create(
  "first_name": "Sunny",
	"last_name": "Heo",
	"gender": "male",
	"email": "sunny@gmail.com",
  "password": PASSWORD,
  "admin": true
)

40.times.each do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name
  gender = [:male, :female, :neither].sample

  User.create(
    first_name: first_name,
    last_name: last_name,
    gender: gender,
    email: "#{first_name.downcase}.#{last_name.downcase}@example.com",
    password: PASSWORD,
  )
end

users = User.all
puts Cowsay.say "Created #{users.count} users", :sheep

users.each do |user|
  20.times do 
    friend = (users - [user]).sample
    FriendRequest.create(user: user, friend: friend)
  end

  10.times do 
    user.friend_requests.sample.accept
  end
end

friend_requests = FriendRequest.all
puts Cowsay.say "Created #{friend_requests.count} friend_requests", :sheep

friendships = Friendship.all
puts Cowsay.say "Created #{friendships.count} friendships", :sheep

1000.times.each do
  name = Faker::Beer.name
  disclose_date = Faker::Date.between( 4.year.from_now, Date.today)
  user = users.sample

  diary = Diary.create(
    name: name,
    disclose_date: disclose_date,
    user: user
  )
  
  start_date = (rand*365).days.ago
  end_date = Date.today
  
  diary.created_at = start_date
  diary.updated_at = start_date
    
  days = (end_date - start_date.to_date).to_i

  if diary.valid?
    days.times.each do
      title = Faker::Beer.style
      DailyContent.create(
        title: title,
        content: Faker::Coffee.notes,
        diary: diary
      )
    end
  end
end


diareis = Diary.all
daily_contents = DailyContent.all

puts Cowsay.say "Created #{diareis.count} diareis", :sheep
puts Cowsay.say "Created #{daily_contents.count} daily_contents", :sheep

puts "Login with #{super_user.email} and password of #{PASSWORD}"