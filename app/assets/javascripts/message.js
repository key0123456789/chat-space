$(function(){
    function buildHTML(message){
      var image = message.image.url ? `<img src='${message.image.url}' class="message-image">`:""
      var html = `<div class="message" data-id='${ message.id }'>
                    <div class="message__upper-info">
                      <div class="message__upper-info__talker">
                        ${ message.user_name }
                      </div>
                      <div class="message__upper-info__date">
                        ${ message.created_at }
                      </div>
                    </div>
                    <p class="message__text" data-message="content">
                      ${message.content}
                      ${ image }
                    </p>
                  </div>`

                  return html;
                }

    $('#new_message').on('submit',function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');

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
        // console.log(html);→画像送信時に条件式のfalseを通っているらしく、HTMLが空欄になる。
        $('.messages').append(html)
        $('#message-content').val('')
        $('#message_image').val('')
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast' );
      })
      .fail(function(){
        alert('error');
      })
      return false;
    });
 
    var reloadMessages = function() {
      if($('.messages')[0]){
        var last_message_id = $('div>.message:last').data('id');
      $.ajax ({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        messages.forEach(function(message){
          var insertHTML = buildHTML(message);
          $('.messages').append(insertHTML)
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast' );
        })
      })
      .fail(function() {
        alert('自動更新できませんでした');
      })
    }
  }
  setInterval(reloadMessages, 5000);
});
