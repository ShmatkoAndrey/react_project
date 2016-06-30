class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :username, presence: true, uniqueness: { case_sensitive: false }

  has_many :posts, dependent: :destroy

  def email_required?
    false
  end

  def email_changed?
    false
  end

end
