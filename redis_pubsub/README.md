# redis_pubsub
## これは何？
https://qiita.com/rihofujino/items/7bf4b99e2176f63ca7ef を参考に実装した、Redisを使ったwebsocketサーバをお試しで動かすスクリプト。

## quick start
```
$ npm i
$ docker run -d -p 6379:6379 redis
$ npx tsc
$ node dist/main.js
$ (別端末で) wscat --connect 'ws://localhost:8080'
```