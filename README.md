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


---------------------------------------------------------
При возникновении ошибки во время bundle install
```console
An error occurred while installing nio4r (1.2.1), and Bundler cannot continue.
Make sure that `gem install nio4r -v '1.2.1'` succeeds before bundling.
```

Может помочь
```console
sudo apt-get install libgmp3-dev
```

или
[Этот](http://stackoverflow.com/questions/29476596/noi4r-gem-install-issues/29488544) ответ на stackoverflow.