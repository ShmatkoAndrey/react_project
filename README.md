* Ruby 2.3.0
* Rails 5.0.0.rc1

Добавить в корень файлы (для rvm)<br />
.ruby-version
> 2.3.0

Консоль:
```
bundle install
rake db:migrate
```
В одной консоли/вкладке запускается сокет сервер
```
rackup faye.ru -s thin -E production
```
В другой уже сервер
```
thin start
# or
rails s
```

<br /><br />
### При возникновении ошибки во время bundle install
```
An error occurred while installing nio4r (1.2.1), and Bundler cannot continue.
Make sure that `gem install nio4r -v '1.2.1'` succeeds before bundling.
```

Может помочь
```
sudo apt-get install libgmp3-dev
```

или
[Этот ответ](http://stackoverflow.com/questions/29476596/noi4r-gem-install-issues/29488544) на stackoverflow.