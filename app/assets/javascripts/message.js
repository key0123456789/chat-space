$(function(){
    function buildHTML(message){
      var html = `<div class="message" data-id='${ message.id }'>
                    <div class="message__upper-info">
                      <div class="message__upper-info__talker">
                        ${ message.name }
                      </div>
                      <div class="message__upper-info__date">
                        ${ message.created_at }
                      </div>
                    </div>
                    <p class="message__text" data-message="content">
                      ${message.content}
                      <img src='${message.image}' class="message-image">
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
  
    // function buildMessageHTML(message) {
    //   var insertHTML = `<div class="message" data-id=${ message.id }>
    //                       <div class="upper-message">
    //                         <div class="upper-message__user-name">
    //                           ${ message.user_name }
    //                         </div>
    //                         <div class="upper-message__date">
    //                           ${ message.created_at }
    //                         </div>
    //                       </div>
    //                       <div class="lower-message">
    //                         <p class="lower-message__content">
    //                           ${ message.content }
    //                         </p>
    //                         <img src="${ message.image.url }" class="lower-message__image">
    //                       </div>
    //                     </div>`
   
    //   // if(message.content || message.image.url) {
    //     return insertHTML;
    //   // };
    // }

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
          console.log (insertHTML);
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
