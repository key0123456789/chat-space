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
    search_result.append(html)
  }

  $("#user-search-field").on("keyup", function(e) {
    e.preventDefault();
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      search_result.empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUsers(user);
        });
      } else {
        appendErrMsgToHTML("一致する候補はいません");
      }
    })
    .fail(function() {_
      aleart('検索に失敗しました')
    })
  });
});