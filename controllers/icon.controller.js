const models = require('../models')
const fs = require('fs')
const path = require('path')

// 图标库数据初始化
exports.initIcon = async (req, res, next) => {
  const filePath = path.resolve(process.cwd(), '../my_account_book/src/assets/icon')
  const list = []
  // 清空数据
  await models.icon.destroy({ truncate: true })
  fs
    .readdirSync(filePath)
    .forEach(async function(file) {
      const name = file.split('.')[0]
      if (name) {
        list.push({ name })
        await models.icon.create({ name })
      }
    })
  res.handleSuccess({ list })
}