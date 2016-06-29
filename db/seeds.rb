10.times { User.create(email: Faker::Internet.email, password: 'qqq', password_confirmation: 'qqq') }
50.times { Post.create(user_id: Random.new.rand(1..9), content: Faker::Hipster.paragraph) }