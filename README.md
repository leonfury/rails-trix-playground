# rails-trix-playground
https://rails-trix-playground.herokuapp.com/

A playground to test out rail's trix-editor which stores rich text to database and also using rail's activestorage to upload files to email attachment.

Purpose of this playground is to try out these features prior to implementing to a client's project

The idea of this playground is to allow users to create custom email content and attach files from their local drives to said email.


# Tutorials
Trix-editor
\
https://www.youtube.com/watch?v=eyM3_kdD-wY

Active Storage
\
https://www.youtube.com/watch?v=tzkezfqW8Ck
\
https://guides.rubyonrails.org/active_storage_overview.html

Active Storage Production Configuration
\
https://devcenter.heroku.com/articles/active-storage-on-heroku?preview=1

Customisation
\
https://jsfiddle.net/javan/egg7fgvv/

# Setting up
Run on terminal

    rails g scaffold Content body:text subject:text receipient:text attachment:text
    rails g mailer Playground
    rails g job Playground

# Gem & Dependencies

    ruby '2.5.3'
    gem 'rails', '~> 5.2.2'
    gem 'trix'
    terminal -> bundle i

# Trix Setup
Add to app/assets/stylesheets/application.css

    //*= require trix

Add to app/assets/javascripts/application.js

    //= require trix

# Creation Setup
See viewfile contents#_form
\
Add to view file

<<<<<<< HEAD
    <trix-editor input="content_body"></trix-editor>

=======
<trix-editor input="content_body"></trix-editor>
>>>>>>> 3ee30ef3e3a121be79f1ae80a8dc35e0dd52bb1d
where input is the id of the form input field


# View Setup
See viewfile contens#show
\
Add "sanitize" render the rich text body to html view, like so:

    <%= sanitize @content.body %>

# Setting up mailer


# Setting up mailer attachment with active storage
Run on terminal

    rails active_storage:install
    rails db:migrate

Add to model file

    has_one_attached :name
    OR 
    has_many_attached :name

where name can be anything
\
see content.rb

Add to view file for file uploading

    <%= file_field :name %> 
    OR
    <%= form.file_field :files, multiple: true %>
see views contents#_form

Whitelist params in controller

    :name  #for single file upload
    OR 
    name: []
see controller contents #for multiple file upload

# Attaching uploaded files to email with blob
see playground_mailer.rb

# Deleting files with purge

    content.files.purge

see playground_mailer.rb

# Configuring for Production!!
Add to Gem file 

    gem "aws-sdk-s3", require: false

In production.rb, change

    config.active_storage.service = :local 
    TO
    config.active_storage.service = :amazon

Uncomment the following in storage.yml

    amazon:
      service: S3
      access_key_id: <%= ENV['AWS_ID'] %>
      secret_access_key: <%= ENV['AWS_SECRET'] %>
      region: <%= ENV['AWS_REGION'] %>
      bucket: <%= ENV['AWS_BUCKET'] %>

===============================================================================
Photo Upload
terminal -> rails g scaffold Photo image_data:text
photos_controller -> strong params -> image_data to image
photo.rb -> has_one_attached :image
photos#_form -> <%= form.file_field :image %>

test upload

trix JS-upload async

photos#jbuilderSS -> 