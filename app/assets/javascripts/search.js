$(function() {

  var search_result = $("#user-search-result");
  
  function appendUsers(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
             </div>`

    search_result.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`

    search_result.append(html);
  }

  function addUser(userName, userId) {
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value="${ userId }">
                    <a class='chat-group-user__name'>${ userName }</a>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`

    $('.chat-group-users').append(html);
  }

  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { keyword: input },
      dataType: 'json',
    })

    .done(function(users) {
      search_result.empty();

      if (input.length === 0) {
        $('#user-search-result').empty();
      } 
      else if (users.length !== 0) {
        users.forEach(function(user){
          appendUsers(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {_
      aleart('ユーザーの検索に失敗しました')
    })
  });

  $(document).on("click",'.user-search-add', function() {
    $(this).parent().remove();
    var userName = $(this).data('userName');
    var userId = $(this).data('userId');
      addUser(userName, userId);
  });

  $(document).on("click",'.js-remove-btn', function() {
    $(this).parent().remove();
  });
});