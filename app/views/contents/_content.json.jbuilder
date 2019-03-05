json.extract! content, :id, :body, :subject, :receipient, :attachment, :created_at, :updated_at
json.url content_url(content, format: :json)
