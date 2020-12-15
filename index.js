const express = require('express')
const app = express()

const models = require('./models/index')
const config = require('./config/global.config')
const router =  require('./config/router.js')
const handle = require('./middlewares/handle.middlewares')

app
  .use(handle)
  .use(router)

// 连接数据库 启动服务
models.connectDB.sync().then(function(){
  app.listen(config.server.port, function (){
    console.log(`listening on http://${config.server.host}:${config.server.port}`)
  })
})

  