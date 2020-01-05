import Sequelize, { Model } from 'sequelize'

class HelpOrder extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        student_id: Sequelize.INTEGER,
        question: Sequelize.STRING,
        answear: Sequelize.STRING,
        answear_at: Sequelize.DATE,
      },
      { sequelize },
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Student, {
      foreignKey: 'student_id',
      as: 'student',
    })
  }
}

export default HelpOrder
