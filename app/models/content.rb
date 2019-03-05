class Content < ApplicationRecord
    has_many_attached :files
    # has_one_attached :file
end
