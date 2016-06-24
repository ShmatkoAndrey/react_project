Ruby 2.3.0
Rails 5.0.0.rc1

```console
bundle install
rake db:migrate
rake db:seed
```
В одной консоли/вкладке запускается сокет сервер
```console
rackup faye.ru -s thin -E production
```
В другой уже сарвер
```console
thin start
# or
rails s
```