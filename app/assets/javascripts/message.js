$(function(){

  var reloadMessages = function(){

    var last_message_id = $('.messageList__box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type:'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if(messages.length !== 0){
        var insertHTML = ``;
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.messageList').append(insertHTML);
        $('.messageList').animate({scrollTop: $('.messageList')[0].scrollHeight});
        $("#new_message")[0].reset();
        $('.messageForm__typeArea--send').prop("disabled", false)
      }
    })
    .fail(function(){
      alert('ファイルの取得に失敗しました。');
    });
  };

  //メソッドを定義
  function buildHTML(message){
    if (message.image){
      var html = `
      <div class='messageList__box' data-message-id="${message.id}" >
        <div class='messageList__box--inner'>
          <p class='messageList__box--user'>
          ${message.user_name}
          </p>
          <p class='messageList__box--time'>
          ${message.created_at}
          </p>
        </div>
        <p class='messageList__box--message'>
          <p>
          ${message.comment}
          </p>
          <img class="messageList__box--image" src="${message.image}">
        </p>
      </div>`;
      return html
    } else {
      var html = `
      <div class='messageList__box' data-message-id="${message.id}">
        <div class='messageList__box--inner'>
          <p class='messageList__box--user'>
          ${message.user_name}
          </p>
          <p class='messageList__box--time'>
          ${message.created_at}
          </p>
        </div>
        <p class='messageList__box--message'>
          <p>
          ${message.comment}
          </p>
        </p>
      </div>`;
      return html
    };
  }

  //ajax
  $('#new_message').on('submit', function(e){
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
      $('.messageList').append(html);
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
    .always(function(){
    $('.messageList').animate({ scrollTop: $('.messageList')[0].scrollHeight});
      $('#new_message')[0].reset();
    });
  });

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});