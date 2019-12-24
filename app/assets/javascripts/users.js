$(function(){
  var userNameList = $('.js-add-user');

  function appendUserName(data) {
    var html =`
    <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${data.name}</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${data.id}" data-user-name="${data.name}">追加</div>
  </div>
  `;
    userNameList.append(html);
  }

  function addNouser(){
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }

  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }

  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();
    console.log(input);

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(data){
      $('#chat-group-users').empty();
      if (data.length !== 0) {
        data.forEach(function(data){
          appendUserName(data);
        });
      }else if(input.length == 0){
        return false;
      }else{
        addNouser();
      }
    })
    .fail(function(){
      alert('ユーザーの追加に失敗しました');
    });
  });

  $(document).on("click", ".chat-group-user__btn--add", function(){
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });

  $(document).on("click", ".chat-group-user__btn--remove",function(){
    $(this)
      .parent()
      .remove();
  });
});