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
      $('.messageList').animate({ scrollTop: $('.messageList')[0].scrollHeight});
      $('.messageForm__typeArea--image').val('');
      $('.messageForm__typeArea--text').val('');
      $('.messageForm__typeArea--send').prop('disabled', false);
      
    })
    .fail(function(jqXHR, textStatus, errorThrown){
      alert('ファイルの取得に失敗しました。');
                    console.log("ajax通信に失敗しました");
                    console.log("jqXHR          : " + jqXHR.status); // HTTPステータスが取得
                    console.log("textStatus     : " + textStatus);    // タイムアウト、パースエラー
                    console.log("errorThrown    : " + errorThrown.message); // 例外情報
    });
  });
});