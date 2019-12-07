# README

## users
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|uniquw: true|index: true|
|email|string|null: false|
|password|string|null: false|

### Association
* has_many :comments
* has_many :groups, through: :groups_users
* has_many :groups_users

## groups
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
* has_many :comments
* has_many :users, through: :groups_users
* has_many :groups_users

## messages
|Column|Type|Options|
|------|----|-------|
|comment|text|
|image|string|
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