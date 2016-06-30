# 10.times { User.create(username: Faker::Internet.user_name, password: 'qqq', password_confirmation: 'qqq') }
users = User.all
500.times { users.sample.posts.create(content: Faker::Hipster.paragraph) }