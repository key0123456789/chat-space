$(function(){
  var handler = function(){
    function buildHTML(message){
      var html = `
        <div class="message">
          <div class="message__upper-info">
            <div class="message__upper-info__talker">
              ${message.name}
            </div>
            <div class="message__upper-info__date">
              ${message.created_at}
            </div>
          </div>
          <p class="message__text">
              ${message.content}
              
              <img src='${message.image}' class="message-image">
          </p>
        </div>
      `
      return html;
    }

    $('#new_message').on('submit',function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html)
        $('#message-content').val('')
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast' );
      })
      .fail(function(){
        alert('error');
      })
      return false;
    });
  }
  $(handler);
  $(document).on("turbolinks:load", handler);
  $(document).on("turbolinks:restore", handler);

});
