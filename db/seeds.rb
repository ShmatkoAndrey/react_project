@user = User.create username: Faker::Internet.user_name, password: 'qqq', password_confirmation: 'qqq'

Room.create(name: 'First room', public: true, anonim: false)
Room.create(name: 'Second room', public: true, anonim: false)
Room.create(name: 'Third room', public: true, anonim: false)

Room.all.each do |room|
  50.times {|i| Post.create room_id: room.id, content: "room ##{room.id} post #{i}", user_id: @user.id }
end