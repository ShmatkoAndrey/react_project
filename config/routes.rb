Rails.application.routes.draw do

  devise_for :users, controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
  }

  devise_scope :user do
    get 'users/current_user' => 'users/sessions#get_current_user'
  end

  resources :posts

  root 'posts#index'
end
