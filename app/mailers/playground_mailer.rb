class PlaygroundMailer < ApplicationMailer
    def send_content(email, content)
        # attachments["Resume_#{id}.pdf"] = pdf 
        @content = content
        mail(to: email, subject: 'Your mail')
    end
end
