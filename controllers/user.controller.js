const models = require('../models')

// 用户数据初始化
exports.initUsers = async (req, res, next) => {
  const users = require('../data/user.json')
  await models.user.destroy({ truncate: true })

  while(users.length) {
    const item = users.pop()
    await models.user.create(item)
  }
  res.handleSuccess({})
}