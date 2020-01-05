import mongoose from 'mongoose'
import Sequelize from 'sequelize'

import Checkins from '../app/models/Checkins'
import Enrolls from '../app/models/Enrolls'
import HelpOrder from '../app/models/HelpOrder'
import Plan from '../app/models/Plan'
import Student from '../app/models/Student'
import User from '../app/models/User'
import databaseConfig from '../config/database'

const models = [User, Student, Plan, Enrolls, Checkins, HelpOrder]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    })
  }
}

export default new Database()
