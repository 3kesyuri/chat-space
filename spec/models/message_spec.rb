require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do

  context 'can save' do
    it "comment:true, image:nil" do
      message = build(:message, image: nil)
      expect(message).to be_valid
    end

    it "comment:nil, image:true" do
      message = build(:message, comment: nil)
      expect(message).to be_valid
    end

    it "comment:true, image:true" do
      message = build(:message)
      expect(message).to be_valid
    end

  end

  context 'can not save' do
    it "comment:nil, image:nil" do
      message = build(:message, comment: nil, image: nil)
      message.valid?
      expect(message.errors[:comment]).to include('を入力してください')
    end

    it "group_id:nil" do
      message = build(:message, group: nil)
      message.valid?
      expect(message.errors[:group]).to include('を入力してください')
    end

    it "user_id:nil" do
      message = build(:message, user: nil)
      message.valid?
      expect(message.errors[:user]).to include('を入力してください')
    end

  end

  end

end