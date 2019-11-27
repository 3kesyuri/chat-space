# README

## users
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false|uniquw: true|
|password|string|null: false|
|group|references|null: false, foreign_key: true|

### Association
* has_many :comments
* has_many :groups, through: :groupes_users

## groups
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|
|user|references|null: false, foreign_key: true|

### Association
* has_many :comments
* has_many :users, through: :groupes_users

## messages
|Column|Type|Options|
|------|----|-------|
|comment|text|null: false|
|image|string|null: false|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
* belongs_to :users
* belongs_to :groups

## groupes_users
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
* belongs_to :users
* belongs_to :groups