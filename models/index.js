
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/global.config')
const models = {}

const db = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  config.database
)

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.model.') > -1)
  })
  .forEach(function(file) {
    const modelPath = path.join(__dirname, file)
    const name = file.split('.')[0]
    console.log(`import ${name} model from file ${modelPath}.`)
    const model = require(modelPath)
    models[name] = defineModel(name, model(db, Sequelize.DataTypes))
  })


function defineModel (name, attributes) {
  var attrs = {}
  // 非指定下默认不为空
  for (let key in attributes) {
    let val = attributes[key]
    if (typeof val === 'object' && val['type']) {
      val.allowNull = val.allowNull || false
      attrs[ley] = val
    } else {
      attrs[key] = {
        type: val,
        allowNull: false
      }
    }
  }

  // 指定公用key
  attrs = {
    id: { type: Sequelize.DataTypes.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    createdAt: { type: Sequelize.BIGINT, allowNull: false },
    updatedAt: { type: Sequelize.BIGINT, allowNull: false },
    version: { type: Sequelize.BIGINT, allowNull: false },
    ...attrs
  }

  return db.define(name, attrs, {
    tableName: name,
    timestamp: false,
    hooks: {
      // 拦截并初始化值
      beforeValidate: function (obj) {
        let now = Date.now()
        if (obj.isNewRecord) {
          obj.createdAt = now
          obj.version = 0
        }
        obj.updatedAt = now
        obj.version++
      }
    }
  })
}




models.connectDB = db
models.defineModel = defineModel

module.exports = models


