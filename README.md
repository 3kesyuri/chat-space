# README

## users
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|uniquw: true|
|password|string|null: false|

### Association
* has_many :comments
* has_many :groups, through: :groups_users

## groups
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|

### Association
* has_many :comments
* has_many :users, through: :groups_users

## messages
|Column|Type|Options|
|------|----|-------|
|comment|text|null: false|
|image|string|null: false|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
* belongs_to :user
* belongs_to :group

## groups_users
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
* belongs_to :user
* belongs_to :group