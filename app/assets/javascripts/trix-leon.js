//= require trix

Trix.config.textAttributes.red = { 
	style: { color: "red" },
    parser: function(element) {
        return element.style.color === "red"
    },
    inheritable: true
}
Trix.config.textAttributes.orange = { style: { color: "orange" }, parser: function(element) { return element.style.color === "orange" }, inheritable: true }
Trix.config.textAttributes.yellow = { style: { color: "yellow" }, parser: function(element) { return element.style.color === "yellow" }, inheritable: true }
Trix.config.textAttributes.green = { style: { color: "green" }, parser: function(element) { return element.style.color === "green" }, inheritable: true }
Trix.config.textAttributes.blue = { style: { color: "blue" }, parser: function(element) { return element.style.color === "blue" }, inheritable: true }
Trix.config.textAttributes.purple = { style: { color: "purple" }, parser: function(element) { return element.style.color === "purple" }, inheritable: true }
Trix.config.textAttributes.pink = { style: { color: "pink" }, parser: function(element) { return element.style.color === "pink" }, inheritable: true }
Trix.config.textAttributes.brown = { style: { color: "brown" }, parser: function(element) { return element.style.color === "brown" }, inheritable: true }
Trix.config.textAttributes.gray = { style: { color: "gray" }, parser: function(element) { return element.style.color === "gray" }, inheritable: true }
Trix.config.textAttributes.black = { style: { color: "black" }, parser: function(element) { return element.style.color === "black" }, inheritable: true }
Trix.config.textAttributes.purple = { style: { color: "purple" }, parser: function(element) { return element.style.color === "purple" }, inheritable: true }
Trix.config.textAttributes.default = { style: { color: "" }, parser: function(element) { return element.style.color === "" }, inheritable: true }
            
// Trix.config.textAttributes.comic = { style: { fontFamily: "Comic Sans MS" }, parser: function(element) { return element.style.fontFamily.match(/Comic Sans MS/) }, inheritable: true }
Trix.config.textAttributes.underline = { style: { textDecoration: "underline" }, parser: function(element) { return element.style.textDecoration === "underline" }, inheritable: false }


addEventListener("trix-initialize", function(event) {  
    var colorHTML = '<div class="trix_leon">Font color: ';
    colorHTML += '<button type="button" data-trix-attribute="default" class="trix_buttons_leon" style="background-color: white; color: black;">None</button>';     
    colorHTML += '<button type="button" data-trix-attribute="black" class="trix_buttons_leon" style="background-color: black">Black</button>';      
    colorHTML += '<button type="button" data-trix-attribute="gray" class="trix_buttons_leon" style="background-color: gray">Gray</button>';
    colorHTML += '<button type="button" data-trix-attribute="brown" class="trix_buttons_leon" style="background-color: brown">Brown</button>';
    colorHTML += '<button type="button" data-trix-attribute="green" class="trix_buttons_leon" style="background-color: green">Green</button>';
    colorHTML += '<button type="button" data-trix-attribute="purple" class="trix_buttons_leon" style="background-color: purple">Purple</button>';     
    colorHTML += '<button type="button" data-trix-attribute="blue" class="trix_buttons_leon" style="background-color: blue">Blue</button>';
    colorHTML += '<button type="button" data-trix-attribute="red" class="trix_buttons_leon" style="background-color: red">Red</button>';
    colorHTML += '<button type="button" data-trix-attribute="pink" class="trix_buttons_leon" style="background-color: pink">Pink</button>';
    colorHTML += '<button type="button" data-trix-attribute="orange" class="trix_buttons_leon" style="background-color: orange">Orange</button>';
    colorHTML += '<button type="button" data-trix-attribute="yellow" class="trix_buttons_leon" style="background-color: yellow">Yellow</button>';
    colorHTML += '</div>';

    event.target.toolbarElement.querySelector(".button_row").insertAdjacentHTML("afterend", colorHTML);
    
    var textHTML = '<button type="button" data-trix-attribute="underline" style="text-decoration: underline; padding: 0px 10px">U</button>';
    event.target.toolbarElement.querySelector(".button_group.text_tools").insertAdjacentHTML("afterbegin", textHTML);
});

function uploadAttachment(attachment) {
    var file = attachment.file;
    var form = new FormData;
    form.append("Content-Type", file.type);
    form.append("photo[image]", file); //*** EDIT file field upload params!!
    
    var xhr = new XMLHttpRequest;
    xhr.open("POST", "/photos.json", true); //*** EDIT PATH CREATE.JSON
    xhr.setRequestHeader("X-CSRF-Token", Rails.csrfToken()); //for validation

    xhr.upload.onprogress = function(e) {
        var progress = e.loaded / e.total * 100;
        attachment.setUploadProgress(progress); 
    }

    xhr.onload = function() {
        if (xhr.status === 201) {
            var data = JSON.parse(xhr.responseText);
            console.log(data);
            return attachment.setAttributes({
                url: data.image_url,
                image_id: data.image_id,
                // href: data.image_url,
            })
        }
    }
    return xhr.send(form);
}

document.addEventListener("trix-attachment-add", (e) => {
    var attachment = e.attachment;
    if (attachment.file) {
        return uploadAttachment(attachment);
    }
});

document.addEventListener("trix-attachment-remove", (e) => {
    var image_id = e.attachment.attachment.attributes.array[9]; // ENSURE IS IMAGE ID
    var AUTH_TOKEN = $('meta[name=csrf-token]').attr('content');
    var send_package = {};
    send_package["authenticity_token"] = AUTH_TOKEN;

    // ENSURE DELETE PATHWAY
    $.ajax({
        url: `/photos_delete/${image_id}`,
        method: "POST",
        data: send_package,
        dataType: "JSON",
        success: function(){
            console.log('photo delete success');
        },
        error: function(error){
            console.log('photo delete Error');
            console.log(error);
        }
    });

})