# rails-trix-playground

# Tutorials
Trix-editor
\
https://www.youtube.com/watch?v=eyM3_kdD-wY

Active Storage
\
https://www.youtube.com/watch?v=tzkezfqW8Ck
\
https://guides.rubyonrails.org/active_storage_overview.html

# Setting up
terminal -> rails g scaffold Content body:text subject:text receipient:text attachment:text
\
terminal -> rails g mailer Playground
\
terminal -> rails g job Playground

# Gem & Dependencies
ruby '2.5.3'
\
gem 'rails', '~> 5.2.2'
\
gem 'trix'
\
terminal -> bundle i

# Trix Setup
Add to app/assets/stylesheets/application.css
\
//*= require trix

Add to app/assets/javascripts/application.js
\

//= require trix

# Creation Setup
See viewfile contents#_form
\
Add to view file
\
<trix-editor input="content_body"></trix-editor>
where input is the id of the form input field


# View Setup
See viewfile contens#show
\
Add "sanitize" render the rich text body to html view, like so:
\
<%= sanitize @content.body %>

# Setting up mailer


# Setting up mailer attachment with active storage
terminal -> rails active_storage:install
\
terminal -> rails db:migrate

Add to model file
\
has_one_attached :name OR has_many_attached :name
\
where name can be anything
\
see content.rb

Add to view file for file uploading
\
<%= file_field :name %> OR <%= form.file_field :files, multiple: true %>
\
see views contents#_form

Whitelist params in controller
\
:name OR name: []
\
see controller contents

# Attaching uploaded files to email with blob
see playground_mailer.rb

# Deleting files with purge
content.files.purge
\
see playground_mailer.rb