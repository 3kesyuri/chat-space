$(function(){

  //メソッドを定義
  function buildHTML(message){
    if (message.image){
      var html = `
      <div class='messageList__box'>
        <div class='messageList__box--inner'>
          <p class='messageList__box--user'>
          ${message.user_id}
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
      <div class='messageList__box'>
        <div class='messageList__box--inner'>
          <p class='messageList__box--user'>
          ${message.user_id}
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
    .fail(function(jqXHR, textStatus, errorThrown){
      alert('ファイルの取得に失敗しました。');
    })
    .always(function(){})
    $('.messageList').animate({ scrollTop: $('.messageList')[0].scrollHeight});
      $('#new_message')[0].reset();
  });
});