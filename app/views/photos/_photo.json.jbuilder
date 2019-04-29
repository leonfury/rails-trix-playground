json.extract! photo, :id, :image_data, :created_at, :updated_at
json.url photo_url(photo, format: :json)

json.image_url rails_blob_path(photo.image)
json.image_id photo.id