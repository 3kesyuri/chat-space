FactoryBot.define do

  factory :message do
    comment {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/uploads/message/image/4/f7b687b0-b51a-cabf-b9f0-6f5e1c63c97f.png")}
    user
    group
  end

end