class Post < ApplicationRecord
  belongs_to :user
  belongs_to :room

  validates :content, presence: true, length: {maximum: 3000}

end
