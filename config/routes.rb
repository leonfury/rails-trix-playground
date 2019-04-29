Rails.application.routes.draw do
  resources :photos, except: [:destroy]
  post "/photos_delete/:id" => "photos#destroy"
  resources :contents
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root  "contents#index"

  post "/contents/:id/send" => "contents#send_content", as: "content_mail"
end
