# rails-trix-playground

# Tutorials
https://www.youtube.com/watch?v=eyM3_kdD-wY

# Setting up
terminal -> rails g scaffold Content body:text subject:text receipient:text attachment:text
\
terminal -> rails g mailer Playground
\
terminal -> rails g job Playground

# Gem Dependencies
gem 'figaro'
\
terminal -> bundle exec figaro install

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