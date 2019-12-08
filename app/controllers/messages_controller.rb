class MessagesController < ApplicationController
  def index
  end

  def create
    @message = Message.new
    @messages = Message.create(message_params)
    if @messages.save
      redirect_to root_path, "メッセージを投稿しました"
    else
      render :new
    end
  end


  private
  def message_params
    params.require(:message).permit(:message, :image)
  end
end
