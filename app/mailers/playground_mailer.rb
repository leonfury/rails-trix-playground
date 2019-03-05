class PlaygroundMailer < ApplicationMailer
    def send_content(email, content)
        
        content.files.each do |f|
            attachments["#{f.blob.filename}"] = { mime_type: f.blob.content_type, content: f.blob.download }
        end

        @content = content
        mail(to: email, subject: content.subject, cc: "adamleonlim@gmail.com")

        # content.files.purge #delete active storage files
    end
end
